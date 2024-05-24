---
layout: post
title: "Automation Scripting with Bash"
subtitle: "Automating Tasks in the Cloud with Custom Bash Scripts"
description: Discover the power of Bash scripting to automate repetitive tasks.
summary: In this article, we explore automation scripting, its role within cloud engineering and use cases for Bash.
category: Development
tags: [Development, Scripting, Automation, Bash]
author: [enamul_ali]
comments: true
share: true
---

The need for automation in software engineering, especially in Cloud and Platform Roles is apparent. Manual, repetitive tasks consume time, introduce the possibility of human error and can become tedious for team members. In this blog post, I wish to document my journey of automation using Bash. We'll look at the process and explore how automation can positively impact our workflows and our team.

## Automating Simple Commands with Bash Scripts

For my first project at Capgemini, I have been working as a Platform Engineer within Cloud & Custom Applications. I quickly recognised the importance of automation in streamlining workflows. I took on the challenge of automating repetitive tasks, in the hopes of saving time and reducing human error. 

Within my role, I find myself frequently using the same set of commands. For example, I often type `vault read --field=value <path> | openssl x509 -noout -text`, a command commonly used for reading and inspecting certificates stored in HashiCorp Vault. The symbol `|` is called a "pipe" in Bash scripting. It allows the output from the command on its left side to be used as input for the command on its right side. For example, in the command above the output of `vault read --field=value <path>` is passed to `openssl x509 -noout -text` for further processing.

This got me thinking: why not create a basic bash script that takes the vault path as an argument, which I could then alias as a command. That way, I could simply run `<alias> <path>` to fetch the certificate. Not only would this save me time, but it would be easier on the fingers.

So I set about doing this as below:

1. The first step in creating a script is to create a file ending in .sh, here we will create a file called `vaultcert.sh`. 

2. Next, open the file in a text editor and define its functionality: The script accepts an argument for the vault path. This argument is passed as the path to the command `vault read --field=value <path> | openssl x509 -noout -text`. 

```bash
#!/bin/bash

# Function to read certificate from Vault
read_certificate() {
    # Check if argument is provided
    if [ -z "$1" ]; then
        echo "Error: Vault path argument is missing."
        exit 1
    fi

    # Execute the command to read certificate from Vault
    vault read --field=value "$1" | openssl x509 -noout -text
}

# Invoke the function with the provided argument
read_certificate "$1"
```

3\. We must set executable permissions to ensure the script is able to execute. We can do this by running in Linux:
```bash
chmod +x vaultcert.sh
```

4\. An alias allows the script to be executed from a single command. We can do this by adding the following to our shell configuration file (e.g. .bashrc or .bash_profile):
```bash
alias vaultcert='/path/to/vaultcert.sh'
```

5\. Now we must reload the shell configuration to apply the changes. We can do this by sourcing: `source ~/.bashrc` or `source ~/.bash_profile`.

6\. Finally, confirm that the alias works by running the following command in the terminal:
```bash
vaultcert <path>
```

And that's it you have your first automated bash script!

## Automating More Complex Commands with Bash Scripts


Once I had my first bash script up and running, I challenged myself to automate more complex tasks. With Bash scripting, we can make tasks such as managing files much easier. The possibilities of streamlining workflows with Bash scripting and automating complex tedious tasks are endless.

For example, the next automation script I worked on expanded upon the first one, but allowed the user to copy the file stored in vault to their local machine and then write to a further vault path. All we have to do is follow the steps above and create a new script:

```bash
#!/bin/bash

copy_write_certificate() {
    # Check if arguments are provided
    if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Error: Arguments are missing."
        exit 1
    fi

    # Execute command to copy certificate from Vault to local and write to new destination
    vault read --field=value "$1" > /path/to/local/file
    # Check if the file was copied successfully
    if [ -f "/path/to/local/file" ]; then
        echo "Certificate copied successfully to /path/to/local/file"
    else
        echo "Error: Certificate copy failed."
        exit 1
    fi

    # Prompt user to confirm writing the file to the new destination vault path
    read -p "Do you want to proceed with writing the file to $2 (y/n): " choice
    if [ "$choice" = "y" ] || [ "$choice" = "Y" ]; then
        vault write --field=value "$2" value=@/path/to/local/file
        echo "File successfully written to the new vault path."
    else
        echo "Cancelled writing to vault."
        exit 1
    fi
}

# Invoke the function with the provided arguments
copy_write_certificate "$1" "$2"
```

As demonstrated, Bash scripting opens up endless possibilities. We can increase the efficiency of our team by automating frequently used commands and sharing this with our team. Adding docs and sharing demos helps facilitate collaboration and boost productivity across the entire team.

We have explored my journey of bash automation on my first project here at Capgemini. In my next blog post, we will look at taking this one step further by introducing Python scripting, also discussing the use cases for Bash vs Python.

Thanks for reading!
