---
layout: post
title: "Rematch: Redux Without the Bloat"
description: A post on the Rematch framework, and its usage in React
tags: [Rematch, Redux, React, Frontend, Engineering, Technology]
category: [Development]
author: [greg_wolverson]
comments: true
share: true
---

State management. Whilst being a critical aspect of writing frontend applications, it's an ever-changing landscape. You might be reading this and thinking [what even is state, and why do I need it?](https://egghead.io/articles/what-is-state-why-do-i-need-to-manage-it) Fundamentally, at a high level, state management is exactly what it says on the tin: a way of managing state. In reference to writing apps, it's about how you manage your application state. To this effect, I want to look at a particular library for managing state that I've come across recently that has made writing React apps with state fun again: [Rematch](https://rematch.gitbooks.io/rematch/#getting-started).

## A bit of Context

[Redux](https://redux.js.org/introduction/getting-started) is great. I've been using Redux for a number of years and its clean, simple API has meant state management in my React apps has been nicely abstracted. However, the more apps I build, the more I find myself going through the same rigorous setup process before I can get started; create and setup my store, create and setup my root reducer, loosely build my actions and a separate file for my action types. I even built a [Yeoman generator](https://github.com/gwolverson/generator-react-redux) to scaffold a project with create-react-app and Redux to save me time and effort. 

It's important to point out, you [might not even need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367), or any state management library for that matter - [React can handle state management for you](https://kentcdodds.com/blog/application-state-management-with-react). 


## A Redux Example

Following best practices, when using Redux with React, often you'll end up with a directory structure which looks something like this, for example: 

```
-- public
-- src
  -- main
    -- actions
      +-- actionTypes.js
      +-- todoActions.js
    -- reducers
      +-- rootReducer.js
      +-- todoReducer.js
    -- store
      +-- store.js
    -- components
      +-- TodoForm.js
    -- containers
      +-- TodoContainer.js
    +-- App.js
+-- index.js 
```

As for the code, the following examples show what each of the core JavaScript files look like, when writing a React app with Redux:



`store.js`

```
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers/RootReducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);

export default () => {
  return createStore(
    rootReducer,
    enhancer
  );
};
```

`rootReducer.js`

```
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
    // Reducers go here...
});

export default RootReducer;
```

`index.js`

```
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from './main/store/store';
import App from './main/App';
import * as serviceWorker from './serviceWorker';

let store = configureStore();

render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>, 
  document.getElementById('root')
);
```

Whilst the above doesn't look like much - and you'd be right in thinking that - it quickly grows as you start to write your reducers and actions. 

`todoActions.js`

```
export const addTodo = text => ({
  type: 'ADD_TODO',
  id: nextTodoId++,
  text
})
```

`todoReducer.js`

```
const todoReducer = (state = {}, action = {}) {
    switch (action.type) {
        case ADD_TODO: 
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case default:
            return state;
    }
}
```

And then connecting these up in your container:

```
import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as todoActions from '../actions/todoActions.js';

class TodoContainer extends Component {
    state = {
        text: ''
    }

    handleChange = event => {
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.todoActions.addTodo(this.state.text);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type='text' onChange={this.handleChange}/>
                <button type='submit'>Add Todo</button>
            </form>
        )
    }
}

export default connect(
    state => ({
        todos: state.todos
    }),
    dispatch => ({
        addTodo: bindActionCreators(todoActions, dispatch)
    })
)(TodoContainer)
```

The above is a _very_ simple example of a todo app, which for now just adds a todo. I haven't been overly verbose in explaining the intricacies of how Redux is setup and bound to React, but more information can be found [here in the Redux docs](https://redux.js.org/basics/example), and for [React specifically](https://redux.js.org/basics/usage-with-react). 

The point is that whilst Redux is a brilliant framework for managing application state, it's begun to feel a bit bloated with regards to the amount of boilerplate code you end up writing and maintaining, if it wasn't for [Redux devtools](https://github.com/reduxjs/redux-devtools), it might be difficult to see how everything lines up and works together, once your app grows significantly, depending on how you've built it. 


## Introducing Rematch

As I mentioned above, Redux _is_ a brilliant framework for managing state. It would just be nice to have a library which gives you all the best practices of Redux, without the boilerplate. That's where [Rematch](https://rematch.gitbooks.io/rematch/#getting-started) comes in. It's effectively a wrapper around Redux, giving you all the Redux goodness, without the rigorous setup process. Let's take the todo example above and look at it implemented in Rematch.

`index.js`

```
import React from 'react'
import { Provider } from 'react-redux'
import { init } from '@rematch/core'
import App from './App'

const store = init() // Creates a redux store for us without the boilerplate

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
)
```

Making a call to Rematch's `init()` function, initializes you a Redux store under the hood, and it gives you all the freedom to [add as many different plugins as you need](https://rematch.gitbooks.io/rematch/docs/reduxApi.html). You don't need to write an explicit store file which pulls together your enhancers, middleware, devtools and reducers.

`models.js`

```
export const todos = {
    state: {},
    reducers: {
        add(state, text) {
            return {
                ...state,
                [Date.now()]: { text }
            }
        },
        remove(state, id) {
            delete state[id]
            return {
                ...state
            }
        }
    }
}
```

The `models.js` file is central to the whole state management process, in relation to Redux, it holds: state, reducers, async actions and action creators. Being able to declare a single function which handles all of the above is really refreshing, you don't need to create separate files for reducers, actions and action types - instead you can declare your code models and let Rematch handle the rest. You also don't need to keep writing switch statements for controlling the flow of your action types, instead you just write nice clean functions.  

Hooking it up to containers:

`TodoContainer.js`

```
import React, { Component } from 'react';
import {connect} from 'react-redux';

class TodoContainer extends Component {

    state = {
        text: ""
    }

    handleChange = event => {
        this.setState({
            text: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.addTodo(this.state.text);
    }

    render() {        
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleChange}/>
                <button type="submit">Add Todo</button>
            </form>
        );
    }
}

export default connect(
    state => ({
        todos: state.todos
    }), 
    dispatch => ({
        addTodo: dispatch.todos.add,
        removeTodo: dispatch.todos.remove
    })
)(TodoContainer);
```

At first glance it's not too dissimilar from the standard Redux example. However, at a closer look, there are several differences; no need to import or use `bindActionCreators`, no explicit imports or usage of actions, everything is just handled and wired up for you by Rematch. There's less going on, less to worry about and more importantly, as your applications grow, less to keep a hold on and less complexity which could get out of hand. 

## Final Thoughts

Until you start using a new framework in anger, it can be difficult to give it a proper evaluation just by reading the docs (or indeed this blog post). However, if you are a fan of Redux, you don't use any state management framework currently and are looking at choosing one, or you just want to play around with an awesome framework, I'd highly encourage you to try Rematch out. I've only really been using it for small apps so far to see how it compares overall with Redux, and I feel I'm much more productive, writing less boilerplate and still getting solid apps as a result of using Rematch instead of plain Redux. On the other hand, there's still more I've got to learn about the framework; understanding the test support - in theory it should be as easy as testing Redux apps - is really important from both a testing perspective and developer experience. There's also the question of scalability, and how easy it is to handle the models as your application grows significantly, and whether [effects](https://rematch.gitbooks.io/rematch/docs/api.html#effects) - which use core JavaScript language features - are better than [thunks](https://github.com/reduxjs/redux-thunk#whats-a-thunk).

Furthermore, another question in my mind, which will be answered through more usage of Rematch, is its performance. [Redux's performance](https://redux.js.org/faq/performance) has been tweaked over time, and generally scales pretty well as the number of reducers and actions increase. However, when you start to write more and more [thunks](https://github.com/reduxjs/redux-thunk#whats-a-thunk), you increase the amount of library code being invoked to perform asynchronous actions. Rematch on the other hand, uses [effects](https://rematch.gitbooks.io/rematch/docs/api.html#effects) to handle async actions, which use the ES7 [async/await syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function#Description), which is just baked in JavaScript functionality, and has no reliance on another framework - which itself is a big positive. 

It's still early days, and I've not used Rematch enough to find any significant downsides to the framework as of yet. So far though, I really like the framework, and because it's just a nice, simple wrapper around Redux, you know it's got a solid base, and has been built on tried and tested foundations. 

