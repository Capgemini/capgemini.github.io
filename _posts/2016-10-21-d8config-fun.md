---
layout: post
title: "Fun with Drupal 8 configuration management"
category: Drupal
author: richard_sheppard
tags: [Drupal, Automation, Vagrant, Tutorial]
comments: true
share: true
description: "Drupal's CMI was a big step forward, but don't assume the simple point and click interface will solve anything but the most simple of workflows."
---
It has been a few years since I have had the opportunity to build a website from the absolute beginning. The most recent project I'm on continues in that vein, but it's early enough for me to consider ripping it apart and starting all over again. The project is particularly interesting to me, as it's my first opportunity to use Drupal 8 in earnest. As I've got an interest in [automating as much as possible][automate], I want to gain a better understanding of the configuration management features which have been introduced in Drupal 8.

Tearing it apart and starting again wasn't the first thing considered. Being an arrogant Drupal dev, I figured I could simply poke around the GUI and rely on some things I'd seen at Drupalcon and Drupal camps in the past couple of years to see me through. I thought I would find it easy to build a replicated environment so that any new developer could come along, do a `git clone`, `vagrant up`, review a README.md file and/or wiki page and they'd be off and running.

Wrong.

This post outlines many of the things that I examined in the process of learning Drupal 8 while adopting a bit of humility. I've created a [sample project][d8config-vm] with names changed to protect the innocent. Any comments are welcome.

The structure of the rest of this post is as follows:

* Table of contents
{:toc}

----

## Setting up and orientation with Drupal VM

I am a big fan of Jeff Geerling's [Drupal VM][drupal-vm] vagrant project, so I created a fork of it, and imaginatively called it [D8config VM][d8config-vm]. We will be building a Drupal site with the standard profile which we'll use to rapidly build a basic prototype using the Drupal GUI - no coding chops necessary. The only contributed module added and enabled is the [Devel module][devel] at the start, but we will change that quickly.

Here are the prerequisites if you do follow along:

* familiarity with the command line;
* familiarity with [Vagrant][vagrant] and that it's installed on your machine (__note__: the tutorial requires Vagrant 1.8.1+);
* as well as Vagrant 1.8.1+, you need to have Ansible 2.0.1+ and VirtualBox 5.0.20+ installed;
* have installed the [Vagrant Auto-network plugin][vagrant-auto_network] with `vagrant plugin install vagrant-auto_network`. This will help prevent collisions with other virtual networks that may exist on your computer;
* have installed the [Vagrant::Hostsupdater][vagrant-hostsupdater] plugin with `vagrant plugin install vagrant-hostsupdater`, which will manage the host's `/etc/hosts` file by adding and removing hostname entries for you;
* familiarity with git and [GitHub][github];
* if using Windows, you are comfortable with troubleshooting any issues you might come across, as it's only been tested on a Mac;
* familiarity with [Drush][drush].

Here is how the D8config VM differs from Drupal VM:

* the `config.yml` and `drupal.make.yml` files have been committed, unlike the normal Drupal VM repo;
* the hostname and machine name have been changed to `d8config.dev` and `d8config` respectively;
* to take advantage of the auto-network plugin, `vagrant_ip` is set to 0.0.0.0. The d8config machine will then have an IP address from 10.20.1.2 to 10.20.1.254;
* the first synced folder is configured with a relative reference to the Vagrant file itself:

```yaml 
# The first synced folder will be used for the default Drupal installation, if
# build_makefile: is 'true'.
- local_path: ../d8config-site         # Changed from ~/Sites/drupalvm
  destination: /var/www/d8config-site  # Changed from /var/www/drupalvm
  type: nfs
  create: true
```

I'll do the same with subsequent shared folders as we progress - it's a useful way to keep the different repos together in one directory. At the end of the tutorial, you'll have something like:

```bash 
└── projects
    ├── another_project
    ├── d8config
    │   ├── d8config_profile
    │   ├── d8config-site
    │   └── d8config-vm
    ├── my_project
    └── top_secret_project
```

