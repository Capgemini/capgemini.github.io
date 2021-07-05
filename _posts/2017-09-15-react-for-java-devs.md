---
layout: post
title: "Ways to Skin a Cat"
subtitle: "Redux and React from a Java developer's perspective"
description: "Tutorials and tips for learning React and Redux from scratch"
category: Frontend 
author: sasaunde
tags: [React, Redux, Development, JavaScript]
comments: true
share: true
---

I’m too old to be a front-end developer. Talk of [frameworks](https://hackernoon.com/5-best-javascript-frameworks-in-2017-7a63b3870282) and [js-library bingo](https://speakerdeck.com/petecampbell/javascript-bingo) makes me feel like a WWII veteran at a segway convention. But then I went to [Devoxx US](https://devoxx.us/) and heard Ben Ilegbodu’s talk, ‘[Navigating the React solar system](https://cfp.devoxx.us/2017/talk/LRN-3691/Navigating_the_React_Solar_System)’, and I thought — it sounds like this stuff is actually getting there. The front end world now looks and sounds much more like the Java world - the same patterns are being used, the same issues are being addressed in similar ways. So when there was a project floating around to migrate an Angular 1 application to a more up-to-date JavaScript framework (don’t ask me why…) I decided to take it on.
So, how do you learn React? First thing to know is that React is not a JavaScript framework in itself, so you will need a supporting structure for your application. 

## 1. Choose your Framework

Ben recommended Facebook’s [Flux](https://facebook.github.io/flux/) design pattern in his talk, so I decided to take a look at [Redux](http://redux.js.org), a “predictable state container” for JavaScript apps, which evolved the ideas of Flux but avoids its complexity. To get started, I followed [Wes Bos](http://wesbos.com/)’s enjoyable “[Learn Redux](https://learnredux.com/)” video tutorial series.
On video 1, I realised I was missing some fundamentals, and I’d need to learn [ES6](https://en.wikipedia.org/wiki/ECMAScript) first. Otherwise, when faced with a line of code like this:

`submit = values => return (<div>{ …items.slice(0,1), [values.id]: doSomething(state[values.id], values)}</div>)`

even a Java 9 programmer might become a little disorientated! 

## 0. Learn ES6

ES6 is short for ECMAScript version 6, sometimes known as Harmony. ECMAScript is a scripting-language specification created to standardise JavaScript across multiple independent implementations (other implementations including JScript and ActionScript but JavaScript being the best-known implementation). Browsers are not yet ES6 compatible, so currently you need to include a compile step (or “transpile step”, as these futuristic front-end developer beings like to call it) to translate to ES5 and get your application ready for use. I don’t think this is a big deal, though, as it gives you the opportunity to automate code quality checks using the transpiler and tools like JSLint.
I found [this post by Eric Elliott](https://medium.com/javascript-scene/a-functional-programmers-introduction-to-javascript-composing-software-d670d14ede30) just the right level I needed to get me up to scratch for Learn Redux.

## 2. Spend a while justifying your decisions

As soon as you mention you are using Redux, a ton of people will ask you [why](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367). For me, my application was a sort of wizard form which builds up a JSON object based on various decisions the user makes whilst navigating the form, so the implementation of state as a single plain object was incredibly useful. The state can also be easily part-populated at the start via a server call, which is exactly what I needed, and the “time travel” is very useful in testing and proving the app. I’d say that thanks to Redux the new app implementation is much more robust, and the [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension) plugin for the browser really helped development (although to be fair, the [React Dev Tools](https://github.com/facebook/react-devtools) was even more useful).

## 3. Learn Redux

The simple basis of React/Redux applications is that your data is in a store, and it is [immutable](https://en.wikipedia.org/wiki/Immutable_object). Actions on the website trigger reducers, and reducers return a new store state based on the action type. If, like me, you’re historically a Java developer who has been through the hell of multithreaded programming, you’ll understand the beauty of this. If state is immutable, you don’t need to worry about how multiple threads will change it — it doesn’t change. Phew! And the functional, event-driven design of the actions carrying out the updates is very neat. An action simply takes some parameters and fires an event of a given name, with the parameters contained in a JSON object. These events are then picked up by reducer functions, which update the state. The wiring is just a couple of lines of code - you define a mapStateToProps() function which says which pieces of state are updated by which reducers, then you define a mapDispatchToProps() method which links in all your action code to the dispatcher that will dispatch the actions, then you connect it all together by calling - yep, you guessed it, the connect() function. Lovely.


## 4. Get a template

So, you’ve learned something new, you’ve justified your decision, time to write an app! Of course there are plenty of ways to start — from scratch, by copying the Learn Redux code, or — my favourite — check for a template. That way, you should get a working application out of the box with all the necessary libraries for running and basic testing, plus build and deployment scripts via npm, and all you need do is apply your design to it. I found [this handy blank template](https://github.com/facebookincubator/create-react-app) for React Redux. Then I opened it. It bore ABSOLUTELY NO RESEMBLANCE to the code I’d seen in my training course.

## 5. Get stung by the speed of JavaScript library increments

React Router what? Four?? No nested routes? What’s a React Form? Why am I getting error messages that my components should extend React.Component? Argh.

## 6. Learn React Router 4

A quick google took me to this great video by the React Training people, and got me up to scratch with the newer routing concepts. Routing is completely separate from the app, so you can build your app first and add the navigation in later.
As I’m building a web app, and not (ie) a NodeJS native JavaScript app, I use react-router-dom library. In the tutorial I watched, it was necessary to create a browserHistory object and pass it to the router to store history, now there is a new BrowserRouter class which does that for you.
To link somewhere, use the Link class: `<Link to={'/url'}/>`. You can pass in parameters to the URL using `${param}` — for instance 

`<Link to={'/page/${page.id}'}/>`

Then, in your main app, wrap your components in a <Router> elements and then include <Route> elements which include the path and the component (or render method) that this route should generate if triggered. For example,

`<Route exact={true} path=”/” component={Home}/>`

When to use component and when to use render? Well, I found that if you want to pass propeties down to a component, you can’t do it by passing the properties to the Router element. So say I had a sub-component called Comments that needed access to the Comments action, I couldn’t do
`<Route path=”/comment” comment={this.props.comment} component={Comments}/>`
because this would make the comment parameter accessible to the Route only, and not the Comment component. So I had to create a method like this:

`const MyComment = props => {
return (<Comments comment={this.props.comment} {…props} /> );
}`

and then use render rather than component in the Router element

`<Router path=”/comment” render={MyComment}/>`

Then, from within my Comments component, I can call `this.props.comment(text)` to access the comment action.
There’s some more ES6 here — the spread operator (…) which means “put everything from this object in here” and is really handy for recreating state, and the lack of brackets around the props param — if there’s only one parameter to your function you don’t need to wrap it in brackets.

## 7. Design your Store

The first step in building a React app with Redux is to design the shape of your store. In my case, I was just building up one JSON object to send to a server, so I could simply lift and shift the existing JSON into the store structure. It can be hard to find somewhere to document this store shape, as the actions and reducers only usually provide part of the overall store shape, and unless you have an initial state from the server there might be nowhere to visualise the whole thing. The README.md might be a good place to paste in the whole JSON object, just for reference, but then of course you have to be sure to update it. A unit test might be a better place.
To actually define your store in your application code, you need to use the createStore() method in the redux library. This takes a combination of all your reducers (see below) as a parameter. You can use the redux method combineReducers() to link them all together.

`const store = createStore(combineReducers({reducer1, reducer2, …. });`

## 8. List out your actions

As mentioned, the Redux store is updated by a set of actions. So, once you have your store, you can create a method for each type of action that can update it, and specify the values that the action will need to pass to the reducer. For instance, adding a comment:

`export function addComment(postId, author, comment) {
      return {
         type: ‘ADD_COMMENT’,
         postId,
         author,
         comment
      }
}`

There’s some ES6 in here, if your object key is the same name as its value, you don’t need to write both. So

`{
postId
}`

is short for

`{
postId: postId
}`

Saves loads of typing whilst maintaining readability.
This is all you need for your action. You’ll have a reducer to act on each type, take the parameters and update the state.

## 9. Write your Reducers

Remember the reducer doesn’t alter state, it returns a new state. The reducer method takes the state object and the action (as returned by your action method) as parameters, and returns a new state object. So if your state was an array of comments, your comments reducer might look like this:

    function comments(state = [], action) {
    
      switch(action.type) {
    
        case ‘ADD_COMMENT’ :
    
           return […state, { author : action.author, text: action.comment}];

        default: return state;
    
      }
    
    }

Note we’ve added a default empty state here if none provided. It’s common to have an initial state, possibly loaded from a server, as a const variable and pass this in to your reducer, for instance:

`function whatever(state=initialState, action)`

## 10. Write the main component

Somewhere you’ll have some kind of main component which can do things like:
* Include the header and footers
* Include the Router (see React Router 4 above)

So, let's write this next. As mentioned, to create a component you can now write a class that extends React.Component and just provide the `render()` method to return your HTML and elements. So a very simple component would look like this:

    class Main extends React.Component {
    
      render() {
    
        return (<div>Hello World!</div>);
    
      }
    
    }
    export default Main;

For styling, I decided to use SCSS because I could then lift and shift the styles from the existing app. My build pipeline compiled the SCSS to CSS, so I could just include

`import ‘./Main.css’`

into my component to style the divs. In the component, you have to use `className=<class>` instead of the keyword class=<class>, as it’s like a property (`el.className`) and not the string-typed attribute `(el.setAttribute(‘class’))`. Same for the browser keyword for — in React you have to use htmlFor.

## 9a. Write some Unit Tests

Because we do TDD, right? Ahem. So, here are the tests we ALREADY WROTE. The good thing about React / Redux / React Forms / React Router is that a lot of the logic is tested for you. You only really need to test the specifics of your methods and components. 
The template I used had enzyme built in for the testing, and this appears to wrap Jasmine so the format was easy to understand, if you wanted the chai expect format you’d have to import that separately. I did need to add in some further libraries but more on that later.
For your actions, you really only want to test that you’ve passed in the right parameters to run the reducer, so you can create an expected action (e.g.

    const expectedAction = {
    
        type: ‘ADD_COMMENT’,
    
        postId,
    
        author,
    
        comment
    
    }
and then test

`expect(actions.specifyUser(postId, author, comment)).toEqual(expectedAction)`

For components, a simple test is whether it renders. You can use the ReactDom render method to test this:

    it(‘renders without crashing’), () => {
    
    
       const div= document.createElement(‘<div>’);
    
    
       ReactDOM.render(<Provider store={store}><Main/></Provider>, div);
    
    
    }
    
Note I’ve had to give a Provider here to pass the store to the context of the Main component, you can mock a store using redux-mock-store library’s configureStore() method.

## 11. Wire it all together

To wire up a React Redux app, you need two methods — mapStateToProps and mapDispatchToProps, and then call connect() on them. 

    const mapStateToProps = (state) => {
    
     return {
    
        comments: state.comments,
    
        posts: state.posts
        
     }
    
    }

    const mapDispatchToProps = (dispatch) => {
    
         return bindActionCreators(actions, dispatch);
     
    }

“actions” above are all the methods you wrote as actions — so for instance 

`import * as actions from ‘./myactiondirectory/myactionjsfile’;`

and bindActionCreators() is impoted from ‘redux’ and binds all the methods together. A well named method…
This will allow all your action methods to be visible in your component properties, and it will decide which pieces of state need to notify which reducers when they change. This means that your reducers need only fire and switch through a subset of your state — so in the above example, the posts reducer wouldn’t fire on a comment update.
Now we need to call connect.

`connect(mapStateToProps, mapDispatchToProps)(Main)`

You can see here I’ve called the function twice, once with our state and dispatch methods, and then once with the component we want to wrap (in this case, Main.js)
A standard logical breakdown is to put mapStateToProps, mapDispatchToProps and the connect method in a separate component file — for instance App.js. So we have:

    const App = connect(mapStateToProps, mapDispatchToProps)(Main);
    
    export default App;

Then, in your index file, you’d just call ReactDOM.render(<App />, document.getElementById(‘root’)) to begin the tree.
To pass properties and components down the Redux component chain is to wrap a component in a Provider element — I did this a root level.

`<Provider store={store}><App/></Provider>`

This allows the store to be visible to the Main component as a property on the context. But after that, you might want to be more selective about which bits you pass down by passing specific properties into the elements, e.g. in Main.js I could say:

    const postComments = this.props.comments[postId] || [];
    
    return (
    
       <Comments postComments={postComments}/>
    
    )

instead of having to wrap the <Comments> element in a provider.

## 12. Write form components

Next learning curve was [Redux Forms](https://github.com/erikras/redux-form) — very useful for adding data into the store from HTML form fields, also for validating form entries. I had a lot of “if this selected then display that” type form logic, and a lot of validation on the fields, so this seemed to make sense.
Redux Forms differs slightly from the React component classes I’d been writing, in that I had to provide a method with an object parameter which returned some HTML to render, and then create a form using the reduxForm() method like this:

    CommentsForm = reduxForm({
    
     form: ‘comments’
    
    })(CommentsForm)

where ‘comments’ defined the name of my rendered HTML form
Then, in the code to be rendered, I use the <Field> element to define my inputs. You can either use the default rendering:

`<Field name=”addAuthor” component=”input” type=”radio” value=”Yes”/>`

Or, you could specify your own render function to add labels etc:

`<Field className=”<cssClassName>” component={renderField} label=”Comment” hint=”Add your comment here” type=”text” validate={required}/>`

and then renderField is defined like this:

    const renderField({input, label, type, hint, className, meta: {touched, error, warning}) => {
    
    const btnClass = classNames({
    
    ‘form-group’ : true,
    
    ‘error’ : (touched && (error !== undefined))
    
    });
    
    return (<div className={className}>
    
    <label>
    
       <span className=”form-label-bold”>{label}</span>
    
       {hint && <span className=”form-hint”>{hint}</span>}
    
       {touched && (error && <span className=”error-message”>{error}</span>)}
       
    </label>
    
    <input className={className} {…input} type={type}/>
    
    </div>
    
    )}

Note the use of classNames() method from the JavaScript ‘classnames’ library to allow flexible multiple classes to be passed into an element. This way I can add the error class when needed. Also note the use of conditional rendering using {variable && <element>}. This way, for instance, the hint is only rendered if you provide one, and the error is only rendered if the form field has been incorrectly set. Cool, huh.

## 11a. More Testing

The final cool thing in the Redux Forms definition is the validate parameter, which takes a function to call to validate the field. A validator might look like this:

    const required = value =(value ? undefined : ‘Provide this field’)
    
    <Field validate={[required, isPhoneNumber]}/>

When it came to testing the validators, I’d initially defined them in my form component class, and was having a hell of a time trying to get a unit test to set the field with an incorrect value and check that the rendered HTML contained the error class on the span element, for example. After a while and a bit of research, I decided that I hadn’t written the logic of displaying the error on validation fail, so I shouldn’t be trying to test it. I should be just testing the required method itself. This gave me a bit of a headache as in order to access it I’d have to export it from the module, and exporting just for unit test purposes doesn’t sound right. In the end I moved all my validation methods to a different file, wrote individual tests for them like this:

    expect(required(‘1’)).toBeUndefined();
    
    expect(required(undefined)).toEqual(‘Provide this field’)

and then imported the validators into my form component. Feels much better!
