---
layout: post
title: Creating a CXF REST service with Camel Blueprint
description: A tutorial on how to create a REST HTTP service supporting both xml and json including testing using Camel-Blueprint.
category: Development
author: phil_hardwick
tags: [Development,CXF,Camel,Blueprint]
comments: true
share: true
published: true
modified: ""
mathjax: false
featured: false
headline: ""
---




## CXF and Blueprint
Before diving into the main content I'll just give some short snippets about the technology used here.

[Camel](http://camel.apache.org/) is a framework which implements all the (widely-used) enterprise integration patterns and allows for communication between multiple transports (JMS, HTTP and others) through routing.

[Apache CXF](https://cxf.apache.org/) implements the [JAX-RS](https://jax-rs-spec.java.net/) specification and Camel provides support for it through the [CXFRS](http://camel.apache.org/cxfrs.html) component. When using this combination to develop REST services there's been a number of things I've wanted to do which haven't been immediately obvious. This blog will be looking at the parts of developing and testing a REST service, and explaining some of the gotchas involved.

The second interesting aspect of this is using Blueprint as the dependency injection mechanism for deploying this OSGi ready service. Blueprint can be difficult to test but hopefully that can be made easier with the tips that follow.

### Create your resources

My resource is a simple blog post which allows one operation on it: getting a single post by id using a path parameter.
Define your resources as follows:

```java 
	@Path("/post/")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public class BlogPost {
		
		@GET
		@Path("/{id}")
		public Post getPost(@PathParam("id") String postId) {
			return null;
		}
	
	}
```

**The first media type defined in your produces tag will be the default.** If a client does not specify an Accept header
on its HTTP request then the service will default to returning the first MediaType in the Produces tag.

### Camel Route and Blueprint
I use the fact that the CXFRS component puts the method name of the resource in the operationName header to route each request via a recipient list to a direct endpoint to process it. The restEndpoint field is set by blueprint, utilising it's DI and default property capabilities. The inline processor simply returns a Post object. For anyone not familiar with Camel, the route is by default a request-reply (or in-out in Camel's language) route which means as long as you don't send it somewhere else like an activemq queue then the exchange will be routed back to where it came from i.e. the CXF server, Camel takes care of all the http responding and marshalling for you which is excellent.

```java 
	public class RestServiceRouteBuilder extends RouteBuilder {
	
		private String restEndpoint;
	
		@Override
		public void configure() throws Exception {
			from(restEndpoint)
					.recipientList(simple("direct:${header.operationName}"));
	
	
			from("direct:getPost")
					.process(new Processor() {
						@Override
						public void process(Exchange exchange) throws Exception {
							Post blogPost = new Post();
							blogPost.setId(exchange.getIn().getHeader("id", Integer.class));
							blogPost.setTitle("My Title");
							blogPost.setContent("##Secondary title");
							blogPost.setTags(Arrays.asList("interesting"));
							blogPost.setPublishedDate(new Date());
							exchange.getIn().setBody(blogPost);
						}
					}).end();
		}
	
		public void setRestEndpoint(String restEndpoint) {
			this.restEndpoint = restEndpoint;
		}
	}
```

Finally, wire it all up in the blueprint. I have given my property placeholder element a persistent-id and an update strategy
of none. Using these default properties is what makes the service testable because I can swap the service url to a 
local url in my test. The cxf-server needs to know about it's resources in the serviceBeans element and it's providers which
automatically give you marshalling to JSON or XML for free. (As long as an annotated object is in the body when it reaches
the end of the Camel route).

```xml 
	<blueprint xmlns="http://www.osgi.org/xmlns/blueprint/v1.0.0"
			   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			   xmlns:camel-cxf="http://camel.apache.org/schema/blueprint/cxf"
			   xmlns:cm="http://aries.apache.org/blueprint/xmlns/blueprint-cm/v1.1.0"
			   xsi:schemaLocation="http://www.osgi.org/xmlns/blueprint/v1.0.0 http://www.osgi.org/xmlns/blueprint/v1.0.0/blueprint.xsd
		   http://camel.apache.org/schema/blueprint http://camel.apache.org/schema/blueprint/camel-blueprint.xsd">
	
		<cm:property-placeholder persistent-id="com.capgemini.example" update-strategy="none">
			<cm:default-properties>
				<!-- Endpoints -->
				<cm:property name="restEndpoint" value="cxfrs:bean:blogServiceServer?bindingStyle=SimpleConsumer"/>
	
				<!-- Service URL -->
				<cm:property name="api.root.url" value="/api"/>
			</cm:default-properties>
		</cm:property-placeholder>
	
		<camelContext xmlns="http://camel.apache.org/schema/blueprint">
			<routeBuilder ref="restServiceRouteBuilder"/>
		</camelContext>
	
		<bean id="restServiceRouteBuilder" class="com.capgemini.example.routes.RestServiceRouteBuilder">
			<property name="restEndpoint" value="${restEndpoint}"/>
		</bean>
	
		<!-- CXF servers -->
		<camel-cxf:rsServer id="blogServiceServer" address="${api.root.url}/1/blog"
							loggingFeatureEnabled="false">
			<camel-cxf:serviceBeans>
				<bean class="com.capgemini.example.api.resources.BlogPost"/>
			</camel-cxf:serviceBeans>
			<camel-cxf:providers>
				<bean class="com.fasterxml.jackson.jaxrs.json.JacksonJsonProvider"/>
				<bean class="com.fasterxml.jackson.jaxrs.xml.JacksonJaxbXMLProvider"/>
			</camel-cxf:providers>
		</camel-cxf:rsServer>
	
	</blueprint>
```

### Unit Test
Using camel-blueprint-test is the hardest part of this as it requires a lot of hidden dependencies. However, it is a useful
test to have and whilst it is slow I would recommend having at least one test in your suite to ensure your blueprint file
deploys. It's main drawback above the flakiness is it's speed, which is a lot slower than CamelTestSupport based
tests. So use CamelTestSupport for most tests and CamelBlueprintTestSupport for a single test.

The key to being able to test it is substituting an absolute local URL in for the cxf-server's address in the blueprint, so I have used a property to be able to switch it at test time. This can be achieved with a simple CamelTestSupport based test as well by setting the restEndpoint field on the route builder to an absolute local URL like so: cxfrs:http://localhost:10001/api/1/blog.

### Testing Gotchas
 * The persistent id returned from useOverridePropertiesWithConfigAdmin must be the same as the persistent-id attribute in the property-placeholder element in the blueprint file
 * If your properties being substituted in from useOverridePropertiesWithConfigAdmin aren't being deployed when the Camel 
context starts then specify update-strategy="reload"
 * Make sure asm-all:4.1 is the first dependency in your pom file's dependency list.
 * If you aren't receiving a message through your route then check that the route you expect is actually being started. 
Blueprint testing takes only the first Camel context it finds and loads that. To make sure it always loads your route 
use the bundle filter method. The below example will load any Camel context it finds except bundles whose names start with
bundle.name.unwanted and bundle.name.unwanted2:

```java 
	@Override
    protected String getBundleFilter() {
        return "(&(Bundle-SymbolicName=*)(!(Bundle-SymbolicName=bundle.name.unwanted*))(!(Bundle-SymbolicName=bundle.name.unwanted2*)))";
    }
```

 * If you are still receiving exceptions the best thing may be to update the version of your blueprint-test dependency to 
the latest version to avoid exceptions such as felix complaining about a null pointer in the main thread and 
"NoSuchComponentException: No component with id 'blueprintBundle' could be found" appearing in your logs.
 * It's very important to have logging enabled to diagnose issues if your blueprint test is not starting correctly.
 Issues such as blueprint giving up waiting for service is indicative of a wrong blueprint file with missing ids or 
 incorrectly specified beans.


### The Full Test
This test allows you to use a real HTTP client to test that your service implementation will work when deployed.
This is a much better test than overriding the endpoints with directs and simply testing the processing in the route
because it gives you confidence in your specification of the CXF server.

```java 
	public class RouteTest extends CamelBlueprintTestSupport {
    
        private static final String BASE_URL = "http://localhost:10001/api/";
        private CloseableHttpClient httpClient;
    	
        @Override
        protected String getBlueprintDescriptor() {
            return "/OSGI-INF/blueprint/blueprint.xml";
        }
    
        @Before
        public void setUpTests() {
            if (httpClient == null) {
                httpClient = HttpClients.createDefault();
            }
        }
    
        @After
        public void closeHttpClient() throws IOException {
            httpClient.close();
            httpClient = null;
        }
    
        @Override
        protected String useOverridePropertiesWithConfigAdmin(Dictionary props) throws Exception {
            props.put("api.root.url", BASE_URL);
            return "com.capgemini.example";
        }
    
        @Test
        public void testRouteReturnsAPostObjectInJson() throws Exception {
            String url = BASE_URL + "/1/blog/post/1";
            HttpGet httpGet = new HttpGet(url);
            CloseableHttpResponse response = httpClient.execute(httpGet);
            String stringResponse = EntityUtils.toString(response.getEntity());
            Post blogPost = new ObjectMapper().readValue(stringResponse, Post.class);
            assertEquals("My Title", blogPost.getTitle());
            assertEquals(1, blogPost.getId());
        }
    
        @Test
        public void testRouteReturnsAPostObjectInXML() throws Exception {
            String url = BASE_URL + "/1/blog/post/1";
            HttpGet httpGet = new HttpGet(url);
            httpGet.addHeader("Accept", MediaType.APPLICATION_XML);
            CloseableHttpResponse response = httpClient.execute(httpGet);
            String stringResponse = EntityUtils.toString(response.getEntity());
            JAXBContext jaxbContext = JAXBContext.newInstance(Post.class);
            Unmarshaller unmarshaller = jaxbContext.createUnmarshaller();
            Post blogPost = (Post) unmarshaller.unmarshal(new StringReader(stringResponse));
            assertEquals("My Title", blogPost.getTitle());
        }
    }
```

The end result is a real CXF service being run at test time enabling you to test your full implementation before it's even been deployed!

The full project can be found here: [https://github.com/PhilHardwick/cxf-blueprint-camel-example](https://github.com/PhilHardwick/cxf-blueprint-camel-example)

### Useful Links:

 * [CXFRS component](http://camel.apache.org/cxfrs.html)
 * [Marshalling in CXF](http://cxf.apache.org/docs/jax-rs-data-bindings.html)
 * [Blueprint Test](http://camel.apache.org/blueprint-testing.html)
 * [Camel Property Placeholder](http://camel.apache.org/using-propertyplaceholder.html)
