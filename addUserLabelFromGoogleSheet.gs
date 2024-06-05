function addUserLabelFromGoogleSheet() {
    // This script read the label rules from a Google Sheet
    // Scan the label in inbox
    // Apply label if the sender address matches with the rule
    // Suggested to run every 15 minutes

    var fileId = 'put_the_google_sheet_id_here';
    var sheetName = 'Sheet1';
    var dayAgo = 2; // Limit the days of emails to process

    // Initialize the array
    var myArray = [];

    // Open the Google Sheet by ID
    var spreadsheet = SpreadsheetApp.openById(fileId);
    var sheet = spreadsheet.getSheetByName(sheetName);
    var configsheet = spreadsheet.getSheetByName('Config');
    dayAgo = configsheet.getRange("B2").getValue();

    function arrAdd(arr, domain, label) {
        arr.push({ domain: domain, label: label });
        return arr;
    }

    if (!sheet) {
        Logger.log('Sheet not found: ' + sheetName);
        return;
    }

    // Get the data range from the sheet
    var dataRange = sheet.getDataRange();
    var data = dataRange.getValues();

    // Iterate over the rows and process the data
    for (var i = 1; i < data.length; i++) { // Start from 1 to skip the header row
        var domainName = data[i][0].trim();
        var labelName = data[i][1].trim();

        // Add domain and label to the array
        myArray = arrAdd(myArray, domainName, labelName);
    }

    var DaysAgo = new Date((new Date()).getTime() - (dayAgo * 24 * 60 * 60 * 1000));
    var query = 'in:inbox after:' + (Utilities.formatDate(DaysAgo, "en_US", "yyyy/MM/dd"));

    var threads = GmailApp.search(query);

    for (var i = 0; i < threads.length; i++) {
        var thread = threads[i];

        var messages = thread.getMessages();
        for (var m = 0; m < messages.length; m++) {

            var fromAddress = messages[m].getFrom();
            console.log("From address : " + fromAddress);

            if (fromAddress) {
                for (var n = 0; n < myArray.length; n++) {
                    var arrayRegex = myArray[n]["domain"];
                    if (fromAddress.toLowerCase().includes(myArray[n]["domain"].toLowerCase())) {
                        var uLabel = GmailApp.getUserLabelByName(myArray[n]["label"]);
                        if (uLabel) {
                            console.log("Added label : " + myArray[n]["label"]);
                            thread.addLabel(uLabel);
                        } else {
                            console.log("Problem with " + myArray[n]["label"]);
                        }
                    }
                }
            }
        }
    }
}
