// ============================================================
// Connect App — Google Apps Script Backend
// ============================================================
// How to deploy:
//
// 1. Go to https://sheets.google.com and create a new spreadsheet.
// 2. Rename the first sheet (tab at the bottom) to: Data
// 3. In the spreadsheet, go to Extensions → Apps Script.
// 4. Delete the default code and paste ALL of this file's code.
// 5. Click Save (floppy disk icon).
// 6. Click Deploy → New deployment.
//    - Type: Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 7. Click Deploy, authorize the permissions when prompted.
// 8. Copy the Web app URL shown after deployment.
// 9. Open connect/index.html and replace:
//      const SYNC_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
//    with your copied URL.
// ============================================================

function doGet(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  var raw = sheet.getRange('A1').getValue();
  var data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    data = { people: [] };
  }
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Data');
  try {
    var data = JSON.parse(e.postData.contents);
    sheet.getRange('A1').setValue(JSON.stringify(data));
    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
