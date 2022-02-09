# Phone Parsing

# Purpose

📬 Not everyone has eyes on a mailbox all the time. A company might send a lot of email campaigns and miss some replies to those campaigns. This Google Apps Script app aims at notifying, directly in Slack, the company when they got an answer to an email campaign.

They hard-code (we'll see that below) the list of labels (cf. Gmail naming conventions) they want want to monitor in their mailbox, and whenever a new message lands in those labels, they get a notification in Slack.

# Code organization

## Classes

There are three _classes files_: `MailService.js`, `Slack.js` and `SheetInterface.js`.

In each of these files, there is a single function that **acts like a class**. A few methods are attached to each of the classes. Methods attached to MailService, for instance, only deal with the user's mailbox (Gmail for the time being). This orginization allows for **better code segmentation and clarity**.

## Variables files

There's a single variables files: `variables.js` which contains global variables required to run the project.

## Main file

This file contains a single "encapsulating" function. This is **the function to set a trigger for** in Google Apps Script. It's the only function the admin should worry about because it encompasses the whole project's logic.

# Installation

## Pre-Requisites

1. You have a **Slack Workspace** and **GMail** mailbox.
2. You've created a new app and a new **webhook** in your _Slack workspace_.
3. (Optional) You've installed [@google/clasp](https://github.com/google/clasp/) and know how to use it in your CLI.
4. You're following [this tutorial](https://spiral-sturgeon-359.notion.site/Gmail-x-Slack-8f285a355a234d27ad5e60ab42af4a13).

## Tutorial

1. Fork this repo on your github profile and clone it into your machine.

2. Create a `secret.js` file and put your credentials in it, like so:

   ```js
   function secret() {
     const slackHook = "https://hooks.slack.com/services/****"; // The hook of your app

     return Object.freeze({
       slackHook,
     });
   }
   ```

3. In `variables.js` change the spreadsheet id to the id of the spreadsheet you duplicated:

   ```js
   return Object.freeze({
       ...
       "SPREADSHEET": {
           "spreadsheetId": "👉 Spreadsheet Id Here 👈 ",
   });
   ```

4. Still in `variables.js` add the Gmail mailbox labels you want to monitor:

   ```js
    return Object.freeze({
      "MAILBOX": ["Label 1", "Label 2", ...],
      ...
    });
   };
   ```

5. Clasp push the code from your local repo _to the Google Apps Script project attached to the spreadsheet you just duplicated_.

# Ackowledgements

Coded with grit 💪 by [Bastien Velitchkine](https://www.linkedin.com/in/bastienvelitchkine/).
