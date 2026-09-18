/**
 * ============================================================================
 * MOMENTUM PHYSICS ACADEMY - GOOGLE APPS SCRIPT BACKEND (Code.gs)
 * ============================================================================
 *
 * INSTRUCTIONS FOR GOOGLE APPS SCRIPT DEPLOYMENT:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet.
 * 2. Name the sheet "Momentum Physics Enrollments".
 * 3. In the top menu, click Extensions -> Apps Script.
 * 4. Paste the entire contents of this Code.gs file into the editor.
 * 5. Click Save (Disk Icon).
 * 6. Click Deploy -> New Deployment.
 * 7. Click Select Type (Gear Icon) -> Web App.
 * 8. Set Configuration:
 *    - Description: "Momentum Physics Enrollment API v1"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL for receiving submissions from website)
 * 9. Click Deploy, authorizing permissions when prompted.
 * 10. Copy the generated Web App URL (e.g. https://script.google.com/macros/s/AKfycbx.../exec).
 * 11. Set this URL in your project environment variable: VITE_GOOGLE_SCRIPT_URL
 *
 * AUTOMATED EMAIL TRIGGER SETUP:
 * 1. In Apps Script left sidebar, click Triggers (Alarm Clock icon).
 * 2. Click "Add Trigger" (bottom right).
 * 3. Choose function: "onEditStatusTrigger".
 * 4. Select event source: "From spreadsheet".
 * 5. Select event type: "On edit".
 * 6. Click Save.
 * Now whenever an Admin changes a student's status column to "Paid", a Welcome Email
 * with Microsoft Teams links and Course Schedule will automatically send to the student!
 * ============================================================================
 */

// Global Sheet Configuration
var SHEET_NAME = "Enrollments";

/**
 * Handle HTTP POST requests sent from the Momentum Physics Enrollment Form
 */
