---
layout: post
title: "Automated testing for POODLE"
description: "How to use spec tests for security testing"
category: "Open source"
author: mike_wallis
date: 2014-10-10
tags: [Testing, DevOps, Infrastructure, Security]
comments: true
share: true
---

Why should systems and infrastructure not be treated in the same way as other
software components, especially when it comes to implementing security concerns.
With today's POODLE [announcement][1] of another SSL vulnerability it makes sense to
add infrastructure tests to your regression tests

[ServerSpec][2] is a solid way of testing for this, and can be done as follows:

{% highlight bash %}
describe command 'openssl s_client -connect localhost:443 -ssl3 < /dev/null' do
    its(:exit_status) { should eq 1 }
    its(:stdout) { should match /no peer certificate available/ }
end
{% endhighlight %}

Use of the `< /dev/null` is to force the openssl client to terminate instead of
waiting for input from the shell as we are only interested in the key exchange.

[1]: http://googleonlinesecurity.blogspot.co.uk/2014/10/this-poodle-bites-exploiting-ssl-30.html
[2]: http://serverspec.org
