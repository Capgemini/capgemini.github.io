---
layout: post
title: "How fast are your React&#8209;ions"
subtitle: "Optimising the performance of React applications"
description: "What makes React fast and how best to optimise the performance of your applications"
category: React
author: paul_monk
tags: [React, Redux, Programming, JavaScript]
comments: true
share: true
---

## Overview
Since its conception by Facebook in 2013, [React](https://reactjs.org/) has quickly become one of the most popular libraries for building web-based user interfaces. React uses JavaScript to create a dynamic web application normally rendered directly on the client side device, similar to [Angular](https://angular.io/) or [Vue.js](https://vuejs.org/). However, unlike other frameworks where the HTML and JavaScript are split into separate files, React uses JSX to include HTML-like structures inside JavaScript code. Its design encourages the use of small reusable components so it scales well when building large applications.

As React is a library it is already a lot more flexible than other JavaScript frameworks available, this is a good thing but does mean there are a lot more development decisions to make! It also offers excellent performance out of the box but must be used in the correct way to maintain this performance when building more complex applications.

## What Makes React Fast
React has been designed with speed in mind, and each update brings additional performance improvements.

Firstly React uses state and one-way binding. The state of a component is a fancy name for the data that it displays on the web page. In React the state is the single point of truth for a component, as the state controls what data the HTML renders, and can only be updated using the `setState` method. This is the concept of one-way binding where the state is used to automatically update the HTML, but changes to the HTML don’t automatically update the state. In contrast in two-way binding the data and HTML are linked, so an update to one will cause the other to be automatically updated. This was a big performance issue with Angular version 1 ([AngularJS](https://angularjs.org/)), where there were too many listeners watching for changes within the HTML, meaning the web page would grind to a halt everytime a text box was updated. One-way binding can mean a little more code has to be written as `onChange` events must be fired from the HTML, which cause the state to be updated, which then causes the HTML to update. This may seem a little complicated but it means the only listeners watching for changes are the ones you define. So page updates only occur when you want them to, making your application very fast and efficient!

Secondly it is optimised to only update sections of the page when they are affected by state changes. Just because the user enters data into a text box doesn’t mean the whole page has to be updated. As React has the concept of splitting the page up into components, it means individual components can be updated without affecting the rest of the page. One issue with this however is that it can become difficult to update all the related components if data changes, but global data stores like [Flux](https://github.com/facebook/flux/blob/master/README.md) and [Redux](https://redux.js.org/) have the solution to this. They introduce the concept of a global state where data can be shared between unrelated components, and updates are fired to the appropriate components when the global state changes.

Thirdly React has the concept of a virtual DOM. Updating the web page through the browser can be slow even for small changes (particularly in Internet Explorer and mobile browsers). This problem is solved by holding a copy of the web page in memory. This means that React can update the virtual DOM and calculate what changes the browser actually needs to make, before giving these specific instructions to the browser. So instead of leaving the browser to work things out React can provide a “patch” which will just update specific parts of the page. Another advantage to the virtual DOM concept is improved testability. React can essentially play the role of a browser so you can now run proper unit and integration tests against an application without using a browser, making the UI tests faster and far more reliable!

## How React Compares
There is a lot of competition in the JavaScript UI world with many different frameworks and libraries, and performance is often used to compare them all. React is one of the most popular UI libraries, however Angular by Google is also very widely used, and Vue.js is a new framework that is quickly becoming popular with UI developers.

When a web page is loaded for the first time the browser must download all the relevant HTML and JavaScript code, so the more it has to download the longer the user has to wait. This means that smaller JavaScript libraries will result in faster page loading times. Unlike Angular and Vue.js, React is classed as a library not a framework which means it has less features included in its core code. This is a good thing as it means you only bring in features as you need them, instead of having loads of features which your aren’t using. So comparing the JavaScript file sizes when they have been gzipped: as of version 16 the React library with React DOM is 31.8kB, Angular is more bloated at 111kB but Vue.js is the smallest at just 20.9kB.

React and Vue.js both make use of the virtual DOM to speed up page updates, Angular doesn’t have a concept of a virtual DOM but it does still optimise the updating of the webpage by only updating the parts that have changed.

Ultimately in terms of performance all three are very similar, traditionally Angular has struggled with performance but as of version 5 it is very slightly faster than Vue.js and React overall according to this [3rd party benchmark](http://www.stefankrause.net/js-frameworks-benchmark7/table.html). Of course if you want pure performance then there are other libraries like [Inferno](https://infernojs.org/), however they have less community support than the more well known solutions. Ultimately plain JavaScript is always going to be the fastest performance wise but it takes a lot of effort and expertise to develop a fully dynamic web application without an additional library or two!

## Improving the Performance of Your React-ions
So React is designed to be fast and efficient, but it is also easy to kill the performance of your application by having badly designed component trees and causing unnecessary re-renders of the web page.

### Component Hierarchy
An important piece of React knowledge to remember is that updating a top level component will cause all the child components nested within it to update. This can be extremely powerful when making a single page web application, however not knowing this can also be the cause of some major performance issues. It is important that your component tree is designed to minimise the amount higher level parent components are updated.

For example if you have a search page, which may consist of an input box and a list of results, the following component design is not ideal:
```
Search page parent
                  |__ Input box
                               |__ Table of results
```

Having the table of results nested within the input box component means that every time the input box is updated e.g. when the user types a letter, the entire table of results would also be automatically updated.

To fix this issue consider this alternative component design:
```
Search page parent
                  |__ Input box
                  |__ Table of results
```

Here the table of results is at the same level as the input box, meaning the input box component can be updated without affecting the table of results.

This example may seem trivial, but thinking about the design of the component hierarchy in advance can lead to massive performance increases in a large application.

### Preventing Unnecessary Re-renders
Sometimes it is necessary to update the high level parent components. However this doesn’t mean all the child components need to be updated. The `shouldComponentUpdate` method can be used to decide whether a component’s HTML needs to be updated or not by returning a boolean value. In the standard React `Component` class this method just returns true, meaning that the component will always update when its parent component updates or its state changes. However React also provides a `PureComponent` class. This provides a better implementation of the `shouldComponentUpdate` method that shallowly compares every object/variable in the component’s state for changes, and if nothing has changed it will return false preventing an unnecessary update. If this still isn’t good enough you can provide your own implementation for the `shouldComponentUpdate` method, however it is advisable not to deeply compare the values of nested objects or loop over every element in an array as this can be computationally expensive. Instead of deeply comparing objects/arrays for changes the immutable design pattern should be used, where a change to an object/array causes it to be copied to a new object/array. Libraries like [Immutable.js](https://immutable-js.github.io/immutable-js/) can assist with this, but again if the data for your application is being updated frequently these operations can be more expensive than just re-rendering the HTML.

### Keep the Render Method Simple
The `render` method of a React component should be used to describe its HTML structure, and nothing more. As this method is called frequently it is not the place to initialise variables or perform complex calculations.

The `render` method should rely on the component’s state to provide it with all the values it needs, so instead of performing calculations inside the `render` method do them when updating the state of the component instead.

Objects should not be cloned or initialised within the `render` method. These jobs should be done in the component constructor method, so all the objects the component needs are created the first time it is rendered and aren’t recreated every time it re-renders.

Finally try not to write inner functions, or arrow functions inside the `render` method. Everytime the component is re-rendered these functions will be recreated. Not only does this waste computation time but it can also cause child components to needlessly re-render. Examine the following two code examples:

#### Example 1:
```javascript
class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={e => this.setState({value: e.target.value})}
                    />
                </label>
            </form>
        );
    }
}
```

#### Example 2:
```javascript
class MyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <form>
                <label>
                    Name:
                    <input
                        type="text"
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                </label>
            </form>
        );
    }
}
```

Both examples make use of the `onChange` callback method of a React Input text box to update the component’s state as the user types. Example 1 uses a JavaScript ES6 arrow function to create an anonymous function inside the `render` method, example 2 creates a named function bound to the MyForm class. To look at, example 1 is much tidier, however the anonymous arrow function will be recreated each time the user types a letter in the text box, it will also get recreated any time the component is re-rendered. Additionally the Input component will compare its previous state to its new one before it decides if it should update or not, however as the anonymous function will be new each time, the Input component always gets re-rendered whether the text inside it has changed or not. In contrast with example 2 the `handleChange` function is only ever created once and won’t force the Input component to update if the text inside hasn't changed.

### Use Redux
Redux provides an application with a global state which can be used to share variables between unrelated components. This is a very useful feature that can also help improve the performance of an application.

Firstly Redux gives you more options when designing the component hierarchy of an application. It means that components can share data with each other without having to be explicitly connected by a parent component. Two unrelated components can then be updated through a Redux state change without affecting any other components within the application.

Secondly Redux itself has many performance optimisations. Components can register their interest in specific variables within the global state, and Redux will only update those components when the variables they are interested in change. Bear in mind objects/arrays are shallowly compared, so a component that registers interest in an object/array may be re-rendered by Redux even if the data hasn’t been changed.

However overusing Redux can negatively impact performance. If a lot of components register interest in a variable, then they will all be updated when that variable is changed. It is advisable to keep variables scoped to the state of a specific component unless they really need to be shared across the entire application. Redux can also increase the complexity of the code, by introducing more files and “black box” actions, making bugs/performance issues difficult to pinpoint.

### Server-side Rendering
By default React does all of its work on the client-side machine. This can help take the load off the server and make for a more responsive client-side experience. However for slower client machines and mobile devices it can increase the initial loading time of the web page. To solve this problem React introduces the concept of rendering the initial web page server-side, and handing control over to the client for subsequent page updates. The [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) library can be used to implement server-side rendering. This improves the users experience as not only does the page load very quickly, it also responds quickly when they make changes, and uses less computational power on their device potentially extending battery life on mobile devices. Additionally as of React version 16 server-side rendering has been made up to [3.8x faster](https://reactjs.org/blog/2017/09/26/react-v16.0.html#better-server-side-rendering).

## Tools to Find Performance Bottlenecks
As of version 15.4.0 a new performance timeline was introduced. This allows you to see when components get mounted, updated and unmounted, and how long each operation is taking. This tool currently only works in Edge, Chrome or IE. See the ReactJS site for [instructions on using this tool in Chrome](https://reactjs.org/docs/optimizing-performance.html#profiling-components-with-the-chrome-performance-tab) .

Another useful tool is the [why-did-you-update](https://www.npmjs.com/package/why-did-you-update) library. This can be plugged into your application and detects when a component re-renders unnecessarily. It will print out logs to the console when a component updates even if its state didn’t change. This can be useful to pinpoint places where you should be using a `PureComponent` instead of a plain `Component` or implement your own version of `shouldComponentUpdate`.

## Conclusion
If you want to build a maintainable, reliable and fast web application then React is a good way to go. It has been built with performance in mind and is suitably fast for most use cases without the need for any performance optimisations. However without knowing some of the theory behind React it can be very easy to build slow and inefficient applications.

If your application is a little sluggish then there are many steps you can take to speed things up. However the easiest way to build a performant React application is to get the initial design of the component hierarchy correct so that you never experience any performance issues.
