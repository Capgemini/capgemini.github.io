---
layout: post
title: "Combining OAuth and JWT to gain performance improvements"
description: "An approach to combining OAuth and JWT to gain performance improvements"
author: tosin_ogunrinde
category: Architecture
tags: [REST, Token, OAuth, JWT, Authentication, Authorisation, Architecture]
comments: true
share: true
---

For many years Simple Object Access Protocol (SOAP) was the standard approach for communicating with remote services, often via HTTP. The landscape has changed significantly in recent years with the increase in the adoption of Representational State Transfer (REST) APIs. There are still a number of use cases that suit SOAP, for example where stateful operations are required.

One of the six guiding architectural principles of REST is statelessness. Every API request from the client to a server must contain all the necessary information necessary to serve the request. The server maintains neither state nor context.
How do we then authorise access to protected REST APIs? Say hello to [OAuth](https://tools.ietf.org/html/rfc6749) and [JSON Web Token (JWT)](https://tools.ietf.org/html/rfc7519). OAuth and JWT are two of the most widely used token frameworks or standards for authorising access to REST APIs. In this blog post I consider how both OAuth and JWT can be combined to gain performance improvements.

OAuth enables an application to obtain limited access to an HTTP service. While JWT is a compact, URL-safe means of representing claims to be transferred between two parties. OAuth has a number of grant types. So whenever I refer to OAuth in this blog post, I am referring to the [OAuth 2.0 Resource Owner Password Credentials Grant type](https://tools.ietf.org/html/rfc6749#page-37). 
A user is required to authenticate or login to obtain a token. A typical authentication flow is shown in the sequence diagram below.
 
![Authentication flow](/images/2018-07-13-combining-oauth-and-jwt-to-gain-performance-improvements/authentication-flow.jpg){: .centered.medium-8}

A user will enter their username and password via a client (which could be a mobile device or PC), and at the end of the authentication process the user will be supplied with a token. The client will then include the token with every subsequent API request to a resource server (like the User server). 
To compare what the authorisation flow for both OAuth and JWT will look like, let's consider an example where we make an API request to *GET the authenticated user*. 

The OAuth flow to *GET the authenticated user whose ID is 123* will typically look like the sequence diagram below.

![Get user OAuth flow](/images/2018-07-13-combining-oauth-and-jwt-to-gain-performance-improvements/get-user-oauth-flow.jpg){: .centered}

While, the JWT flow to *GET the authenticated user whose ID is 123* will typically look like the sequence diagram below.

![Get user JWT flow](/images/2018-07-13-combining-oauth-and-jwt-to-gain-performance-improvements/get-user-jwt-flow.jpg){: .centered.medium-8}

The JWT implementation is less chatty and more performant compared to OAuth. This is because JWT enables a resource server to verify the token locally. In its compact form, JWT consist of three parts: the header, payload and signature. 
The signature is the result of signing the base64Url encoded header and the base64Url encoded payload with a key. The resource server uses the signature to verify that the token has not been tampered with.

The JWT payload contains the claims. The claims are statements about an entity (typically, the user excluding private information of course) and additional metadata like the expiry time. JWT however has a drawback in that once it has been issued it will allow its holder to gain access to a resource server until the expiry time is lapsed. It looks like we need a way to revoke JWTs. So let's go back to OAuth.

OAuth is chattier compared to JWT. This is because OAuth requires the Auth server to verify the validity of the token and the Auth server in turn relies on the information it has stored in a database to make this judgement. OAuth however does have an advantage over JWT in that tokens can be easily revoked. This is particularly a good feature if instant access revocation is desired. The basic OAuth token response is shown below.

{% highlight json %}
{
    "access_token": "foo",
    "token_type": "example",
    "expires_in": 3600,
    "refresh_token": "bar"
}
{% endhighlight %}

The relevant attributes are described in the table below.

Attribute         | Description         
------------------|-----------------------------------------------------------------------------------------------------------------
access_token      | The short-lived token that is typically valid for about an hour.                                       
expires_in        | The lifetime of the access token in seconds.                                                           
refresh_token     | The long-lived token which are used to obtain new access tokens. Typically valid for a number of days or months. 


As shown in the example OAuth flow above, the client will include the access token in every API request to a resource server. The client will then make use of the refresh token to obtain a new access token. How can we benefit from the inherent performance advantages associated with JWT and the limited access capability provided by OAuth? By issuing an OAuth token with JWT in both access token and refresh tokens as depicted below.

{% highlight json %}
{
    "access_token": "aShortLivedJWT",
    "token_type": "example",
    "expires_in": 3600,
    "refresh_token": "aLongLivedJWT"
}
{% endhighlight %}


The client will include the short-lived JWT for every call to the resource server, and will make use of the long-lived JWT to obtain a new access token. The short-lived JWT is validated locally. We do however need to keep a record or blacklist of the revoked refresh tokens till they expire. This blacklist will be checked only when the client wishes to refresh the OAuth token. A new access token will not be granted if the refresh token is found in the blacklist. 
The blacklist should ideally contain refresh tokens associated with users who have logged out and users whose account have been disabled. Although the access token is not immediately revoked, it is meant to be a short-lived token. 

Finally, there may be scenarios where this behaviour is not desired but ultimately, it depends on the requirements of the system. This approach enables the resource server to validate the OAuth access token locally and only requires interaction with the Auth server when we need to get a new OAuth access token. It is this reduction in the interaction with the Auth server that gives us the performance improvements.