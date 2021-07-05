---
layout: post
title: "Roslyn-Based .NET Code Analyser"
subtitle: ".NET Compiler as a service"
description: "Practical application of .NET Compiler as a service platform."
category: .NET
author: [ekhor, kriss]
tags: [.NET, C#, Code Analysis]
comments: true
share: true
---

While it is relatively easy to write code, it is not so easy to write high quality maintainable code. In this post, we introduce a technology - [Roslyn](https://github.com/dotnet/roslyn ".NET Compiler Platform"), which enables .NET software engineering teams to implement automated code reviews based on the skills which they already have.

## Introduction
The typical modern software engineering team is comprised of people with diverse background and experiences and as such, there is a need to implement some quality control mechanism which aims to ensure that the code developed by the team, is fit for purpose. One technique often used to achieve this is code review. Wikipedia provides the following definition for code review:

> *Code review is systematic examination (sometimes referred to as peer review) of computer source code. It is intended to find mistakes overlooked in software development, improving the overall quality of software. Reviews are done in various forms such as pair programming, informal walkthroughs, and formal inspections*
> <cite> [Wikipedia](https://en.wikipedia.org/wiki/Code_review "Code Review")

Within the Capgemini engineering blog, these two posts, [Better Learning Through Code Reviews](https://capgemini.github.io/learning/better-learning-code-reviews/ "Better Learning Through Code Reviews") and [What to look for in a code review](https://capgemini.github.io/drupal/what-to-look-for-in-code-review/ "What to look for in a code review"), provide more information about code reviews. 

While automated code reviews generally result in more reliability when compared to manual code reviews, they often introduce licence costs, significant customisation efforts and lack of project specific context.

With the introduction of Roslyn-based .NET code analyzers, it is now quite straight forward for any .NET developer to develop code analyzers which are able to target specific projects. In addition, such an analyzer will be enforced in real time within most standard .NET integrated development environment (IDE) such as Visual Studio. Therefore, code issues are detected as the code is being written by developers which results in minimizing the cost for potential rework.

## Roslyn Analyzers
Roslyn is the code name for the .NET compiler as a service offering and prior to Roslyn, source code compilers operated as black boxes which accepts source code as input. Upon compilation, either a binary is produced for successful compilation or error(s) when the compilation fails. This is however different with Roslyn.

In addition to the general source code compilation performed by compilers, Roslyn provides “hook points” - events, through which subscribers can participate in the compilation process. For example, an event may be when Roslyn encounters a constructor or a method or even a variable within the source code.  Through such events, a subscriber which is bespoke code, otherwise referred to as a code analyzer, can obtain rich information about the input source code – full access to the entire syntax tree.

With this contextual information about the source code, it is possible for the analyzer to enforce specific rules on how code should be constructed. In addition, an analyzer can if necessary fail the entire source code compilation process and send relevant information back to the compiler which is subsequently displayed as part of the compiler log information.

Consequently, specialised analyzers can be developed to process very specific portion of a source code. For example, it is possible to develop an analyzer which fails the compilation process when any method has more than say 13 parameters or when a method has more than 100 lines of executable code.

Roslyn-based code analyzers are .NET libraries which can be developed in both C# and VB.NET. They can either be packaged as [Visual Studio extensions](https://msdn.microsoft.com/en-us/library/bb166030.aspx "Starting to Develop Visual Studio Extensions") or as [NuGet packages](https://www.nuget.org/ "NuGet packages") which require no installation and apply only to the C# projects which depends on them.

This blog post on [Getting Started with Roslyn Analyzers](https://docs.microsoft.com/en-us/visualstudio/extensibility/getting-started-with-roslyn-analyzers "Getting Started with Roslyn Analyzers") provides detailed information about Roslyn analyzers.

## How to Create a Code Analyzer
To develop a Roslyn code analyzer, the .NET Compiler Platform SDK must be installed on the development machine. This process is simplified if Visual Studio is the development IDE.

Open Visual Studio 2015/2017 -> Select Tools > Extensions and Updates. In the Extensions and Updates dialog box, select Online on the left, and then in the search box, type
.NET Compiler Platform SDK.

This resource on [Getting Started with Roslyn Analyzers](https://msdn.microsoft.com/en-us/library/mt162308.aspx "Getting Started with Roslyn Analyzers") provides more information on how to develop .NET code analyzers.

Once the SDK is installed, it adds a syntax visualizer window to Visual studio. This window is very useful when analysing code syntax tree. The Syntax Visualizer can be displayed via View > Other Windows > Syntax visualizer and the figure below shows a screen shot of this window.

![Syntax Visualizer](/images/2018-03-15-roslyn-based-net-code-analyser/syntaxvisualizer.png)

## Implementing the Analysis Logic
Each code analyzer using the Roslyn SDK must inherit the base class `Microsoft.CodeAnalysis.Diagnostics.DiagnosticAnalyzer` and implement two fundamental steps:
1. Write a method that will perform the code analysis over a given syntax node
2. Register the action at the analyzer’s start-up so that the analyzer can respond to compiler events.

The registration is done within the Initialize method by invoking the `RegisterSyntaxNodeAction` method of the `AnalysisContext` parameter. `RegisterSyntaxNodeAction` requires a delegate method and a syntax type that will trigger the delegate method. For example, if RegisterSyntaxNodeAction has a second parameter of `SyntaxKind.ConstructorDeclaration`, the delegate passed in as the first parameter will be triggered every time a class constructor is encountered by Roslyn. 

The code sample below registers a `AnalyzeMethodDeclaration` which will be triggered whenever Roslyn encounters any method.

```
public override void Initialize(AnalysisContext context)
{
    context.RegisterSyntaxNodeAction(AnalyzeMethodDeclaration, 
                                     SyntaxKind.MethodDeclaration);
}
```
And the implementation of the delegate is shown below:

```
private void AnalyzeMethodDeclaration(SyntaxNodeAnalysisContext context)
{
    var root = context.Node;
    //Code analysis logic implementation
	
    //Create a diagnostic at the node location
    var diagnostics = Diagnostics.Create(Rule, 
                                         root.GetLocation(), 
                                         message);

    context.ReportDiagnostic(diagnostics);
}
```

## Deployment
Once the code analyzers are implemented and tested, the project produces an analyzer .dll output. This output is then packaged into both a NuGet and a VSIX extensions.

The NuGet Package (.nupkg file) will add the analyzer to your target project as a project-local analyzer which participates in the project builds. This option is particularly suitable to a continuous integration workflow as there is no need to install any software. The package moves with your .NET project and a NuGet restore is all that is required before a build to ensure that the package is available to the project.

The VSIX extension (.vsix file) will install the analyzer library as an extension to Microsoft Visual Studio. As such, the analyzers are subsequently available to all projects opened with this instance of Visual Studio IDE.

## Applying your NuGet Package
1. Create a local NuGet feed
2. Copy the .nukpg file into that folder
3. Right-click on the project node in Solution Explorer and choose Mange NuGet Packages
4. Select the NuGet feed you created on the left
5. Choose your analyzer from the list and click install

## Conclusion
To maintain a high-quality code base which ultimately delivers value within software projects, code reviews are an essential part of the development workflow. With the introduction of Roslyn-based code analyzers, the effort required to develop automated code reviews have been significantly reduced. In addition, these code analyzers have full access to the syntax tree and as such rich contextual information about the source code.

Furthermore, Roslyn analyzers can be deployed through NuGet which aligns very well to the continuous integration workflow.
We have in the post presented a high-level overview for Roslyn analyzers. In subsequent posts, we intend to present detailed implementation of analyzers based on this technology that are currently been used within the Capgemini Microsoft business unit team to ensure a high level of code quality and consistency.
