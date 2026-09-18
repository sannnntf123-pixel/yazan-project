import { EnrollmentFormData, EnrollmentPayload, EnrollmentSubmitResult } from '../types/enrollment';
import { sanitizeInput } from '../utils/validation';
import { ACADEMY_WHATSAPP } from '../config/bankDetails';

/**
 * WHATSAPP ENROLLMENT SERVICE
 * ---------------------------
 * The enrollment form has no backend: on submit we build a WhatsApp deep link
 * with the application details pre-filled and open it, so the student sends
 * the registration straight to the academy's admissions WhatsApp.
 */

export function buildWhatsAppUrl(text: string): string {
  return `https://wa.me/${ACADEMY_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

export function buildEnrollmentMessage(p: EnrollmentPayload): string {
  const lines = [
    'Hello Momentum Physics Academy! I would like to register for a course.',
    '',
    `• Student Name: ${p.studentName}`,
    `• Email: ${p.studentEmail}`,
    `• Phone: ${p.studentPhone}`,
  ];
  if (p.parentName) lines.push(`• Parent/Guardian: ${p.parentName}`);
  if (p.parentPhone) lines.push(`• Parent Phone: ${p.parentPhone}`);
  lines.push(
    `• Country: ${p.country}`,
    `• Course: ${p.course}`,
    `• Study Mode: ${p.studyMode}`,
    `• Preferred Batch: ${p.preferredBatch}`,
    `• Payment Method: ${p.paymentMethod}`,
  );
  if (p.notes) lines.push(`• Notes: ${p.notes}`);
  lines.push('', 'Please confirm my registration and send the payment details. Thank you!');
  return lines.join('\n');
}

export function submitEnrollmentViaWhatsApp(formData: EnrollmentFormData): EnrollmentSubmitResult {
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

  // Must run synchronously inside the submit click so popup blockers allow it.
  const opened = window.open(buildWhatsAppUrl(buildEnrollmentMessage(payload)), '_blank', 'noopener');

  if (!opened) {
    return {
      success: false,
      message: 'Your browser blocked the WhatsApp window. Please allow pop-ups for this site and try again.'
    };
  }

  return {
    success: true,
    message: 'WhatsApp opened with your registration details — just press Send!',
    data: payload
  };
}
