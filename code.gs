function getSheetId() {
// Assign this script to a button in Google Sheet
// This function will find the sheet ID for Google script
// to reference  
    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheetId = spreadsheet.getId();
    sheetId = sheetId.toString();
    spreadsheet.getRange("B1").setValue(sheetId); // Assign sheet ID to cell B1
    return sheetId;
}
