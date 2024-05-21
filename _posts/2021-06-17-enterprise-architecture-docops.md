---
layout: post
title: "Enterprise Architecture DocOps"
subtitle: "Boosting docToolchain with Azure DevOps to streamline collaboration and governance"
category: Architecture
tags: [Architecture, Documentation, Governance, DevOps, Azure, AsciiDoc]
author: [riccardo_freschi]
comments: true
draft: false
share: true
---

## Introduction

>The purpose of Enterprise Architecture is to optimize across the enterprise the often fragmented legacy of processes (both manual and automated) into an integrated environment that is responsive to change and supportive of the delivery of the business strategy.
><cite>[The Open Group Architecture Framework, Part I: Introduction](https://pubs.opengroup.org/architecture/togaf9-doc/arch/index.html)

One of the tasks of an Enterprise Architect (EA) is to produce a set of artifacts that collectively form the architecture documentation. Such documentation constitutes the main input to Architecture Governance (AG).

>Architecture Governance is an approach, a series of processes, a cultural orientation, and set of owned responsibilities that ensure the integrity and effectiveness of the organization's architectures.
><cite>[The Open Group Architecture Framework, Part VI: Architecture Capability Framework](https://pubs.opengroup.org/architecture/togaf9-doc/arch/chap44.html#tag_44_02_01_01)

In the absence of general consensus on architecture documentation's format, structure and content, a number of problems have made the subject somehow vexed within the EA's and software development communities, leading to well known issues like artifacts that are:
- outdated, created some time in the past, the original authors unknown or moved on
- crafted without clear purpose, by different people with insufficient coordination
- overwhelming in volume, made of information scattered in various files or wiki pages without structure
- painful to write and maintain because goals and tools to use are undefined or unclear

Special discomfort is provided by diagram maintenance, where energy is spent during inception phase to create shapes, connections, fitting layout..., which soon enough becomes wasted, as new updates are required and a lot of effort needs to be spent again to get the artifact to a reasonable level of quality. Not to mention versioning: the delta between different versions of a diagram is not immediately visible and can be partially missed if not inspected with care.

On top of that, in the context of governance, documentation review and approval processes vary a lot, often not fully defined and lacking formalities, e.g. based on files exchanged and reviews happening via email.

## docToolchain

[Documentation as Code](https://www.writethedocs.org/guide/docs-as-code/) (_docs-as-code_) refers to the philosophy advising authoring documentation with the same tools as code.
Text-based version control systems, like [Git](https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control), simplify and bring formality to review and approval processes via [workflows](https://www.atlassian.com/git/tutorials/comparing-workflows) and [pull requests](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests), enabling then easier and clearer paths to documentation finalisation.

[AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/) is a markup language, embracing the _docs-as-code_ approach and primarily conceived to write technical documentation. Thanks to an AsciiDoc processor, like [Asciidoctor](https://docs.asciidoctor.org/asciidoctor/latest/#what-is-asciidoctor) the language produces a variety of output formats, such as HTML and PDF.

Similarly to _docs-as-code_, _diagrams-as-code_ adopts text to represent and produce diagrams, with similar benefits.

[Asciidoctor Diagram](https://asciidoctor.org/docs/asciidoctor-diagram/) is a set of Asciidoctor extensions that empower the author to add text-described diagrams to an AsciiDoc document.
Each extension runs the diagram processor to generate an SVG, PNG, or TXT file from the input text. The generated file is then inserted into the converted document.
There are nearly thirty diagram generators supported and amongst them the popular [PlantUML](https://plantuml.com/), which facilitates designing a number of diagram types, e.g.: sequence, class, state, timing, JSON, YAML, Gantt and many others. A few rendering examples below (source code in [Appendix](#appendix-plantuml-diagrams-source-code)):

<figure>
  <img src="/images/2021-06-07-enterprise-architecture-docops/client-credentials-flow.png" alt="Client Credentials Flow" class="centered medium-8"/>
  <figcaption>Sequence type</figcaption>
</figure>

<figure>
  <img src="/images/2021-06-07-enterprise-architecture-docops/class-diagram.png" alt="Animals" class="centered medium-8"/>
  <figcaption>Class type</figcaption>
</figure>

<figure>
  <img src="/images/2021-06-07-enterprise-architecture-docops/jk-rowling-json.png" alt="J.R. Rowling JSON" class="centered medium-8"/>
  <figcaption>JSON type</figcaption>
</figure>

[arc42](https://arc42.org/) is a template for documenting software and system architectures, whose golden master is formatted in [AsciiDoc](https://docs.asciidoctor.org/asciidoc/latest/) and which is [publicly available](https://arc42.org/download).
It is segmented into twelve sections, each containing help, divided into contents, motivation and form. [Real-world examples](https://arc42.org/examples) are also available.

Putting it all together is [docToolchain](https://doctoolchain.github.io/docToolchain/), a set of scripts that automate the steps of exporting AsciiDoc documents (including arc42-based ones) and rendering diagrams, all to the chosen target format (e.g. HTML).

## DocOps with Azure DevOps

[DocOps](https://www.writethedocs.org/guide/doc-ops/) applies to the creation, management, and release of documentation, similarly to those applied to source code by [DevOps](https://www.atlassian.com/devops): it is a set of practices automating and integrating the process of developing documentation across engineering, product, support, and technical writing teams.

Starting with docToolchain, in order to fully comply with the DocOps approach, the missing piece is the automatic deployment of the  documentation, once the approval is granted (in the form of an approved pull request).

To cover that "last mile", I decided to host the documentation on Azure DevOps Repos and implement a pipeline in Azure DevOps Pipelines that, after being triggered by an update to the documentation repository master branch, builds an HTML page with text and diagrams and deploys to a website.
For the purpose of this exercise I decided to use a [static website hosted in Azure Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website) as the destination (a lot of other types are available, selection depending on requirements).

![DocOps pipeline on Azure DevOps](/images/2021-06-07-enterprise-architecture-docops/docops.png){: .centered.medium-12 }

(The PlantUML diagram definition for the above is in [Appendix](#appendix-plantuml-diagrams-source-code).)

Here is the definition of the pipeline in YAML:

```yaml 
variables:
  documentationRoot: #subpath to the folder where arc42-template.adoc is located,
                     #e.g. after arc42 template download and unzip: arc42-template-EN-withhelp-asciidoc

resources:
  repositories:
  - repository: docToolchain
    type: github
    endpoint: #name of the Azure DevOps connection to github
    name: docToolchain/docToolchain
 
trigger:
- master

pool:
  vmImage: ubuntu-latest

steps:
- checkout: self
- checkout: docToolchain
  submodules: recursive
- script: sudo apt install graphviz #dependency of some PlantUML diagram types
  displayName: 'Install graphviz'
- script: |
    cd docToolchain
    rm -rf .git
    rm -rf resources/asciidoctor-reveal.js/.git
    rm -rf resources/reveal.js/.git
    ./gradlew -b init.gradle initExisting -PnewDocDir="$(Build.SourcesDirectory)/$(documentationRoot)"
    ./bin/doctoolchain "$(Build.SourcesDirectory)/$(documentationRoot)" generateHTML
  displayName: Generate HTML

- task: AzureCLI@1
  displayName: Azure File Copy to Storage
  inputs:
    azureSubscription: #name of the Azure DevOps connection to the Azure Subscription 
                       #where the storage container is hosted
    scriptLocation: inlineScript
    inlineScript: |
      az storage blob upload-batch \
        --destination \$web \
        --account-name "myStorageAccount" \
        --source "$(Build.SourcesDirectory)/$(documentationRoot)/build/html5"
```

## Conclusion

I like working with AsciiDoc for personal and shared documentation: advantages over [Markdown](https://daringfireball.net/projects/markdown/), the more widely adopted alternative, are extensibility and a unique flavour, compared to [the many](https://github.com/commonmark/commonmark-spec/wiki/Markdown-Flavors) existing for Markdown, which make the language difficult to port between environments. I also appreciate the large range of diagramming tools supported.

I believe _diagrams-as-code_ is a handy approach for versioning images together with the document and enabling exact and fast delta highlighting. The default styling, especially in PlantUML, is quite basic, but can be customised, if needed.
Adopting the default style though, presents the advantage of consistency between documents and authors, which gives the reader faster grasping of the concepts depicted in the diagrams. 

I found arc42 a good starting point as a template, though I feel it is missing the next level of detail, e.g.: sections related to the Logical Information Model (objects, stores and flows) and a Security view.

Finally, I particularly appreciate the workflow achieved with text-only documentation, source control and CI/CD: the easy collaboration, the approval process, the clear versioning, the history tracking that comes with it, the evidence of which version is current, and the auto-deployment.

## Appendix: PlantUML diagrams source code

### Sequence type

```
@startuml
actor User
User -> "Authentication Provider" as Auth : Authenticate with Client ID + Client Secret
activate Auth
Auth ->  Auth : Validate Client ID + Client Secret
Auth --> User : Access Token
User -> "Web Service" as Service : Request Data with Access Token
Service --> User : Response
@enduml
```

### Class type

```
@startuml
class Animal {
  age
  gender
  isMammal()
  +feed()
}

class Duck {
  featherColour
  beak
  +swim()
  +quack()
}

class Lion {
  maneColour
  +roar()
  +chase()
}

class Beak {
  colour
  length
  +open()
  +close()
}

Animal <|- Duck
Animal <|-- Lion

Duck *- Beak
@enduml
```


### JSON type

```
@startjson
{
  "name":"J. K. Rowling",
  "born":"31 July 1965",
  "genre":"Fantasy",
  "country":"United Kingdom",
  "occupation":"author",
  "books":[
    {
      "title":"Harry Potter and the Philosopher's Stone",
      "yearPublished":1997,
      "pages":223
    },
    {
      "title":"Harry Potter and the Chamber of Secrets",
      "yearPublished":1998,
      "pages":251
    }
  ]
}
@endjson
```

### DocOps workflow

```
@startuml
!define AzurePuml https://raw.githubusercontent.com/plantuml-stdlib/Azure-PlantUML/master/dist
!includeurl AzurePuml/AzureCommon.puml
!includeurl AzurePuml/Storage/AzureBlobStorage.puml
!includeurl AzurePuml/Identity/AzureActiveDirectory.puml
!includeurl AzurePuml/DevOps/AzurePipelines.puml
!includeurl AzurePuml/DevOps/AzureRepos.puml
!includeurl AzurePuml/General/Azure.puml

skinparam linetype polyline
skinparam linetype ortho


file "arc42 template" as arc42
Azure(azure, "Cloud computing", "Subscription", ) {
  AzureBlobStorage(blob, "Storage Account", "$web Container",) {
    file HTML
  }
  AzurePipelines(pipeline, "Build + release", "CI/CD",) {
    [GraphViz]
    component docToolchain {
      [Asciidoctor]
      component "Asciidoctor Diagram" {
        [PlantUML processor] as PlantUML
        [Other processors, e.g. Mermaid] as otherProcessors
      }
      [Other generators, e.g. PDF]
      [HTML generator] as HTMLgenerator
    }
  }
  AzureRepos(repo, "Architecture documentation", "Repository", ) {
    file "Diagrams, format: e.g. PlantUML"
    file "Text documents, format: AsciiDoc"
  }
  AzureActiveDirectory(ad, "Authentication + authorisation", "AD",)
}

repo ---> docToolchain
arc42 <|--- repo
HTMLgenerator --> HTML
GraphViz -- PlantUML: < dependency

otherProcessors -[hidden]-> blob
@enduml
```
