import { EnrollmentFormData, EnrollmentFormErrors } from '../types/enrollment';

/**
 * Sanitizes input string to prevent XSS and malformed payloads
 */
export function sanitizeInput(str: string): string {
  if (!str) return '';
  return str
    .replace(/<[^>]*>?/gm, '') // Remove HTML tags
    .trim();
}

/**
 * Email format validator
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Phone number format validator (accepts international numbers with digits, +, spaces, hyphens)
 */
export function isValidPhone(phone: string): boolean {
  const phoneClean = phone.replace(/[\s\-\(\)]/g, '');
  const phoneRegex = /^\+?[0-9]{7,15}$/;
  return phoneRegex.test(phoneClean);
}

/**
 * Validates entire enrollment form data
 */
export function validateEnrollmentForm(data: EnrollmentFormData): { isValid: boolean; errors: EnrollmentFormErrors } {
  const errors: EnrollmentFormErrors = {};

  // Student Full Name
  const cleanName = sanitizeInput(data.studentName);
  if (!cleanName) {
    errors.studentName = 'Student full name is required.';
  } else if (cleanName.length < 3) {
    errors.studentName = 'Name must be at least 3 characters long.';
  }

  // Student Email
  if (!data.studentEmail) {
    errors.studentEmail = 'Student email address is required.';
  } else if (!isValidEmail(data.studentEmail)) {
    errors.studentEmail = 'Please enter a valid email address (e.g. student@example.com).';
  }

  // Student Phone
  if (!data.studentPhone) {
    errors.studentPhone = 'Student phone number is required.';
  } else if (!isValidPhone(data.studentPhone)) {
    errors.studentPhone = 'Please enter a valid phone number with country code.';
  }

  // Country
  if (!data.country) {
    errors.country = 'Please select your country of residence.';
  }

  // Course
  if (!data.course) {
    errors.course = 'Please select a course curriculum.';
  }

  // Study Mode
  if (!data.studyMode) {
    errors.studyMode = 'Please select a study mode (Group or Private).';
  }

  // Preferred Batch
  if (!data.preferredBatch) {
    errors.preferredBatch = 'Please select your preferred batch schedule.';
  }

  // Payment Method
  if (!data.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method.';
  } else if (data.paymentMethod === 'Online Payment') {
    errors.paymentMethod = 'Online Payment is coming soon. Please select IBAN or Cash for now.';
  }

  // Optional Parent Phone validation if provided
  if (data.parentPhone && data.parentPhone.trim() && !isValidPhone(data.parentPhone)) {
    errors.parentPhone = 'Parent phone number format is invalid.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
