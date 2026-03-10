// ============================================================
// Connect App — Google Apps Script Backend
// (lives in your existing Tidy Google Sheet)
// ============================================================
// How to deploy:
//
// 1. Open your existing Tidy Google Sheet.
// 2. At the bottom, click the + to add a new tab.
//    Name it exactly: ConnectData
// 3. Copy the spreadsheet ID from the URL bar —
//    it's the long string between /d/ and /edit:
//    docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
// 4. Paste your spreadsheet ID below where it says YOUR_SPREADSHEET_ID.
// 5. Go to https://script.google.com → click "New project".
//    (Do NOT use Extensions → Apps Script from the Tidy sheet,
//     as that would share the Tidy script.)
// 6. Delete the default code and paste ALL of this file's code.
// 7. Click Save (floppy disk icon).
// 8. Click Deploy → New deployment.
//    - Click the gear icon next to Type → select Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 9. Click Deploy, authorize the permissions when prompted.
// 10. Copy the Web app URL shown after deployment.
// 11. Paste that URL here as the SYNC_URL in connect/index.html.
// ============================================================

var SPREADSHEET_ID = '1WWXRJQU6rvKjgEr-XymbqxThv_GHfuKbkS8tuB7KfPs';
var SHEET_NAME = 'ConnectData';

function doGet(e) {
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
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
  var sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
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
