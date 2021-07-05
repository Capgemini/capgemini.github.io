---
layout: post
title: "Why you should try React higher-order components now"
description: "A look at the advantages and some examples of using higher order components"
category: Frontend 
author: phil_hardwick
tags: [React, HOCs]
comments: true
share: true
---

I am in my final year at university: part of the [Capgemini Degree Apprenticeship](https://more.capgemini.com/uk/careers/your-career-path/apprentices/). This year requires a large software project to be delivered and one component of that is a [React](https://reactjs.org/) frontend. Through it I've been experimenting and discovered a love for [higher-order components](https://reactjs.org/docs/higher-order-components.html) (HOCs). I believe one of the reasons I've been able to, in the later stages of the project, churn out screens quickly as it comes closer to the deadline is the use of HOCs.

## What is a HOC?
A higher-order component is simply a function which takes a component as a parameter and returns another component.

    (component) => component
    
An example is helpful here. Consider this HOC which takes a component to render if the data has been loaded. If the data is still loading it renders the loading spinner:

    const withLoader = (WrappedComponent) => {
      class DataFetcherLoadingWrapper extends React.Component {
        render() {
          const { data: { loading } } = this.props;
    
          if (loading) {
            return <Loading />;
          }
          return <WrappedComponent {...this.props}/>
        }
      }
    
      return DataFetcherLoadingWrapper
    };
    
    export default withLoader;
    
Now, I can simply use this whenever I have a container which loads data, composing it with an "Data Fetcher" HOC (which fetches the data and defines whether it's still loading) and applies it to a `PresentationalComponent` which just displays the props passed to it by the HOCs:

    export default compose(
      dataFetcher(query),
      withLoader
    )(PresentationalComponent);
     
Happy days. No more checking if the query is still loading and returning the loading spinner in every container that fetches data.

## What does it give me?
I believe understanding this really speeds up development, by giving quick access to common things you do in your components.

Once I fully moved to using HOCs I was able to remove React and JSX from my [container components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0). In the below example I have an Auth Service which provides a getProfile method to get the profile of the logged in user. If profile is populated it returns some JSX with the profile in its props. When refactored to use a custom `withUserProfile` HOC the class below:

    class ProfileContainer extends Component {
      state = {}
    
      componentDidMount() {
        const { getProfile } = this.props.auth;
        getProfile()
          .then((profile) => this.setState({ profile }))
          .catch((err) => {
            console.error(err)
          });
      }
    
      render() {
        const { profile } = this.state;
    
        if (!profile) {
          return <Loading />;
        }
        return (
          <Profile profile={profile}/>
        );
      }
    }
    
    export default ProfileContainer
    
Can become:

    export default compose(
      withUserProfile(),
      mapProps((props) => ({
        profile: props.userProfile
      }))
    )(Profile);
    
Subsequently, any component which also needs a user profile (which is a lot of them), can also benefit from having the `userProfile` prop automatically filled with user data. I think this provides great separation. JSX is only used for the presentational components which is what it's intended for. Data fetching, mapping and injecting is done in Container components solely with the use of composition and higher-order components. I can then also use `withProps` or `mapProps` to keep the interface between the container component and presentational component free of framework details e.g. I can map from props.data.deliveries (which is where Apollo GraphQL puts the fetched data) to props.deliveries and the presentational component is none the wiser where it received its data from.

In the above example you may also want to re-render on user logout or timeout and so the HOC can subscribe to updates from the Auth Service and that subscription code can be written once, as opposed to in every container component that required a user profile.

## Using Recompose
The last code snippet uses a HOC `mapProps` from a library called [Recompose](https://github.com/acdlite/recompose/). I've found these small HOCs very helpful. They do one, small thing well and describe my intentions better than using JSX e.g. `<Profile profile={userProfile}/>` is better described by `mapProps((props) => ({profile: props.userProfile}))`. They also provide extra benefits e.g. if you use `withHandlers` you can be sure a new function will not be created on each render. This is instead of using arrow functions in JSX, which would create a new function every time. Take a read of the [Recompose docs](https://github.com/acdlite/recompose/blob/master/docs/API.md) and try using it, even if you don't like it in the end it will expand your mind as to what's possible with HOCs.

## Composability done properly
I've always been told to "prefer composition over inheritance", and I usually listen to this old adage. Typically my classes end up having a constructor parameter which is an object which fulfills some interface which I invoke in one of the class methods later:

    class repo {
      constructor(transformer) {
        this.transformer = transformer
      }
      
      create(resource) {
        const transformedResource = transformer.transform(resource);
        return fetch('/', {
          method: 'POST',
          body: JSON.stringify(transformedResource)
        })
      }
    }

HOCs however, are a new form of composability for me. Any number of HOCs can be composed together. This is not limited to the constructor parameters you define in your class (or however you inject your composed functionality). The composed functionality does not have to conform to a particular interface, i.e. have particular methods, because it's not called by the class or component being enhanced. The best bit is that the component does not know it had been enhanced with a HOC: the above class, in contrast, is obviously composed with a `transformer`.
    
I've always thought this sort of composability should be available to replace programming which relies heavily on inheritance such as Java Android. With the advent of [Kotlin as a first class Android language](https://developer.android.com/kotlin/index.html), hopefully this will become the case.

## Not a HOC, but Useful
In my project I also needed to do authorisation. So, if a user had a particular role they could see and navigate to some parts of the UI but not others. I researched how others have done it and found [an article which used a HOC](https://hackernoon.com/role-based-authorization-in-react-c70bb7641db4) to do this. I initially tried this way, thought the use of currying was good but that it could be made better. The pattern I used isn't strictly a HOC: it uses the fact that any children of the component specified in JSX are put in props.children and it "enhances" those child components by conditionally rendering them based on the user's role. I thought was worth showing to add to the mix of ways to do authorisation:

    export default (allowedRoles, auth) => {
      return class AuthorizationWrapper extends React.Component {
    
        state = {};
    
        componentDidMount() {
          if (auth.isAuthenticated()) {
            retrieveRoleAndSetInState();
          }
          auth.registerAsObserver(this)
        }
        
        retrieveRoleAndSetInState = () => {
          auth.getRole().then(role => {
            this.setState({role});
          })
        }
    
        onAuthenticated = () => {
          retrieveRoleAndSetInState();
        };
    
        onLogout = () => {
          this.setState({role: null});
        };
    
        onRoleUpdated = (role) => {
          this.setState({role: role});
        };
    
        render() {
          if (this.state.role && allowedRoles.includes(this.state.role.toLowerCase())) {
            return this.props.children
          }
          return null
        }
      }
    };
    
Which is then used like this:
    
    import OnlyAllowedIf from '../containers/Authorised/wrapper'
    export const OnlyAllowedIfBuyer = OnlyAllowedIf(['buyer'], auth);

    <OnlyAllowedIfBuyer>
      <LinkContainer to="/stocks">
        <NavItem eventKey={5}>
          Stock Levels
        </NavItem>
      </LinkContainer>
    </OnlyAllowedIfBuyer>

Take this as an example of how to take advantage of the spirit of HOCs but not necessarily follow the definition to the letter. Using the method above resulted in less code and seemed more usable to me. It goes to show that the myriad of ways you can do conditional rendering demonstrates how React embraces functional paradigms and really allows the developer to be expressive in their own way.

## Conclusion
This post doesn't go into the details of HOCs but it should be an encouragement to explore them further if you haven't: here's [a good starting place](https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e). Use them to separate concerns between presentational and container components, create framework agnostic interfaces and abstract out routines you find yourself writing a lot e.g. loading, validation or error checking.
