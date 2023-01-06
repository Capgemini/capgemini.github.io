---
layout: post
title: "Consumer Driven Contract Testing with Pact, Kafka and Spring Boot"
subtitle: A brief overview and example of contract testing
description: Why consumer driven contract testing is a useful testing strategy and an example of how to implement it with Kafka, Spring Boot and Pact
summary: Why consumer driven contract testing is a useful testing strategy and an example of how to implement it with Kafka, Spring Boot and Pact
category: Development
tags: [Development, Java, Spring]
author: [papa_anthony]
comments: true
share: true
---

## The Problem
When developing microservices within a distributed system there is a need to ensure that where services communicate with one another, both the providing and consuming services understand what the other expects.

A common solution to this problem is end to end integration testing, where services being tested are deployed into a production-like environment at the same time and real usage scenarios are executed. This allows a relatively high level of confidence that the system and its components work together as expected, however this method of testing has the following drawbacks:

* It is a slow process - tests often don’t run in parallel, co-ordination between the teams developing the services can be long winded, teams may be lagging behind others in feature completion so testing can’t be fully representative.
* Tests are fragile and are hard to debug - due to so many moving parts, test starters, env configurations, different app versions etc. tests are very brittle and difficult to debug efficiently.

## Other Solutions
There are solutions which help to standardise the format of messages being transferred between services, such as OpenAPI specifications or JSON schema specifications. Though useful and important, these solutions do not guarantee that breaking changes are not merged and deployed. This is because responsibility is placed on consumers to keep up to date with different provider versions as they are updated. This inevitably leads to some consumers becoming out of sync for various reasons, leading to message processing errors.

## Consumer Driven Contract Testing
Consumer driven contract testing is an alternative approach to end to end testing, the focus is on a single component and its integration boundaries at a time. The responsibility for defining the contract which needs to be adhered to is placed on the consumer. This approach alleviates many of the issues with end to end testing mentioned above:

* Faster - services don’t need to be deployed and can run locally or in a build pipeline so feedback on breaking changes is much faster.
* Simpler more reliable deployments - removes the need for complicated release coordination and dependencies between teams.
* Allows you to know statically at release time which services are compatible

