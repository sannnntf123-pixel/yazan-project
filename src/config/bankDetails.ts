import { BankDetails } from '../types/enrollment';

/** Academy admissions WhatsApp number in international format (no "+"): +961 76 688 522 */
export const ACADEMY_WHATSAPP = '96176688522';

export const BANK_DETAILS: BankDetails = {
  bankName: 'Al Rajhi Bank',
  accountName: 'Momentum Physics Academy',
  iban: 'SA37 1000 0011 1003 7585 5900',
  swiftCode: 'RJHISARI',
  currency: 'SAR',
  stcPayNumber: '+966 59 762 1520',
  whatsappContact: ACADEMY_WHATSAPP
};

export const AVAILABLE_COURSES = [
  'AP Physics 1',
  'AP Physics 2',
  'AP Physics C: Mechanics',
  'AP Physics C: Electricity & Magnetism',
  'Tahsili Physics',
  'Other Physics Curriculum'
];

export const STUDY_MODES = [
  { id: 'Group', label: 'Group Course', desc: 'Interactive cohorts with peer problem-solving' },
  { id: 'Private', label: 'Private 1-on-1', desc: 'Customized pace and dedicated personal tutor' }
] as const;

export const PAYMENT_METHODS = [
  { id: 'IBAN Bank Transfer', label: 'IBAN Bank Transfer', desc: 'Direct transfer to Al Rajhi Bank account', status: 'available' },
  { id: 'Cash', label: 'Cash Payment', desc: 'In-person / arranged cash payment', status: 'available' },
  { id: 'Online Payment', label: 'Online Payment (Credit / Debit)', desc: 'Instant gateway integration coming soon', status: 'coming_soon' }
] as const;

export const PREFERRED_BATCHES = [
  'Fall 2026 Regular Cohort (Weekday Evenings)',
  'Weekend Intensive Masterclass (Fri / Sat)',
  'Fast-Track Exam Booster (3 Weeks)',
  'Flexible Schedule (Private Sessions Only)',
  'Immediate Start (Current Cohort)'
];

export const COUNTRIES_LIST = [
  'Saudi Arabia',
  'United Arab Emirates',
  'Qatar',
  'Kuwait',
  'Bahrain',
  'Oman',
  'Egypt',
  'Jordan',
  'United States',
  'United Kingdom',
  'Canada',
  'Other Country'
];