[top][md-toc]

### New _nice-to-haves_ (thanks to recent changes in [Drupal VM][drupal-vm_tag_3])
{:.no_toc}

If you have used Drupal VM before but haven't upgraded in a while, there are a load of new features. Here are just two to note:

* Ansible roles are now installed locally (in `./provisioning/roles`) during the first `vagrant up`;
* PHP 7 is now an option to be installed. In fact, it's installed by default. You can select 5.6 if you like by changing `php_version` in the `config.yml` file (see [PHP 5.6 on Drupal VM][php-56]).

### Now do this
{:.no_toc}

Create a directory where you're going to keep all of the project assets.

```bash 
$ mkdir d8config

# Change to that directory in your terminal:
$ cd d8config
```

Clone the [D8config VM repo][d8config-vm]. Or, feel free to fork [D8config VM][d8config-vm] and clone _your version_ of the repo.

```bash 
$ git clone https://github.com/siliconmeadow/d8config-vm.git

# Change to the `d8config-vm` directory:
$ cd d8config-vm

# Checkout the `CG01` branch of the repo:
$ git checkout CG01

# Bring the vagrant machine up and wait for the provisioning to complete.
$ vagrant up
```

After successful provisioning you should be able to point your browser at [http://d8config.dev](http://d8config.dev){: rel="nofollow"} and see your barebones Drupal 8 site. Username: `admin`; Password: `admin`.

### Caveats
{:.no_toc}

If you've used Drupal VM before, you will want to examine the changes in the latest version. From [Drupal VM tag 3.0.0][drupal-vm_tag_3] onwards, the requirements have changed:

* Vagrant 1.8.1+
* Ansible 2.0.1+
* VirtualBox 5.0.20+

One sure sign that you'll need to upgrade is if you see this message when doing a `vagrant up`:

```
ansible provisioner: * The following settings shouldn't exist: galaxy_role_file
```

[top][md-toc]

----

## Build your prototype

In this section of the tutorial we're going to start building our prototype. The brief is:

> The site is a portfolio site for a large multinational corporation's internal use. But hopefully the content architecture is simple enough to keep in your head. The following node types need to be set up: _Case study_, _Client_, _Team member_ (the subject matter expert), and _Technologies_ used. Set up a vocabulary called _Country_ for countries served and a second to called _Sector_ classify the information which will contain tags such as _Government_, _Music industry_, _Manufacturing_, _Professional services_, etc. Delete the existing default content types. You can then delete fields you know you won't need to avoid confusion - _Comments_ for example - which will then allow you to uninstall the comment module. And, as you might deduce by the modules I've selected, it's to be a multilingual site.

Hopefully this should feel comfortable enough for you, if you are familiar with Drupal site building. There are enough specifics for clarity, yet it's not too prescriptive that you feel someone is telling you how to do your job. Whereas in one context, you may hear a manager say _"don't bring me problems, bring me solutions"_, most engineers would rather say for themselves _"don't bring me solutions, bring me problems"_. I hope this brief does the latter.

Have a go at making the changes to your vanilla Drupal 8 site based on the brief.

### Beyond the brief
{:.no_toc}

Every 'site building' exercise with Drupal is a move further away from the configuration provided by the standard or minimal profiles. In our circumstance, we will enable these modules via the GUI:

* Responsive Image
* Syslog
* Testing
* BigPipe
* Devel Generate (Devel was installed due to settings in `config.yml` in the d8config-vm repo)
* Devel Kint
* Devel Node Access
* Web Profiler
* Configuration Translation
* Content Translation
* Interface Translation
* Language

I've also added a couple of contributed themes via Drush so the site will no longer look like the default site.

```bash 
# While in your d8config-vm directory:
$ vagrant ssh

# Switch to your Drupal installation:
$ cd /var/www/d8config-site/drupal

# Download and install two themes:
$ drush en integrity adminimal_theme -y
```

For more details on these themes, see [the Integrity theme][integrity] and [the Adminimal theme][adminimal_theme]. As you might expect, I set Integrity as the default theme, and Adminimal as the admin theme via the GUI.

After switching themes, two blocks appeared in the wrong regions. I went to the [Block layout][block_layout]{: rel="nofollow"} page and moved the Footer menu block from the _main menu_ region to the _footer first_ region and the Powered by Drupal block from the _Main menu_ to the _Sub footer_ block.

Due to the multilingual implication, I went to the [Languages admin][languages_admin]{: rel="nofollow"} page and added French.

[top][md-toc]

----

## Replicate and automate

At this stage you've made quite a lot of changes to a vanilla Drupal site. There are many reasons you should consider automating the building of this site - to save time when bringing other members into the development process, for creating QA, UAT, pre-prod and production environments, etc. We will now start to examine ways of doing just this.

### _drush make_ your life easier
{:.no_toc}

In this section we're going to create a Drush makefile to get the versions of Drupal core, contrib modules and themes we need to build this site as it currently is. This file will be the first file added to the [D8config profile][d8config_profile] repo. Makefiles are not a required part of a profile, and could reside in a repo of their own. However to keep administration down to a minimum, I've found that this is a useful way to simplify some of the asset management for site building.

Let's first tweak the `config.yml` in the D8config VM repo, so that we have synced folder for the profile. To do so, either:

1. `git checkout CG02` in the d8config-vm directory (where I've already made the changes for you), or;
2. Add the following to the `config.yml` in the `vagrant_synced_folders` section:

```yaml 
# This is so the profile repo can be manipulated on the guest or host.
- local_path: ../d8config_profile
  destination: /build/d8config/d8config_profile
  type: nfs
  create: true
```

After doing either of the above, do a `vagrant reload` which will both create the directory on the Vagrant host, and mount it from the d8config-vm guest.

Next, let's generate a basic makefile from the site as it now is.

```bash 
# From within the d8config vm:
$ cd /var/www/d8config-site/drupal
$ drush generate-makefile /build/d8config/d8config_profile/d8config.make
```

This makefile is now available in the `d8config_profile` directory which is at the same level as your `d8config-vm` directory when viewing on your host machine.

Because we only have Drupal core, two contrib themes and the Devel module, it's a very simple file and it doesn't need any tweaking at this stage. I've committed it to the [D8config profile][d8config_profile] repo and tagged it as `CG01`.

### Raising our profile
{:.no_toc}

Since we've established that the makefile is doing very little on this site, we need to look at completing the rest of the profile which will apply the configuration changes when building the site. The [How to Write a Drupal 8 Installation Profile][d8profile-howto] is quite clear and we'll use that page to guide us.

First, our machine name has already been chosen, as I've called the repo `d8config_profile`.

Rather than writing the `d8config_profile.info.yml` file from scratch, let's duplicate `standard.info.yml` from the standard profile in Drupal core, as that's what we used to build the vanilla site to begin with. We can then modify it to reflect what we've done since.

```bash 
# From within the /build/d8config/d8config_profile directory in the vagrant machine:
$ cp /var/www/d8config-site/drupal/core/profiles/standard/standard.info.yml .

$ mv standard.info.yml d8config_profile.info.yml
```

The first five lines of the `d8config_profile.info.yml` need to look like this:

```yaml 
name: D8config
type: profile
description: 'For a Capgemini Engineering Blog tutorial.'
core: 8.x
dependencies:
```

At the end of the file it looks like this, which shows the required core modules and adding the modules and themes we've downloaded:

```yaml 
- automated_cron
- responsive_image
- syslog
- simpletest
- big_pipe
- migrate
- migrate_drupal
- migrate_drupal_ui
- devel
- devel_generate
- kint
- devel_node_access
- webprofiler
- config_translation
- content_translation
- locale
- language
themes:
- bartik
- seven
- integrity
- adminimal_theme
```

Also, don't forget, we uninstalled the comment module, so I've also removed that from the dependencies.

#### You still need moar!
{:.no_toc}

The profile specifies the modules to be enabled, but not how they're to be configured. Also, what about the new content types we've added? And the taxonomies? With previous versions, we relied on the [features][features_module] module, and perhaps [strongarm][strongarm_module] to manage these tasks. But now, we're finally getting to the subject of the tutorial - Drupal 8 has a [configuration system out of the box][d8config_docs].

This is available via the GUI, as well as Drush. Either method allows you to export and import the configuration settings for the whole of your site. **And** if you look further down the [profile how-to page][d8profile-howto], you will see that we can include configuration with installation profiles.

Let's export our configuration using Drush. This is will be far more efficient than exporting via the GUI, which downloads a `*.tar.gz` file, which we'd need to extract a copy or move to the `config/install` directory of the profile.

While logged into the vagrant machine and inside the site's root directory:

```bash 
# Create the config/install directory first:
$ mkdir -p /build/d8config/d8config_profile/config/install

# Export!
$ drush config-export --destination="/build/d8config/d8config_profile/config/install"
```

When I exported my configuration, there were ~215 files created. Try `ls -1 | wc -l` in the config/install directory to check for yourself.

[top][md-toc]

----

## The reason we're gathered here today (a brief intermission)...

I hope you are finding this tutorial useful - and also sensible. When I started writing this blog post, I hadn't realised it would cover quite so much ground. The key thing I thought I would be covering was Drupal 8's configuration management. It was something I was very excited about, and I still am. To demonstrate some of the _fun_ I've had with it is still the central point of this blog. All of the previous steps to get to this point were fun too, don't get me wrong. From my point of view, there were no surprises.

### _Spoiler alert_
{:.no_toc}

Configuration management, on the other hand - this is true drama. Taking an existing shared development site and recreating it locally using Drush make and a basic profile (without the included `config/install` directory) is just a trivial soap opera. If you want real fun, visit the configuration-syncing aspect, armed only with knowledge of prior versions of Drupal and don't [RTFM][d8config_docs].

### Do [RTFM][d8config_docs]
{:.no_toc}

No, really. Do it.

### The secret sauce in this recipe is...
{:.no_toc}

After doing the export of the configuration in the previous section, I finally started running into the problems that I faced during my real world project - the project mentioned at the beginning of this post. Importing the configuration repeatedly and consistently failed with quite noisy and complex stack trace errors which were difficult to make sense of. Did I mention that perhaps I should have [read the manual][d8config_docs]?

We need to do two things to make the configuration files usable in this tutorial before committing:

```bash 
# Within the d8config_profile/config/install directory:
$ rm core.extension.yml update.settings.yml
$ find ./ -type f -exec sed -i '/^uuid: /d' {} \;
```

The removal of those two files was found to be required thanks to reading [this][d8profile-howto-conf] and [this][stack-ex-file-del]. At this stage, I can confirm these were the only two files necessary for removal, and perhaps as Drupal 8's configuration management becomes more sophisticated, this will not be necessary. The second command will recursively remove the lines with the uuid key/value pairs in all files.

[top][md-toc]

----

## Packaging it all up and running with it.

We've done all the preparation, and now need to make some small tweaks and commit them so our colleagues can start where we've left off. To do so we need to:

1. add the profile to the makefile;
2. commit our changes to the d8config_profile repo;
3. tweak the `config.yml` file in the d8config-vm repo, to use _our_ makefile and profile during provisioning.

To have the profile be installed by the makefile, add this to the bottom of `d8config.make` (in the [D8config profile][d8config_profile]):

```yaml 
d8config_profile:
  type: profile
  download:
    type: git
    url: git@github.com:siliconmeadow/d8config_profile.git
    working-copy: true
```

I've committed the changes to the [D8Config profile][d8config_profile]{: rel="nofollow"} and tagged it as `CG02`.

Then the last change to make before testing our solution is to tweak the `config.yml` in the [D8config VM][d8config-vm] repo. Three lines need changing:

```yaml 
# Change the drush_makefile_path:
drush_makefile_path: "/build/d8config/d8config_profile/d8config.make"

# Change the drupal_install_profile:
drupal_install_profile: d8config_profile

# Remove devel from the drupal_enable_modules array:
drupal_enable_modules: []
```

As you can see, the changes to the vagrant project are all about the profile.

With both the [D8Config VM][d8config-vm] and the [D8Config profile][d8config_profile] in adjacent folders, and confident that this is _all going to work_, from the host do:

```bash 
# From the d8config-vm directory
$ vagrant destroy
# Type 'y' when prompted.

# Go!
$ vagrant up
```

Once the provisioning is complete, you should be able to check that the site is functioning at [http://d8config.dev](http://d8config.dev). Once there, check the presence of the custom content types, taxonomy, expected themes, placement of blocks, etc.

[top][md-toc]

----

## Summary and conclusion

The steps we've taken in this tutorial have given us an opportunity to look at the latest version of [Drupal VM][drupal-vm], build a _quick-and-dirty_ prototype in Drupal 8 and make a profile which our colleagues can use to collaborate with us. I've pointed out some _gotchas_ and in particular some things you will want to consider regarding exporting and importing Drupal 8 configuration settings.

There are more questions raised as well. For example, why not simply keep the `d8config.make` file in the `d8config-vm` repo? And what about the other ways people use [Drupal VM][drupal-vm] in their workflow - for example [here][drupal-vm-composer] and [here][drupal-vm-discussion]? Why not use the minimal profile when starting a protoype, and save the step of deleting content types?

Questions or comments? Please let me know. And next time we'll just use [Docker][docker], shall we?

[drupal-vm]: https://github.com/geerlingguy/drupal-vm
[d8config-vm]: https://github.com/siliconmeadow/d8config-vm
[drush]: http://www.drush.org/en/master/
[d8config_profile]: https://github.com/siliconmeadow/d8config_profile
[d8config-config]: https://github.com/siliconmeadow/d8config-config
[drupal-vm_tag_3]: https://github.com/geerlingguy/drupal-vm/releases/tag/3.0.0
[vagrant]: https://www.vagrantup.com/
[github]: https://github.com/
[devel]: https://www.drupal.org/project/devel
[vagrant-auto_network]: https://github.com/oscar-stack/vagrant-auto_network
[vagrant-hostsupdater]: https://github.com/cogitatio/vagrant-hostsupdater
[php-56]: https://github.com/siliconmeadow/d8config-vm/blob/master/docs/other/php-56.md
[integrity]: https://www.drupal.org/project/integrity
[adminimal_theme]: https://www.drupal.org/project/adminimal_theme
[block_layout]: http://d8config.dev/admin/structure/block
[languages_admin]: http://d8config.dev/admin/config/regional/language
[d8profile-howto]: https://www.drupal.org/node/2210443
[d8profile-howto-conf]: https://www.drupal.org/node/2210443#config
[stack-ex-file-del]: https://drupal.stackexchange.com/questions/182477/are-there-any-pitfalls-pointing-config-sync-to-profiles-config-install#comment220399_182477
[profiler]: https://www.drupal.org/project/profiler
[features_module]: https://www.drupal.org/project/features
[strongarm_module]: https://www.drupal.org/project/strongarm
[d8config_docs]: https://www.drupal.org/documentation/administer/config
[docker]: https://www.docker.com/
[drupal-vm-composer]: https://github.com/geerlingguy/drupal-vm/blob/master/docs/other/drupalvm-composer-dependency.md
[drupal-vm-discussion]: https://github.com/geerlingguy/drupal-vm/issues/618
[automate]: /development/how-we-work/#our-manifesto
[md-toc]: #markdown-toc
