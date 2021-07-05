---
layout: post
title: "Drupal 8 PSR-4 Form compatibility in Drupal 7"
category: Drupal
author: oliverpolden
tags: [Architecture, Development]
date: 2015-01-14
comments: true
share: true
---

Up until Drupal 8 there has been little to encourage well organised code. It now has [PSR-4](http://www.php-fig.org/psr/psr-4/) autoloading so your classes are automatically included. Even though Drupal 8 is just round the corner, a lot of us will still be using Drupal 7 for quite a while, however that doesn’t mean we can’t benefit from this structure in Drupal 7.

This post covers two parts:

1. Autoloading class files.
2. Avoiding extra plumbing to hook into your class methods.

You’re probably familiar with `drupal_get_form(‘my_example_form’)` which then looks for a function `my_example_form()`. The issue is that your form definition will no longer be in such a function but within a method in a class. To cover both these parts we will be using two modules:

1. [XAutoLoad](https://www.drupal.org/project/xautoload) - Which will autoload our class.
2. [Cool](https://www.drupal.org/project/cool) - Which allows us to abstract the usual functions into class methods.

Drupal 8 was originally using [PSR-0](http://www.php-fig.org/psr/psr-0/) which has been deprecated in favour of [PSR-4](http://www.php-fig.org/psr/psr-4/). As a consequence the [Cool](https://www.drupal.org/project/cool) module uses [PSR-0](http://www.php-fig.org/psr/psr-0/) in its examples although it does support [PSR-4](http://www.php-fig.org/psr/psr-4/). We will create an example module called `psr4_form`.

The information on [autoloading and folder structure for PSR-4 in Drupal 8](https://www.drupal.org/node/2156625) states that we should place our form class in `psr4_form/src/Form/FormExample.php` however the cool module instead loads from a `FormControllers` folder: `psr4_form/src/FormControllers/FormExample.php`.

We can get round this by providing our own `hook_forms()` as laid out in the [Cool](https://www.drupal.org/project/cool) module:

{% highlight php %}
/**
* Implements hook_forms().
*/
function psr4_form_forms($form_id, $args) {
  $classes = \Drupal\cool\Loader::mapImplementationsAvailable('Form', '\Drupal\cool\Controllers\FormController');
  unset($classes['Drupal\\cool\\BaseForm']);
  unset($classes['Drupal\\cool\\BaseSettingsForm']);
  $forms = array();
  foreach ($classes as $class_name) {
    $forms[$class_name::getId()] = array(
      'callback' => 'cool_default_form_callback',
      'callback arguments' => array($class_name),
    );
  }

  return $forms;
}
{% endhighlight %}

If you are ok placing your class in the `FormControllers` folder then you can omit the above function to keep your `.module` file simple or you could put the hook in another module. Potentially the [Cool](https://www.drupal.org/project/cool) module could be updated to reflect this.

This class requires a namespace of the form `Drupal\<module_name>\Form`. It also extends the BaseForm class provided by the [Cool](https://www.drupal.org/project/cool) module so we don't need to explicitly create our form functions:

{% highlight php %}
namespace Drupal\psr4_form\Form;

class FormExample extends \Drupal\cool\BaseForm {
  ...
}
{% endhighlight %}

Within our FormExample class we need a method `getId()` to expose the `form_id` to Drupal:

{% highlight php %}
public static function getId() {
  return 'psr4_form';
}
{% endhighlight %}

And of course we need the form builder:

{% highlight php %}
public static function build() {
  $form = parent::build();
  $form['my_textfield'] = array(
     '#type' => 'textfield',
     '#title' => t('My textfield'),
   );

   return $form;
}
{% endhighlight %}

All that is left is to define your validate and submit methods following [the Drupal 8 form API](https://www.drupal.org/node/2117411).

At the time of writing, the [Cool](https://www.drupal.org/project/cool) module isn’t up to date with [Drupal 8 Form API conventions](https://www.drupal.org/node/2117411). I started this blog post with the intention of a direct copy and paste of the src folder. Unfortunately the methods don't quite follow the exact same conventions and they also need to be static:

| Drupal 7 | Drupal 8    |
|----------|-------------|
| getId    | getFormId   |
| build    | buildForm   |
| validate |validateForm |
| submit   |submitForm   |

This example module can be found at [https://github.com/oliverpolden/psr4_form](https://github.com/oliverpolden/psr4_form).

Taking it further
=================

Drupal 8 is just round the corner but a lot of us will still be using Drupal 7 for the foreseeable future. Taking this approach allows us to learn and make use of Drupal 8 conventions as well as making it easier to migrate from Drupal 7. It would be nice to see the [Cool](https://www.drupal.org/project/cool) module be brought up to date with the current API, perhaps something I will be helping with in the not so distant future.

Links
=====

## Modules

* [XAutoLoad](https://www.drupal.org/project/xautoload)
* [Cool](https://www.drupal.org/project/cool)

## Information

* [PSR-4 namespaces and autoloading in Drupal 8](https://www.drupal.org/node/2156625)
* [Drupal 8 Form API conventions](https://www.drupal.org/node/2117411)
