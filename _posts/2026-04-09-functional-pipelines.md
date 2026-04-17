---
layout: post
title: "Functional Pipelines"
description: "Learn how functional pipelines work in different languages."
summary: "Many popular programming languages have made changes in favor of developer ergonomics, which has resulted in functional paradigms for data transformation."
author: tonystr
team: default
category: Development
tags: [Programming, Rust, Functional programming, Linux, Learning]
language: en-US
canonical: http://tonystr.net/blog/functional_pipelines
original: This article was originally published on <a href="http://tonystr.net/blog/functional_pipelines">TonyStr.net</a>.
---

One of the major shifts in developer ergonomics has been the introduction of functional pipelines to most popular languages. A pipeline is a chain of operations on a set of data that transforms the data into another shape or value. It is made functional by using [lambda functions](https://en.wikipedia.org/wiki/Anonymous_function) as the primary way of specifying behavior.

```sh
git ls-files | grep -o "\.\w*$" | sort | uniq -c
```

Linux has always been built around this idea; *programs* accept text input and produce text output. This allows you to chain programs together with pipes (`|`). The above example finds all tracked files in a git repo, then matches just the file extension (for example `.xml`), then sorts them, and finally removes duplicates and counts each unique string, resulting in a list of file extensions and how many files have that file extension.

```sh
❯ git ls-files | grep -o "\.\w*$" | sort | uniq -c
      9 .css
      1 .gitignore
      1 .ico
      1 .jpg
      8 .json
     16 .md
     24 .mp4
     32 .png
      2 .scss
      2 .svg
      3 .ts
     14 .vue
      1 .webmanifest
     42 .woff2
```

Today, most programming languages allow you to operate on collections of data in a similar way.

```js
const array = ['Peter', 'John', 'Doyle', 'Aron'];
const result = array
	.filter(name => !name.startsWith('A'))
	.map(name => name.toLowerCase())
	.sort();
console.log(result);
```

This is fast and easy to write, but it isn't particularly efficient. In JavaScript, each pipeline operation is executed sequentially. First, `.filter()` allocates a new empty array, then loops through the old array and executes the predicate (the callback function) for each element. It aggregates each matching element into the new array, and returns it. Then `.map()` does the same. It allocates a new array, loops over the old array, executes the predicate for each element and inserts the transformed value into the new array. Finally `.sort()` actually doesn't allocate a new array, but sorts the previous array in place. This is the only one that doesn't allocate a new array, but this can cause confusion for developers. `const sortedArray = unsortedArray.sort()` will result in both `sortedArray` and `unsortedArray` being sorted, while `map` and `filter` do not have the same effect. Surely there is a better way to handle this?

Java solves the reallocation problem in their `Stream<T>` interface.

```java
int sum = widgets.stream()
	.filter(w -> w.getColor() == RED)
	.mapToInt(w -> w.getWeight())
	.sum();
```

This looks very similar, but the crucial difference here is that Java stream operations are not executed immediately. They wait until a "terminal operation" such as `.sum()` or `.collect()` before executing. This allows Java to perform multiple operations in the same iteration of the loop. Both filter and mapToInt are performed at the same time, equivalent to the following example:

```java
int sum = 0;
for (Widget w : widgets) {
	// Filter
	if (w.getColor() == RED) {
		// Map to int
		int weight = w.getWeight();
		
		// Sum
		sum += weight;
	}
}
```

Java and C# compile to [bytecode](https://en.wikipedia.org/wiki/Bytecode) or [Intermediate Representation](https://en.wikipedia.org/wiki/Intermediate_representation); essentially portable formats which are executed in virtual environments such as the [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine) (Java) or the [CLR](https://en.wikipedia.org/wiki/Common_Language_Runtime) (.NET). These languages rely heavily on JIT (Just-In-Time) compilation to optimize pipelines. Rust solves this with their *iterators*, which are optimized at compile-time, often into machine code which is as fast as (or faster than) the equivalent in for loops.

```rust
let result: u32 = widgets.iter()
	.filter(|w| w.color == Color.Red)
	.map(|w| w.weight)
	.sum();
```

Rust does something even smarter here too. `.iter()` will cause these operations to work on a clone of widgets so as to not affect the original array, but if you use `.into_iter()`, the widgets array will be "consumed" and the collection may be operated on in place. This gives the developers more fine-grained control over performance. Of course, you won't be allowed to use the `widgets` array after consuming it with `.into_iter()`, because that would cause the same confusion that JavaScript `.filter()` does.

Another difference is that Rust iterators can be operated manually and paused at will since an iterator is really just a `struct` with a pointer and an offset.

```rust
let mut iter: u32 = widgets.iter()
	.filter(|w| w.color == Color.Red)
	.map(|w| w.weight);

// Capture the first element (only possible if iterator is mutable)
let first = iter.next();

// Prints from 2nd element to the end
for weight in iter {
	println!("{}", weight);
}
```

Use these pipelines with care. Remember the performance implications, and beware that long method chains can become hard to read and even harder to edit. Sometimes procedural is best!
