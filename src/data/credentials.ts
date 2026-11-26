export interface Certification {
  id: string;
  title: string;
  issuer: string | null;
  verifyUrl: string | null;
  certificateImage: string | null;
}

export const certifications: Certification[] = [
  {
    id: 'oci-ai-foundations',
    title: 'Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate',
    issuer: 'Oracle',
    verifyUrl: '/certificates/eCertificate.pdf',
    certificateImage: '/certificates/eCertificate.pdf',
  },
  {
    id: 'google-data-analytics',
    title: 'Google Data Analytics Capstone',
    issuer: 'Coursera',
    verifyUrl: 'https://coursera.org/verify/FW8X98P0IVS7',
    certificateImage: '/certificates/Google Data Analytics Capstone.pdf',
  },
  {
    id: 'microsoft-business-analytics',
    title: 'Business Analytics with Excel',
    issuer: 'Microsoft',
    verifyUrl: '/certificates/Business Analytics with Excel By Microsoft.pdf',
    certificateImage: '/certificates/Business Analytics with Excel By Microsoft.pdf',
  },
  {
    id: 'ibm-data-science',
    title: 'What is Data Science',
    issuer: 'Coursera',
    verifyUrl: 'https://coursera.org/verify/C1RY55OGK04Q',
    certificateImage: '/certificates/Data Science By IBM.pdf',
  },
  {
    id: 'Constitution Day Quiz 2026_Certificate',
    title: 'Constitution Day Quiz 2026_Certificate',
    issuer: 'MyBharat',
    verifyUrl: '/certificates/Constitution Day Quiz 2026_Certificate_Srimanta Bag.png',
    certificateImage: '/certificates/Constitution Day Quiz 2026_Certificate_Srimanta Bag.png',
  },
  {
    id: 'python-django',
    title: 'Python and Django Certifications',
    issuer: null,
    verifyUrl: 'https://ude.my/UC-2c0b3cc2-6e7f-4f16-8da2-49ba8b7a24bf',
    certificateImage: '/certificates/Python and Django Framework for Beginners Complete Course.pdf',
  },
];
