/**
 * The only function the user has to worry about, it's the only function to trigger. This one encompasses the whole logic of the app.
 */
function main() {
    const mailbox = MailService()
    const slack = Slack();
    const sheet = SheetInterface();
  
    const monitoredLabels = Object.values(globalVariables()["MAILBOX"]);
    const toExclude = sheet.getProcessedMessages();
  
    // We run through every label to monitor in the mailbox, looking for unread messages
    monitoredLabels.forEach(label => {
      const unread =  mailbox.getUnreadMessages(toExclude, label);
      if (unread.length > 0){
        const messagesIds = slack.sendMessages(unread, label);
        sheet.putProcessedMessages(messagesIds);
      }
    });
  }