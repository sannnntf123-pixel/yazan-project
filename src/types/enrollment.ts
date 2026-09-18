export type StudyMode = 'Group' | 'Private';

export type PaymentMethod = 'Cash' | 'IBAN Bank Transfer' | 'Online Payment';

export type EnrollmentStatus = 'Pending Payment' | 'Paid' | 'Cancelled';

export interface EnrollmentFormData {
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  parentName?: string;
  parentPhone?: string;
  country: string;
  course: string;
  studyMode: StudyMode;
  preferredBatch: string;
  paymentMethod: PaymentMethod;
  notes?: string;
}

export interface EnrollmentPayload extends EnrollmentFormData {
  timestamp: string;
  status: EnrollmentStatus;
}

export interface EnrollmentFormErrors {
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  parentPhone?: string;
  country?: string;
  course?: string;
  studyMode?: string;
  preferredBatch?: string;
  paymentMethod?: string;
  general?: string;
}

export interface EnrollmentSubmitResult {
  success: boolean;
  message: string;
  data?: EnrollmentPayload;
  isMockFallback?: boolean;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  iban: string;
  swiftCode: string;
  currency: string;
  stcPayNumber: string;
  whatsappContact: string;
}
