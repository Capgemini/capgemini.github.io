---
layout: post
title: "Keeping Drupal Secure"
category: Drupal
author: tom_phethean
date: 2014-10-31
tags: [Development, Drupal, Security]
comments: true
share: true
---

The recent announcement of Drupal [SA-CORE-2014-005](https://www.drupal.org/SA-CORE-2014-005)
caused a global scramble amongst Drupal site owners, developers and hosting
providers to patch their sites and protect themselves from the vulnerability.
Unfortunate site owners who weren't quick enough were left with a site audit to
ensure all traces of any successful attacks were removed from their environments.

Firstly, hats off to the Drupal Security Team, Core release co-ordinators and the
Drupal community in general for a rapid, considered and clear response to the
issue. The early warning that a security release was coming was well stated
enough to make it clear to many that it would be a major issue. The normal
release time was brought forward to a more suitable timeslot to ensure the
maximum audience saw it early, and the post-release guidance, [FAQs](https://www.drupal.org/node/2357241) and blog
posts covered all aspects from how to patch, [what to do if your site had been
hacked](https://github.com/greggles/cracking-drupal/blob/master/after-an-exploit.md),
and what to look out for to indicate if you had been affected. A follow up public
service announcement [PSA-2014-003](https://www.drupal.org/PSA-2014-003) was published
drawing further attention to the risks to unpatched sites and offering further
guidance.

Secondly, excellent work from [Sektion Eins](https://www.sektioneins.de/en/blog/14-10-15-drupal-sql-injection-vulnerability.html),
the penetration testing experts who detected the vulnerability. This was a defect
that has existed for many years, and many organisations will have run penetration
tests that haven't previously detected it. Having been creative enough to find
the vulnerability, it was then reported and managed responsibly, which should be
praised.

Now, I don't want to focus on SA-CORE-2014-005 any further, but instead I want to talk
about some ways we can protect our Drupal sites and minimise our exposure to
vulnerabilities. Whilst bugs will always happen (whether security or functional),
there are steps we can all take to mitigate our exposure and respond quickly to
incidents.

### Early warning systems

The best cure is prevention, and the next best is to catch it early. There are
lots of ways to keep up to date with what is going on in Drupal security:

* [The Drupal Security pages](https://www.drupal.org/security) contain the most
recent core, contrib and public service announcements for Drupal and include RSS
feeds
* Sign up for the Security Announcements mailing list (login to Drupal.org, go
  to your user profile page and subscribe to the "Security announcements" on the
  Edit » My newsletters tab)
* Follow [@drupalsecurity](https://twitter.com/#!/drupalsecurity) on Twitter

All three of these routes will ensure you're on the quickest possible route to
hearing about new security releases. It then becomes quick and easy to review the
latest threats, decide if you're vulnerable (by reviewing the mitigations - a lot
  of vulnerabilities depend on elevated roles or other mitigations, and these
  will be clearly described on each Security Advisory), and how quickly
  you ought to upgrade your core installation or other modules.

It's also worth having the Update module enabled in your dev environment to phone
home and check if there are updates for any of your modules available - however
if like me you only login to some sites occasionally then you'll want a backup
strategy for keeping you informed.

It should then become almost ritual that for each alert you:

* Determine if your core version is affected
* Determine if you use the contributed module reported as affected
* Reviewing any mitigations (vulnerability requiring elevated permissions etc)
that may keep you safe from the vulnerability and reduce the urgency of
patching/upgrading
* For any urgent updates, apply as soon as practically possible
* For any non-urgent updates, apply to normal dev/test/release cycle and deploy
in your next release slot

### Don't leave the back door open

The great thing about Drupal is the wide range of contributed modules that you
can use to kickstart your development and re-use functionality that other people
have already built for you. However, this comes with its own risks - as you're
effectively installing code that you've not written and so have no guarantees of
how secure it may be.

With this in mind, it's essential to review the modules you download, rather
than just installing them right-away. Just as we check if modules contain any
potential performance gotchas, we also look to see if there are any obvious
security flaws - use of $_GET or $_POST variables in templates, data directly
concatenated into SQL queries, no roles or permissions defined, all gives clues,
and we can use [Drupal secure coding guidelines](https://www.drupal.org/writing-secure-code),
and awareness of the [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project), to inform our reviews.

To some degree, these checks can be automated by running things like [Coder](https://www.drupal.org/project/coder), which includes some basic security
checks and has some good proposals to add more [security sniffs](https://www.drupal.org/node/1844870). Modules like [Security Review](https://www.drupal.org/project/security_review) can also check for some
easy-to-make mistakes which may render your site insecure - and are invaluable,
particularly if you're new to site security. However, automated checks are only
as good as the information they're fed with, so there is no substitute for
getting in and reading the code - you were going to look to see how it worked
anyway, right?

**Remember - if you do spot any security flaws in Drupal Core or Contrib, don't
raise issues in the public issue queues, make sure you follow the process to
[report a security issue](https://www.drupal.org/node/101494) to the security
team, so that it can be fixed in private and released before the vulnerability
is made public.**

### Constant vigilance

It's not just Drupal that can be exposed to vulnerabilities such as these,
[PHP itself has had its share over the years](http://www.cvedetails.com/product/128/PHP-PHP.html?vendor_id=74), and realistically
no large body of code is going to go its entire life without some vulnerabilities
creeping in. There are also many more people trying to find vulnerabilities to take
advantage of than there are people trying to fix them.

This means keeping your entire platform secure becomes a constant activity, so a reliable
and repeatable test and release cycle becomes essential - if pulling down the
latest updates and deploying them takes a significant amount of time, the odds
are that you'll get lazy and skip an udpate or two. This soon becomes the security
guys nightmare as sites, services and platforms become more out of date and more
vulnerable to attack.

### Watch the watchman

All the attention paid to Core and Contrib security updates is very valuable, but
it becomes worthless if you don't give the same care to the code you and your team
write in custom modules. An awareness of how to follow Drupal best practices to
write secure code is an essential part of the training and education of any good
Drupal developer. Fortunately Drupal provides some excellent abstraction layers to
remove some of the thinking on these topics, so make sure you [use the database
layer correctly](https://www.drupal.org/node/101496), [handle text securely](https://www.drupal.org/node/28984), and [create forms in a safe way](https://www.drupal.org/node/178896),
as well as all the other [best practice](https://www.drupal.org/writing-secure-code).

It's also well worth commissioning penetration tests from external specialists to
test your implementation and validate that it is secure. We use the expertise of
these companies regularly, and rotate through a list of preferred companies to
ensure that we're constantly getting fresh eyes on the solutions, and varied
approaches to testing, so as to maximise the chances of finding issues. The tests
often prove their worth, and whilst every developer hates having defects raised,
we'd all much rather the security issue be in a test environment than in production!

### Reading list

To finish, here are some excellent resources to keep up to date with best practice
approaches to keeping your Drupal installation secure:

* [Securing your Site](https://www.drupal.org/security/secure-configuration) - Drupal.org
Handbook entries providing security configuration advice
* [Writing Secure Code](https://www.drupal.org/writing-secure-code) - Drupal.org
Hanbook entries providing guidance on keeping your custom code secure
* [Cracking Drupal: A Drop in the Bucket](http://crackingdrupal.com/) - written by Greg Knaddison ([greggles](https://www.drupal.org/user/36762)), first published in 2009 but still very relevant
* [OWASP Top 10](https://www.owasp.org/index.php/Category:OWASP_Top_Ten_Project) -
A list of the 10 Most Critical Web Application Security Risks
