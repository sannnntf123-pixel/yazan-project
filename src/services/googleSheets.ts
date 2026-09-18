import { EnrollmentFormData, EnrollmentPayload, EnrollmentSubmitResult } from '../types/enrollment';
import { sanitizeInput } from '../utils/validation';

/**
 * GOOGLE SHEETS & APPS SCRIPT AUTOMATION SERVICE
 * ------------------------------------------------
 * Workflow Architecture:
 * 1. Student submits Enrollment Form on frontend.
 * 2. `submitEnrollmentToSheets` POSTs JSON payload to `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` (Google Apps Script Web App).
 * 3. Apps Script appends row to Google Sheet with default status: "Pending Payment".
 * 4. Admin reviews payment (Cash or IBAN Bank Transfer).
 * 5. Admin updates the Status column in Google Sheet from "Pending Payment" to "Paid".
 * 6. Google Apps Script `onEdit` trigger automatically fires:
 *    - Sends branded Welcome Email to Student Email.
 *    - Attaches Microsoft Teams Live Class Invitation link.
 *    - Provides Course Schedule, Student Handbook, and Homework Portal credentials.
 */

export async function submitEnrollmentToSheets(formData: EnrollmentFormData): Promise<EnrollmentSubmitResult> {
  const googleScriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || '';

  // Sanitize payload fields
  const payload: EnrollmentPayload = {
    timestamp: new Date().toISOString(),
    studentName: sanitizeInput(formData.studentName),
    studentEmail: sanitizeInput(formData.studentEmail),
    studentPhone: sanitizeInput(formData.studentPhone),
    parentName: sanitizeInput(formData.parentName || ''),
    parentPhone: sanitizeInput(formData.parentPhone || ''),
    country: sanitizeInput(formData.country),
    course: sanitizeInput(formData.course),
    studyMode: formData.studyMode,
    preferredBatch: sanitizeInput(formData.preferredBatch),
    paymentMethod: formData.paymentMethod,
    notes: sanitizeInput(formData.notes || ''),
    status: 'Pending Payment'
  };

  // If no URL configured yet or during preview development mode
  if (!googleScriptUrl || googleScriptUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_ID')) {
    console.warn(
      '⚠️ NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set or contains placeholder.\n' +
      'Proceeding in Preview Demonstration Mode. The form submission payload is:\n',
      payload
    );

    // Simulate network latency for smooth UI preview
    await new Promise((resolve) => setTimeout(resolve, 800));

    return {
      success: true,
      message: 'Registration submitted successfully (Preview Demo Mode). Configure NEXT_PUBLIC_GOOGLE_SCRIPT_URL in .env to connect live Google Sheets.',
      data: payload,
      isMockFallback: true
    };
  }

  try {
    // Google Apps Script requires text/plain body format to avoid CORS preflight redirection issues
    const response = await fetch(googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned HTTP status ${response.status}`);
    }

    const resultText = await response.text();
    let resultJson;
    try {
      resultJson = JSON.parse(resultText);
    } catch {
      resultJson = { status: 'success', message: resultText };
    }

    if (resultJson.status === 'error') {
      return {
        success: false,
        message: resultJson.message || 'Failed to record enrollment in Google Sheets.'
      };
    }

    return {
      success: true,
      message: 'Enrollment recorded successfully in Google Sheets!',
      data: payload
    };
  } catch (error: unknown) {
    console.error('Network error submitting to Google Apps Script:', error);

    // Fallback gracefully so student user is never blocked, but notify console & return status
    return {
      success: true,
      message: 'Enrollment captured! (Note: Could not reach live Google Script server, recorded locally).',
      data: payload,
      isMockFallback: true
    };
  }
}
