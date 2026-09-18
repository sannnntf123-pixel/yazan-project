'use client';

import { useState } from 'react';
import { EnrollmentFormData, EnrollmentFormErrors, EnrollmentPayload } from '@/types';
import { validateEnrollmentForm } from '@/utils/validation';
import { submitEnrollmentViaWhatsApp } from '@/lib/whatsapp';
import { ENROLLMENT_STORAGE_KEY } from '@/config/site';

const initialFormData: EnrollmentFormData = {
  studentName: '',
  studentEmail: '',
  studentPhone: '',
  parentName: '',
  parentPhone: '',
  country: 'Saudi Arabia',
  course: 'AP Physics 1',
  studyMode: 'Group',
  preferredBatch: 'Fall 2026 Regular Cohort (Weekday Evenings)',
  paymentMethod: 'IBAN Bank Transfer',
  notes: ''
};

/**
 * Scroll the first invalid field into view and focus it. Inputs/selects are
 * found by name; button-group fields (studyMode, paymentMethod) by data-field.
 */
function scrollToFirstError(validationErrors: EnrollmentFormErrors) {
  const form = document.querySelector<HTMLFormElement>('#enrollment-form-container form');
  if (!form) return;

  const targets = Object.keys(validationErrors)
    .map((key) => form.querySelector<HTMLElement>(`[name="${key}"], [data-field="${key}"]`))
    .filter((el): el is HTMLElement => el !== null)
    // DOM order, so we land on the topmost invalid field
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

  const first = targets[0];
  if (!first) return;

  first.scrollIntoView({ behavior: 'smooth', block: 'center' });
  if (first instanceof HTMLInputElement || first instanceof HTMLSelectElement || first instanceof HTMLTextAreaElement) {
    first.focus({ preventScroll: true });
  }
}

export function useEnrollmentForm(onSuccessCallback?: (payload: EnrollmentPayload) => void) {
  const [formData, setFormData] = useState<EnrollmentFormData>(initialFormData);
  const [errors, setErrors] = useState<EnrollmentFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionProgress, setSubmissionProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error' | ''; text: string }>({
    type: '',
    text: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field on change
    if (errors[name as keyof EnrollmentFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleStudyModeChange = (mode: 'Group' | 'Private') => {
    setFormData((prev) => ({ ...prev, studyMode: mode }));
    if (errors.studyMode) {
      setErrors((prev) => ({ ...prev, studyMode: undefined }));
    }
  };

  const handlePaymentMethodChange = (method: 'Cash' | 'IBAN Bank Transfer' | 'Online Payment') => {
    if (method === 'Online Payment') return; // coming soon
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
    if (errors.paymentMethod) {
      setErrors((prev) => ({ ...prev, paymentMethod: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Reset status and validate
    setStatusMessage({ type: '', text: '' });
    const { isValid, errors: validationErrors } = validateEnrollmentForm(formData);

    if (!isValid) {
      setErrors(validationErrors);
      setStatusMessage({
        type: 'error',
        text: 'Please correct the highlighted fields before submitting.'
      });
      // Defer past React's commit of the error styles before scrolling
      setTimeout(() => scrollToFirstError(validationErrors), 0);
      return;
    }

    setIsSubmitting(true);
    setSubmissionProgress(50);

    try {
      const result = submitEnrollmentViaWhatsApp(formData);
      setSubmissionProgress(90);

      if (result.success && result.data) {
        setSubmissionProgress(100);
        setStatusMessage({
          type: 'success',
          text: result.message
        });

        // Store submitted registration details in session storage for the success page
        sessionStorage.setItem(ENROLLMENT_STORAGE_KEY, JSON.stringify(result.data));

        if (onSuccessCallback) {
          onSuccessCallback(result.data);
        }
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message || 'An error occurred during submission. Please try again.'
        });
      }
    } catch (err: unknown) {
      console.error('Submission error:', err);
      setStatusMessage({
        type: 'error',
        text: 'Network error submitting registration. Please check your connection or contact support.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmissionProgress(0), 1000);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setStatusMessage({ type: '', text: '' });
  };

  return {
    formData,
    errors,
    isSubmitting,
    submissionProgress,
    statusMessage,
    handleChange,
    handleStudyModeChange,
    handlePaymentMethodChange,
    handleSubmit,
    resetForm,
    setFormData
  };
}
