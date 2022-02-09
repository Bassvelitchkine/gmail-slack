/**
 * Stricto Sensu it's a function but conceptually, we use it like a class. This class contains methods to interact with Slack.
 * @returns {Object} the frozen object with all the methods related to Slack API's interactions.
 */
function Slack() {

    /**
     * A function to build the payload to send to the Slack web hook.
     * @param {String} senderInfo Info about the sender, name and company name in a single string
     * @param {String} label the name of the label where we found the sender's email
     * @returns {Object} an object that follows the standards of Slack API when we want to send formatted messages
     */
    function _messageFormatting(senderInfo, label){
      return {
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `:mailbox: *${label} Reply!*`
            }
          },
          {
            "type": "divider"
          },
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": `_${senderInfo}_ a répondu 🤘`
            }
          }
        ]
      }
    };
  
    /**
     * A function that sends a single message to the Slack API via a web hook.
     * @param {String} senderInfo Info about the sender, name and company name in a single string
     * @param {String} label name of the label where the sender's email came from
     * @returns {String or Boolean} returns the id of the Gmail message that was just being processed if the message was successfully sent, false otherwise.
     * 
     * _sendMessage(["56386589", "Bastien Velitchkine de Payfit"], "Funky Label")
     * // => "56386589";
     */
    function _sendMessage(senderInfo, label){
        const url = secret()["slackHook"];
        const options = {
            "method" : "POST",
            "muteHttpExceptions": true,
            "contentType": "application/json",
            "payload": JSON.stringify(_messageFormatting(senderInfo[1], label))
        };
    
        try{
            const code = UrlFetchApp.fetch(url, options).getResponseCode();
            if(Math.floor(code / 100) === 2){
                Logger.log(`Message ${senderInfo[0]} successfully sent`);
                return senderInfo[0];
            } else {
                throw Error;
            }      
        } catch(e) {
            Logger.log(`Something went wrong with message ${senderInfo[0]}`);
            return false;
        }
    };
  
    /**
     * A function that sends a series of notification through Slack's API
     * @param {Array} sendersInfo an array with info on all the senders whose unread messages were found in the mailbox
     * @param {String} label the name of the label where we found the unread messages in the gmail mailbox.
     * @returns {Array} the list of message ids whose notification were successfully sent to Slack.
     * 
     * sendMessages([["56386589", "Bastien Velitchkine de Payfit"], ["6098732", "Dean Lamb de Archspire"]], "Funky Label")
     * // => ["56386589"]; // If only the first message was successfully sent.
     */
    function sendMessages(sendersInfo, label){
        const sentStatus = sendersInfo.map(senderInfo => _sendMessage(senderInfo, label));
        return sentStatus.filter(status => status);
    }
  
    return Object.freeze({
        sendMessages
    });
}