function doPost(e) {
  try {
    var lock = LockService.getScriptLock();
    // Wait up to 10 seconds for concurrent lock
    lock.waitLock(10000);

    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheetByName(SHEET_NAME);

    // If sheet doesn't exist, create it and set headers
    if (!sheet) {
      sheet = doc.insertSheet(SHEET_NAME);
      setupHeaderRow(sheet);
    } else if (sheet.getLastRow() === 0) {
      setupHeaderRow(sheet);
    }

    // Parse incoming JSON payload
    var data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || {};
    }

    // Extract payload values with fallbacks
    var timestamp = data.timestamp || new Date().toISOString();
    var studentName = data.studentName || "N/A";
    var studentEmail = data.studentEmail || "N/A";
    var studentPhone = data.studentPhone || "N/A";
    var parentName = data.parentName || "N/A";
    var parentPhone = data.parentPhone || "N/A";
    var country = data.country || "N/A";
    var course = data.course || "N/A";
    var studyMode = data.studyMode || "Group";
    var preferredBatch = data.preferredBatch || "N/A";
    var paymentMethod = data.paymentMethod || "IBAN Bank Transfer";
    var notes = data.notes || "";
    var status = data.status || "Pending Payment";

    // Append new row to Google Sheet
    sheet.appendRow([
      timestamp,
      studentName,
      studentEmail,
      studentPhone,
      parentName,
      parentPhone,
      country,
      course,
      studyMode,
      preferredBatch,
      paymentMethod,
      notes,
      status
    ]);

    // Format new row highlighting for Pending Payment
    var lastRow = sheet.getLastRow();
    var statusCell = sheet.getRange(lastRow, 13);
    statusCell.setBackground("#FFFBEB").setFontColor("#B45309").setFontWeight("bold"); // Light yellow warning badge

    lock.releaseLock();

    // Return success JSON output
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "success",
        message: "Enrollment application recorded successfully in Google Sheets.",
        row: lastRow,
        studentName: studentName
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log("Error in doPost: " + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle CORS preflight options request if needed
 */
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Set up initial table headers for the Google Sheet
 */
function setupHeaderRow(sheet) {
  var headers = [
    "Timestamp",
    "Student Full Name",
    "Student Email",
    "Student Phone",
    "Parent Name",
    "Parent Phone",
    "Country",
    "Course",
    "Study Mode",
    "Preferred Batch",
    "Payment Method",
    "Additional Notes",
    "Status"
  ];
  sheet.appendRow(headers);
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange
    .setBackground("#0F172A") // Navy Dark header
    .setFontColor("#00F0FF") // Cyan accent text
    .setFontWeight("bold")
    .setFontSize(10);
  sheet.setFrozenRows(1);
}

/**
 * AUTOMATED EMAIL TRIGGER FUNCTION
 * Triggered on spreadsheet edit. When Admin changes Status column (Column 13)
 * from "Pending Payment" to "Paid", sends Welcome Email to the student!
 */
function onEditStatusTrigger(e) {
  try {
    if (!e) return;
    var range = e.range;
    var sheet = range.getSheet();
    if (sheet.getName() !== SHEET_NAME) return;

    var editedColumn = range.getColumn();
    var editedRow = range.getRow();

    // Column 13 is Status
    if (editedColumn === 13 && editedRow > 1) {
      var statusValue = range.getValue().toString().trim();

      if (statusValue.toLowerCase() === "paid") {
        // Retrieve student data from edited row
        var rowValues = sheet.getRange(editedRow, 1, 1, 13).getValues()[0];
        var studentName = rowValues[1];
        var studentEmail = rowValues[2];
        var course = rowValues[7];
        var studyMode = rowValues[8];

        // Format visual badge in spreadsheet to Green
        range.setBackground("#ECFDF5").setFontColor("#047857").setFontWeight("bold");

        // Send Welcome Email if valid email exists
        if (studentEmail && studentEmail.indexOf("@") !== -1) {
          sendWelcomeEmail(studentName, studentEmail, course, studyMode);
          Logger.log("Welcome email successfully sent to: " + studentEmail);
        }
      }
    }
  } catch (err) {
    Logger.log("Error in onEditStatusTrigger: " + err.toString());
  }
}

/**
 * Helper to construct and send the branded HTML Welcome Email
 */
function sendWelcomeEmail(studentName, studentEmail, course, studyMode) {
  var subject = "🎉 Welcome to Momentum Physics Academy! Your Access & Teams Kit";
  
  var teamsLink = "https://teams.microsoft.com/l/meetup-join/momentum-physics-demo";
  var handbookLink = "https://momentumphysics.com/handbook";

  var htmlBody = `
    <div style="font-family: 'Segoe UI', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0A0F1D; color: #E2E8F0; border-radius: 16px; padding: 32px; border: 1px solid #1E293B;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #00F0FF; font-size: 24px; font-weight: 800; margin: 0; tracking: -0.5px;">MOMENTUM PHYSICS ACADEMY</h1>
        <p style="color: #94A3B8; font-size: 12px; margin-top: 4px; text-transform: uppercase; letter-spacing: 2px;">Official Student Welcome Kit</p>
      </div>

      <div style="background-color: #0F172A; border-radius: 12px; padding: 20px; border: 1px solid #334155; margin-bottom: 24px;">
        <h2 style="color: #FFFFFF; font-size: 18px; margin-top: 0;">Payment Verified! Welcome, ${studentName}!</h2>
        <p style="color: #94A3B8; font-size: 14px; line-height: 1.6;">
          Your tuition payment for <strong style="color: #00F0FF;">${course} (${studyMode} Mode)</strong> has been confirmed by our finance department. Your seat in the upcoming cohort is officially active!
        </p>
      </div>

      <div style="margin-bottom: 24px;">
        <h3 style="color: #00F0FF; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">Your Academic Onboarding Package:</h3>
        
        <ul style="list-style: none; padding: 0; margin: 0;">
          <li style="padding: 12px; background-color: #1E293B; border-radius: 8px; margin-bottom: 8px; font-size: 13px;">
            <strong style="color: #FFFFFF;">1. Microsoft Teams Live Classroom:</strong><br/>
            <a href="${teamsLink}" style="color: #38BDF8; text-decoration: underline;">Click Here to Join Teams Classroom</a>
          </li>
          <li style="padding: 12px; background-color: #1E293B; border-radius: 8px; margin-bottom: 8px; font-size: 13px;">
            <strong style="color: #FFFFFF;">2. Formula Handbook & Quick-Sheets:</strong><br/>
            <span style="color: #94A3B8;">Digital formula reference sheet attached and available in portal.</span>
          </li>
          <li style="padding: 12px; background-color: #1E293B; border-radius: 8px; margin-bottom: 8px; font-size: 13px;">
            <strong style="color: #FFFFFF;">3. 24/7 Class Recordings Library:</strong><br/>
            <span style="color: #94A3B8;">Login credentials: Username: ${studentEmail}</span>
          </li>
        </ul>
      </div>

      <div style="text-align: center; padding-top: 16px; border-top: 1px solid #1E293B; color: #64748B; font-size: 11px;">
        <p>Momentum Physics Academy • Building Physics Mastery & High Examination Scores</p>
        <p>WhatsApp Admissions Support: +966 59 762 1520</p>
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: studentEmail,
    subject: subject,
    htmlBody: htmlBody
  });
}
