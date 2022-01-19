---
layout: post
title: "Using AWS CloudFront as a CDN for an S3 Static Site"
subtitle: "Implementing a CDN in order to effectively deliver static content in close proximity to readers"
category: Development
tags: [Development, Serverless, Cloud, AWS, CloudFront, CDN, S3, Website]
author: [cburns]
comments: true
draft: true
share: true
---

In my last post [Using AWS S3 and Hugo to Create and Host a Static Website](https://capgemini.github.io/development/Using-S3-and-Hugo-to-Create-Hosting-Static-Website/) we looked at creating a static site in AWS S3 using Hugo. As previously mentioned, there are some slight disadvantages with hosting a static site on S3, one of these being that it is all served insecurely from the London region in AWS. Therefore, if someone in Japan was to view my site, there is going to be a slightly longer delay in response times with regard to loading the page. In this blog post, we will look into resolving this issue using [AWS CloudFront](https://aws.amazon.com/cloudfront/), which is a content delivery network ([CDN](https://en.wikipedia.org/wiki/Content_delivery_network)) that effectively provides high availability and performance by distributing website content spatially relative to end users. 

## What is CloudFront?
In times where online content is viewed internationally and fast loading times are pretty much a necessity, the ability to serve your online content within seconds becomes a priority. This is echoed even more by [Google's research](https://think.storage.googleapis.com/docs/mobile-page-speed-new-industry-benchmarks.pdf) that states that 53% of users of a mobile site will actually leave if a page takes longer than three seconds to load. For companies that have servers in the UK and users in the US, if you have an image/video heavy home page, your user could easily be waiting a few seconds; which can actually deter them and send them away. This is where CDNs step in. AWS CloudFront is Amazon's CDN offering that is able to distribute and deliver content to users all over the world at fast times using its edge locations and regional edge caches. 

### Edge Locations & Regional Edge Caches
Without going into too much depth, it is important to understand what CloudFront’s edge locations and regional edge caches are and how they will fit into the bigger picture with regard to my site.

Regional edge caches are CloudFront locations deployed globally and are spatially relative and at close proximity to your viewers. They are located between the origin server and the POPs (points of presence), which are global edge locations that serve content directly to your viewers. In my case, S3 is the origin server but in general it is the location where the original source content is stored i.e. S3, EC2 etc.

In the context of my website, let’s go back to my Japanese readers. Wherever they are in Japan, when they make a request to my website, DNS routes their request to the nearest (nearest is best in terms of latency) POP that can deliver my website content to them. During this request the POP will check that it has the content cached, if so, it will deliver it to the user. In the case that the content is not cached then the POPs go to the nearest regional edge cache to fetch the content. 

Some POPs may not have certain content because as this content becomes less popular, it may be removed by individual POPs to make room for the more popular content. This is why POPs go to the regional edge caches; they have a larger cache than an individual POP so content remains in the cache longer. This helps keep more of your content closer to your viewers thus reducing the need for CloudFront to go back to your origin server; consequently, improving overall performance for viewers.

Back to our example, in the regional edge cache location, CloudFront again checks its cache for the requested content of my Japanese reader. If the content is in the cache, CloudFront forwards it to the POP that requested it and as soon as the first byte arrives from regional edge cache location to the POP, CloudFront begins to forward the content to my user. CloudFront also adds the content to the POP cache for the next time someone requests it in Japan (or any surrounding locations).

The great thing about regional edge caches and POPs is that all this is done under the hood of CloudFront, we do not have to configure this or manage it in any way.

Below is a picture of the current edge (POPs) and regional edge cache locations. As this picture constantly changes, [Amazon updates an AWS features page](https://aws.amazon.com/cloudfront/features/) to notify readers of any new locations.

![CloudFront edge and regional edge cache locations](/images/2020-04-07-Using-AWS-CloudFront-as-a-CDN/edge-locations.jpg)

## Using CloudFront with an S3 Site
In the previous blog post, I walked through the creation of my site, the uploading of it to S3 and the configuration of the static site hosting. Using the S3 endpoint URL I was able to get to the site and see it in all its basic glory. There was however, no CDN. So enough of the theory and throwbacks, let me walk you through how I created my site's CloudFront distribution.

To start, I created a CloudFront “Web Distribution” and specified the S3 Endpoint as the “Origin Domain Name” and made sure that in the “Viewer Protocol Policy”, I selected “Redirect HTTP to HTTPS” just to make it more secure and to force insecure requests to become secure. I left the caching refresh to the default number (86400 seconds = 24 hours).

![CloudFront config](/images/2020-04-07-Using-AWS-CloudFront-as-a-CDN/cloudfront-config.jpg)

An additional comment is that CloudFront by default automatically provides us with an SSL certificate which allows for HTTPS - which is used for secure communication between the client and server. One last point is that I made sure to add `index.html` as my “Default Root Object” as this is my homepage and it is the page that I want users to see when they visit the default root URL.

![CloudFront served website](/images/2020-04-07-Using-AWS-CloudFront-as-a-CDN/cloudfront-distribution.jpg)

Here is the SSL Certificate provided by CloudFront:

![CloudFront default provided SSL Certificate](/images/2020-04-07-Using-AWS-CloudFront-as-a-CDN/cloudfront-default-certificate.jpg)

## Closing Thoughts
There we have it, after some simple steps I am now using CloudFront in order to effectively and securely serve my website to those around the world. Furthermore, I have now reduced the load on the origin S3 bucket due to the advantages of using CloudFront edge location caching. Not to mention the additional benefit of speeding up response times for my users.

With each blog post there has been improvements made to my site making it more available and usable. I’m not implementing massive architectural changes, instead I’m leveraging Amazon’s more popular service offerings in order to deliver a more effective and accessible site. These improvements aren’t complicated and are easy for any junior engineer to follow. The most challenging aspect so far in this entire process has been the getting to know Hugo – which again was made more simpler with the use of a Hugo theme.

The only issue I have now is that although users can get to my site easily no matter the location, they have to use the CloudFront URL. Which doesn’t exactly flow off the tip of the tongue as much as a custom domain name. Realising this, the next step for me is to register my own domain and connect it up to my CloudFront distribution – which I will do in the next post. So, stay tuned.