## Pact, Spring Boot and Kafka
[Pact](https://pact.io) is a popular open source consumer driven contract testing library. It is usually used in the context of testing between APIs and clients. However, pact can also be used to test asynchronous event driven systems. The steps for this are as follows:

1. Test the consumer and capture the contract by using a mock provided by pact. The mock checks the consumer can successfully invoke the message handler and can successfully process the event.
2. All the contracts are serialised and loaded into a pact broker
3. Pact pulls all the consumer contracts from the pact broker, then replays them against the provider. The test verifies the provider can produce the right messages for each consumer by checking that the message structure matches what is defined in the consumer contract.

## Implementation Example

In the following example, we will create a simple [NBA (National Basketball Association) contract themed Spring Boot, Maven, JUnit 5 application](https://github.com/PapaAAnthony/kafka-pact) which will implement a Kafka consumer that will generate a contract. Following which we will define a producer and see how, using Pact we can ensure that the contract between the two services is upheld. We'll start with ensuring we have the correct [dependencies](https://github.com/PapaAAnthony/kafka-pact/blob/main/pom.xml).

### Consumer

This consumer will listen on the specified topic for events when a new NBA player signs a contract and then generate a headline that will be logged with specific contract details pulled from the Kafka message.

```java
@Component
@RequiredArgsConstructor
public class PlayerContractListener {
    private final Logger logger = LoggerFactory.getLogger(PlayerContractListener.class);
    private final HeadlineGenerator headlineGenerator;

    @KafkaListener(id = "demo", topics = "contract-details")
    public void listen(@Payload ContractDetails details) {
        logger.info("Contract consumed from topic!");
        logger.info(headlineGenerator.generateHeadLine(details));
    }
}
```

The pact unit test implementation for this listener is as follows:

```java
@ExtendWith(value = {PactConsumerTestExt.class, MockitoExtension.class})
@PactTestFor(providerName = "playerContractProducer", providerType = ProviderType.ASYNCH, pactVersion = PactSpecVersion.V3)
class PlayerContractListenerTest {

    private static final String JSON_CONTENT_TYPE = "application/json";
    private static final String KEY_CONTENT_TYPE = "contentType";

    @Mock
    private HeadlineGenerator headlineGenerator;
    @InjectMocks
    private PlayerContractListener playerContractListener;

    @Pact(consumer = "playerContractConsumer")
    MessagePact contractDetailPact(MessagePactBuilder builder) {
        PactDslJsonBody jsonBody = new PactDslJsonBody();

        jsonBody.stringType("documentType", "contract")
                .stringType("firstName", "Lebron")
                .stringType("lastName", "James")
                .stringType("team", "LA Lakers")
                .stringType("duration", "5 years")
                .stringType("salary", "158 million USD");

        return builder.expectsToReceive("A player contract")
                .withMetadata(Map.of(JSON_CONTENT_TYPE, KEY_CONTENT_TYPE))
                .withContent(jsonBody)
                .toPact();
    }

    @Test
    @PactTestFor(pactMethod = "contractDetailPact", providerType = ProviderType.ASYNCH)
    void successfullyGenerateHeadlineGivenValidMessage(List<Message> messages) {
        ContractDetails contractDetails = ContractDetails.builder()
                .documentType("contract")
                .firstName("Lebron")
                .lastName("James")
                .team("LA Lakers")
                .duration("5 years")
                .salary("158 million USD")
                .build();

        when(headlineGenerator.generateHeadLine(contractDetails)).thenReturn("A new headline");

        messages.forEach(message -> {
            assertDoesNotThrow(() -> playerContractListener.listen(
                    new ObjectMapper().readValue(message.contentsAsBytes(), ContractDetails.class)));

            verify(headlineGenerator, times(1)).generateHeadLine(contractDetails);
        });
    }
}
```

`@ExtendWith` allows us to specify both the `PactConsumerTestExt` and the `MockitoExtention` to initialise our Mockito/Pact annotations.

`@PactTestFor` at the class level allows us to specify the providerName, this value is important as it will need to match the name used when we build the provider tests. `providerType` indicates that this is a test for an asynchronous system and the `pactVersion` allows us to declare the Pact version (V3 in this case).

`@Pact` is where we specify the name of our consumer, again it is important to ensure this matches the name that is given to the provider side of the Pact test. In the `pact` method itself we are able to use the `PactDslJsonBody` to define the structure of our contract.

`@PactTestFor` on our test method is where we tell Pact that the `contractDetailPact` method will provide the messages we want to test against our consumer method to ensure that it is able to process the message structure as expected. In this example we are using a default `ByteArrayDeserializer` from the Apache Kafka library for message deserialisation. For brevity we are using an object mapper to mimic the deserialisation of the message from bytes. If you are using a custom deserialiser you can use that code to deserialise the message to ensure that your deserialiser can also handle the structure of the Pact message defined. 

Once the test is run and the message was successfully processed by our consumer, a Pact contract is generated and stored in our target/pacts directory by default. Once this is complete we can use the following maven command `mvn pact:publish` to publish our contract to our Pact broker, where it will be verified against our producer to ensure that the messages it produces are what we expect.

```json
{
  "consumer": {
    "name": "playerContractConsumer"
  },
  "messages": [
    {
      "contents": {
        "documentType": "contract",
        "duration": "5 years",
        "firstName": "Lebron",
        "lastName": "James",
        "salary": "158 million USD",
        "team": "LA Lakers"
      },
      "description": "A player contract",
      "matchingRules": {
        "body": {
          "$.documentType": {
            "combine": "AND",
            "matchers": [
              {
                "match": "type"
              }
            ]
          },
          "$.duration": {
            "combine": "AND",
            "matchers": [
              {
                "match": "type"
              }
            ]
          },
          "$.firstName": {
            "combine": "AND",
            "matchers": [
              {
                "match": "type"
              }
            ]
          },
          "$.lastName": {
            "combine": "AND",
            "matchers": [
              {
                "match": "type"
              }
            ]
          },
          "$.salary": {
            "combine": "AND",
            "matchers": [
              {
                "match": "type"
              }
            ]
          },
          "$.team": {
            "combine": "AND",
            "matchers": [
              {
                "match": "type"
              }
            ]
          }
        }
      },
      "metaData": {
        "contentType": "application/json"
      }
    }
  ],
  "metadata": {
    "pact-jvm": {
      "version": "4.3.13"
    },
    "pactSpecification": {
      "version": "3.0.0"
    }
  },
  "provider": {
    "name": "playerContractProducer"
  }
}
```

### Provider

The producer contains a simple rest endpoint that takes a new player contract as a request body.

```java
@RestController
public class PlayerContractController {

    @Autowired
    private PlayerContractProducer playerContractProducer;

    @PostMapping("/sign")
    public void createDraftContract(@RequestBody PlayerContract contract) {
        playerContractProducer.send(contract);
    }
}
```

The `playerContract` object is mapped into a `ContractDetails` object and sent to the specified topic using a default Kafka template.

```java
@Component
@RequiredArgsConstructor
public class PlayerContractProducer {
    private final KafkaTemplate<String, ContractDetails> template;
    private final PlayerContractMapper contractMapper;
    private final Logger logger = LoggerFactory.getLogger(PlayerContractProducer.class);

    public void sendContractDetails(PlayerContract playerContract) {
        template.send("contract-details", contractMapper.mapContractDetails(playerContract));
        logger.info("Contract produced to topic!");
    }
}
```

The test for the producer is implemented as below:

```java
@Provider("playerContractProducer")
@Consumer("playerContractConsumer")
@PactBroker(url = "http://localhost:9292")
class PlayerContractMapperTest {

    private static final String JSON_CONTENT_TYPE = "application/json";
    private static final String KEY_CONTENT_TYPE = "contentType";
    private final PlayerContractMapper contractMapper = new PlayerContractMapper();

    @BeforeEach
    void before(PactVerificationContext context) {
        context.setTarget(new MessageTestTarget());
    }

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider.class)
    void pactVerificationTestTemplate(PactVerificationContext context) {
        context.verifyInteraction();
    }

    @PactVerifyProvider("A player contract")
    MessageAndMetadata verifyMessage() {

        PlayerContract playerContract = PlayerContract.builder()
                .age(37)
                .dateSigned(LocalDate.of(2022, 4, 3))
                .documentType("contract")
                .firstName("Lebron")
                .lastName("James")
                .team("LA Lakers")
                .position("Power Forward")
                .duration("5 years")
                .salary("158 million USD")
                .build();

        JsonSerializer<ContractDetails> serializer = new JsonSerializer<>();

        return new MessageAndMetadata(serializer.serialize("kafka-pact", contractMapper.mapContractDetails(playerContract)),
                Map.of(KEY_CONTENT_TYPE, JSON_CONTENT_TYPE));
    }
}
```

`@Provider` lets us tell Pact the name of our provider which should match whatever was specified in the consumer test.

`@Consumer` lets us tell Pact the name of the specified consumer we are testing against, again it must match what we specified in the consumer test.

`@PactBroker` is where we specify the url of our Pact broker where our consumer contract is stored.

Since it is actually the responsibility of the `ContractMapper` within our project to ensure that the message is in the correct format, that is the class that we will unit test using Pact. The result of the `mapContractDetails` method call is then serialised and verified against the contract that was generated and published to the broker by the consumer.

In this instance it seems like we have missed off two important fields that are needed by our consumer - `salary` and `team`:


```java
@Getter
@Builder
public class ContractDetails {
    private String documentType;
    private String firstName;
    private String lastName;
    private String duration;
}
```

As a result the test run failed with the following error:

```bash
1) A player contract: generates a message which has a matching body

    1.1) body: $ Actual map is missing the following keys: salary, team

        {
          "documentType": "contract",
          "duration": "5 years",
          "firstName": "Lebron",
        -  "lastName": "James",
        -  "salary": "158 million USD",
        -  "team": "LA Lakers"
        +  "lastName": "James"
        }
```

The result of the test failure has now been published to the pact broker:

<img src="/images/2022-09-05-pact-contract-testing-with-kafka/pact-test-failure.png" />

Once we update our code with the missing fields and retest:

```java
@Getter
@Builder
public class ContractDetails {
    private String documentType;
    private String firstName;
    private String lastName;
    private String team;
    private String duration;
    private String salary;
}
```

We now have a passing build, giving us confidence to push our producer code knowing that it does not contain any breaking changes for our consumer:

<img src="/images/2022-09-05-pact-contract-testing-with-kafka/pact-test-pass.png" />

All this was done locally without having to deploy both our consumer and producer into an environment, saving us from a lot of wasted time and effort.


