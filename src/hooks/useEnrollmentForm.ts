'use client';

import { useState } from 'react';
import { EnrollmentFormData, EnrollmentFormErrors, EnrollmentPayload } from '../types/enrollment';
import { validateEnrollmentForm } from '../utils/validation';
import { submitEnrollmentViaWhatsApp } from '../services/whatsapp';

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
        sessionStorage.setItem('latest_enrollment_registration', JSON.stringify(result.data));

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
