/**
 * Stricto Sensu it's a function but conceptually, we use it like a class. This class contains methods to interact with the Google Sheet.
 * @returns {Object} the frozen object with all the methods related to GSheet's interactions.
 */
function SheetInterface() {

    /**
     * A function to write data in a sheet after all the data that's already been written in it.
     * @param {String} sheetName the name of the sheet where to write the data
     * @param {Array} data the 2D-Array of data to append to the sheet
     */
    function _writeAfter(sheetName, data){
      const spreadsheetId = globalVariables()["SPREADSHEET"]["spreadsheetId"];
      sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
      const lastRow = sheet.getDataRange().getLastRow();
      sheet.insertRowAfter(lastRow);
      sheet.getRange(lastRow + 1, 1, data.length, data[0].length).setValues(data);
    };
  
    /**
     * A function that retrieves the ids of all the mesages we've processed and sent to the Slack API.
     * @returns {Array} the list of all messages ids that have already been delt with by our app.
     * 
     * getProcessedMessages()
     * // => ["56386589", "6098732", ...];
     */
    function getProcessedMessages(){
      const spreadsheetVar = globalVariables()["SPREADSHEET"];
      const spreadsheetId = spreadsheetVar["spreadsheetId"];
      const sheetName = spreadsheetVar["processed"]["sheetName"];
      const idRange = spreadsheetVar["processed"]["id"];
      
      const valueRange = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName).getRange(idRange);
      return valueRange.getValues().flat().filter(elem => elem !== "");
    }
  
    /**
     * A function that writes down the list of ids of all the messages that've been processed to the spreadsheet.
     * @param {Array} messagesIds the list of all ids that have successfully been processed and resulted in a notification in Slack.
     */
    function putProcessedMessages(messagesIds){
      const sheetName = globalVariables()["SPREADSHEET"]["processed"]["sheetName"];
      const ids = messagesIds.map(id => [id]);
      _writeAfter(sheetName, ids);
    }
  
    return Object.freeze({
      getProcessedMessages,
      putProcessedMessages
    });
}  