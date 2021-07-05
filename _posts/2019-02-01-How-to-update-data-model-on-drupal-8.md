---
layout: post
title: How to update data models in Drupal 8
subtitle: Introducing the process of updating data models in Drupal 8
description: This article gives details on how to update the data models in Drupal 8
category: Drupal
tags: [Development,Drupal,Deployment,Open source, Data model]
author: [nassaz]
comments: true
share: true
---

In this article we will see how to update data models in Drupal 8, how to make the difference between model updating and content updating, how to create default content, and finally, the procedure to adopt for successful deployments to avoid surprises in a continuous integration/delivery Drupal cycle.

Before we start, I would encourage you to read [the documentation of the hook `hook_update_N()`](https://api.drupal.org/api/drupal/core%21lib%21Drupal%21Core%21Extension%21module.api.php/function/hook_update_N/8.6.x) and to take into account all the possible impacts before writing an update.

Updating the database (executing hook updates and/or importing the configuration) is a very problematic task during a Drupal 8 deployment process, because the updating actions order of structure and data is not well defined in Drupal, and can pose several problems if not completely controlled.

It is important to differentiate between a contributed module to be published on drupal.org aimed at a wide audience, and a custom Drupal project (a set of Drupal contrib/custom modules) designed to provide a bespoke solution in response to a client's needs. In a contributed module it is rare to have a real need to create instances of configuration/content entities, on the other hand deploying a custom Drupal project makes updating data models more complicated. In the following sections we will list all possible types of updates in Drupal 8.


The Field module allows us to add fields to bundles, we must make difference between the data structure that will be stored in the field (the static `schema()` method) and all the settings of the field and its storage that will be stored as a configuration. All the dependencies related to the configuration of the field are stored in the `field_config` configuration entity and all the dependencies related to the storage of the field are stored in the `field_storage_config` configuration entity. Base fields are stored by default in the entity's base table.
 
 
Configurable fields are the fields that can be added via the UI and attached to a bundle, which can be exported and deployed. Base fields are not managed by the `field_storage_config` configuration entities and `field_config`.


To update the entity definition or its components definitions (field defintions for example if the entity is fieldable) we can implement `hook_update_N()`. In this hook don't use the APIs that require a full Drupal bootstrap (e.g. database with CRUD actions, services, ...), to do this type of update safely we can use the methods proposed by the contract `EntityDefinitionUpdateManagerInterface` (e.g. updating the entity keys, updating a basic field definition common to all bundles, ...)

To be able to update existing data entities or data fields in the case of a fieldable entity following a modification of a definition we can implement `hook_post_update_NAME()`. In this hook you can use all the APIs you need to update your entities.

To update the schema of a simple, complex configuration (a configuration entity) or a schema defined in a `hook_schema()` hook, we can implement `hook_update_N()`.

In a custom Drupal project we are often led to create custom content types or bundles of custom entities (something we do not normally do in a contributed module, and we rarely do it in an installation profile), a site building action allows us to create this type of elements which will be exported afterwards in yml files and then deployed in production using Drupal configuration manager.

A bundle definition is a configuration entity that defines the global schema, we can implement `hook_update_N()` to update the model in this case as I mentioned earlier. Bundles are instances that persist as a Drupal configuration and follow the same schema. To update the bundles, updated configurations must be exported using the configuration manager to be able to import them into production later. Several problems can arise:
+ If we add a field to a bundle, and want to create content during the deployment for this field, using the current workflow ([`drush updatedb`](https://drushcommands.com/drush-8x/core/updatedb/) -> [`drush config-import`](https://drushcommands.com/drush-8x/config/config-import/)) this action is not trivial, and the hook `hook_post_update_NAME()` can't be used since it's executed before the configuration import.
+ The same problem can arise if we want to update fields of bundles that have existing data, the hook `hook_post_update_NAME()` which is designed to update the existing contents or entities will run before the configuration is imported.
What is the solution for this problem? (We will look at a solution for this problem later in this article.)

## Now the question is: How to import default content in a custom Drupal project?

Importing default content for a site is an action which is not well documented in Drupal, in a profile installation often this import is done in the `hook_install()` hook because always the data content have not a complex structure with levels of nested references, in some cases we can use [the default content module](https://www.drupal.org/project/default_content). Overall in a module we can't create content in a `hook_install()` hook, simply because when installing a module the integrity of the configuration is still not imported. 

In a recent project i used the [`drush php-script`](https://drushcommands.com/drush-8x/core/php-script/) command to execute import scripts after the ([`drush updatedb`](https://drushcommands.com/drush-8x/core/updatedb/) -> [`drush config-import`](https://drushcommands.com/drush-8x/config/config-import/)) but this command is not always available during deployment process. The first idea that comes to mind is to subscribe to the event that is triggered after the import of the configurations to be able to create the contents that will be available for the site editors, but the use of an event is not a nice developer experience hence the introduction of [a new hook `hook_post_config_import_NAME()`](https://www.drupal.org/project/drupal/issues/2901418) that will run once after the database updates and configuration import.
Another hook `hook_pre_config_import_NAME()` has also been introduced to fix performance issues.

## A workflow that works for me

To achieve a successful Drupal deployment in continuous integration/delivery cycles using Drush, the most generic workflow that I've found at the moment while waiting for a deployment API in core is as follows :

1. [`drush updatedb`](https://drushcommands.com/drush-8x/core/updatedb/)
   * `hook_update_N()` : To update the definition of an entity and its components
   * `hook_post_update_N()` : To update entities when you made an entity definition modification (entity keys, base fields, ...)
2. `hook_pre_config_import_NAME()` : CRUD operations (e.g. creating terms that will be taken as default values when importing configuration in the next step)
2. [`drush config-import`](https://drushcommands.com/drush-8x/config/config-import/) : Importing the configuration (e.g. new bundle field, creation of a new bundle, image styles, image crops, ...)
3. `hook_post_config_import_NAME()`: CRUD operations (e.g. creating contents, updating existing contents, ...)

This approach works well for us, and I hope it will be useful for you. If you've got any suggestions for improvements, please let me know via the comments.
