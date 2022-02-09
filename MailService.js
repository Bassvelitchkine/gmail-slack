/**
 * Stricto Sensu it's a function but conceptually, we use it like a class. This class contains methods to interact witht the user's gmail mail box.
 * @returns {Object} the frozen object with all the methods related to gmail interactions.
 */
 function MailService() {

    /**
     * A function that extracts the relevant info about the sender: the name and the company name.
     * @param {String} sender a string with info on the message sender
     * @returns {String} a new string with the name of the sender and the company name inside if possible
     * 
     * _senderInfoExtractor("Bastien Velitchkine <bastien.velitchkine@payfit.com>")
     * // => "Bastien Velitchkine de Payfit";
     */
    function _senderInfoExtractor(sender){
      if (sender.includes("<")){
        const temp = sender.split("<");
        const senderName = temp[0].match(/[\w\s\-]+/g)[0].trim();
        const companyName = temp[1].match(/@[\w\d\-]+/g)[0].replace("@", "");
        return `${senderName} de ${companyName[0].toUpperCase()}${companyName.slice(1)}`;
      } else {
        return sender.match(/\S+@([\w\d]+\.?){2}/)[0]
      }
    }

    /**
     * A function to retrieve every unread message from the user's mailbox (gmail only) in a specific folder. 
     * @param {String} labelName the name of the label inside which to look for unread messages.
     * @returns {Array} a 2D array that contains 2 elements Array that contain mail ids and senders info (see example)
     * 
     * getUnreadMessages("Funky Label")
     * // => [["56386589", "Bastien Velitchkine <bastien.velitchkine@payfit.com>"], ["6098732", "Dean Lamb <dean.lamb@archspire.death>"], ...];
     */
    function getUnreadMessages(toExclude, labelName){
        const label = GmailApp.getUserLabelByName(labelName);
        const threads = label.getThreads().filter(thread => thread.isUnread());
        let res = threads.map(thread => thread.getMessages()[0]).flat()
        res = res.map(message => [message.getId() ,_senderInfoExtractor(message.getFrom())]);
        res = res.filter(elem => !toExclude.includes(elem[0]));
        return res;
    }

    return Object.freeze({
        getUnreadMessages
    });
};
