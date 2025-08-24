// Mock data structure to replace Prisma
export interface User {
  id: string
  email: string
  name: string
  phone?: string
  role: "PATIENT" | "DOCTOR" | "ADMIN"
  avatar?: string
  createdAt: Date
  updatedAt: Date
  // Patient specific fields
  dateOfBirth?: Date
  gender?: "MALE" | "FEMALE" | "OTHER"
  address?: string
  emergencyContact?: string
  // Doctor specific fields
  specialization?: string
  licenseNumber?: string
  experience?: number
  bio?: string
  consultationFee?: number
}

export interface Appointment {
  id: string
  patientId: string
  doctorId: string
  datetime: Date
  duration: number
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED" | "RESCHEDULED"
  reason?: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface MedicalRecord {
  id: string
  patientId: string
  doctorId: string
  visitDate: Date
  diagnosis: string
  symptoms?: string
  treatment?: string
  prescription?: string
  notes?: string
  attachments: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Availability {
  id: string
  doctorId: string
  dayOfWeek: number
  startTime: string
  endTime: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Mock data
export const mockUsers: User[] = [
  {
    id: "1",
    email: "patient@example.com",
    name: "John Doe",
    phone: "+1234567890",
    role: "PATIENT",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    dateOfBirth: new Date("1990-05-15"),
    gender: "MALE",
    address: "123 Main St, City, State 12345",
    emergencyContact: "Jane Doe - +1234567891",
  },
  {
    id: "2",
    email: "doctor@example.com",
    name: "Dr. Sarah Smith",
    phone: "+1234567892",
    role: "DOCTOR",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    specialization: "Cardiology",
    licenseNumber: "MD123456",
    experience: 10,
    bio: "Experienced cardiologist with 10+ years of practice.",
    consultationFee: 200,
  },
  {
    id: "3",
    email: "admin@example.com",
    name: "Admin User",
    phone: "+1234567893",
    role: "ADMIN",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

export const mockAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth(), 15, 10, 0), // Current month, 15th
    duration: 30,
    status: "CONFIRMED",
    reason: "Regular checkup",
    notes: "Patient reports feeling well",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth(), 22, 14, 0), // Current month, 22nd
    duration: 45,
    status: "PENDING",
    reason: "Follow-up consultation",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth(), 28, 9, 0), // Current month, 28th
    duration: 60,
    status: "CONFIRMED",
    reason: "Cardiology consultation",
    notes: "Annual heart health review",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5, 11, 30), // Next month, 5th
    duration: 30,
    status: "COMPLETED",
    reason: "Blood pressure check",
    notes: "BP: 120/80 - Normal range",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 12, 15, 0), // Next month, 12th
    duration: 45,
    status: "PENDING",
    reason: "Lab results review",
    notes: "Review recent blood work",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 18, 8, 0), // Next month, 18th
    duration: 30,
    status: "CONFIRMED",
    reason: "Medication refill",
    notes: "Monthly prescription renewal",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 25, 13, 0), // Next month, 25th
    duration: 60,
    status: "PENDING",
    reason: "Specialist referral",
    notes: "Consultation for chronic condition",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Current and upcoming appointments that will always show on the calendar
  {
    id: "8",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(), // Today
    duration: 30,
    status: "CONFIRMED",
    reason: "Today's appointment",
    notes: "Current day appointment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: 45,
    status: "PENDING",
    reason: "Tomorrow's consultation",
    notes: "Follow-up from last visit",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
    duration: 60,
    status: "CONFIRMED",
    reason: "Specialist consultation",
    notes: "Cardiology review",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "11",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    duration: 30,
    status: "PENDING",
    reason: "Lab work",
    notes: "Blood tests scheduled",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "12",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    duration: 45,
    status: "CONFIRMED",
    reason: "Weekly checkup",
    notes: "Regular health monitoring",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "13",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week from now
    duration: 60,
    status: "PENDING",
    reason: "Monthly review",
    notes: "Comprehensive health assessment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "14",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    duration: 30,
    status: "CONFIRMED",
    reason: "Medication review",
    notes: "Prescription adjustment",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "15",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 2 weeks from now
    duration: 45,
    status: "PENDING",
    reason: "Follow-up appointment",
    notes: "Post-treatment evaluation",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "16",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
    duration: 60,
    status: "CONFIRMED",
    reason: "Quarterly review",
    notes: "Comprehensive health check",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "17",
    patientId: "1",
    doctorId: "2",
    datetime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
    duration: 30,
    status: "PENDING",
    reason: "Annual physical",
    notes: "Yearly health assessment",
    createdAt: new Date(),
    updatedAt: new Date(),
  }
]

export const mockMedicalRecords: MedicalRecord[] = [
  {
    id: "1",
    patientId: "1",
    doctorId: "2",
    visitDate: new Date("2024-11-15"),
    diagnosis: "Hypertension",
    symptoms: "High blood pressure, headaches",
    treatment: "Lifestyle changes, medication",
    prescription: "Lisinopril 10mg daily",
    notes: "Patient advised to monitor blood pressure daily",
    attachments: [],
    createdAt: new Date("2024-11-15"),
    updatedAt: new Date("2024-11-15"),
  },
]

export const mockAvailability: Availability[] = [
  {
    id: "1",
    doctorId: "2",
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "17:00",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    doctorId: "2",
    dayOfWeek: 2, // Tuesday
    startTime: "09:00",
    endTime: "17:00",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
]

// Helper functions to simulate database operations
export function findUserByEmail(email: string): User | undefined {
  return mockUsers.find((user) => user.email === email)
}

export function findUserById(id: string): User | undefined {
  return mockUsers.find((user) => user.id === id)
}

export function findAppointmentsByPatientId(patientId: string): Appointment[] {
  return mockAppointments.filter((apt) => apt.patientId === patientId)
}

export function findAppointmentsByDoctorId(doctorId: string): Appointment[] {
  return mockAppointments.filter((apt) => apt.doctorId === doctorId)
}

export function findMedicalRecordsByPatientId(patientId: string): MedicalRecord[] {
  return mockMedicalRecords.filter((record) => record.patientId === patientId)
}

export function findMedicalRecordsByDoctorId(doctorId: string): MedicalRecord[] {
  return mockMedicalRecords.filter((record) => record.doctorId === doctorId)
}

export function countUsersByRole(role: User["role"]): number {
  return mockUsers.filter((user) => user.role === role).length
}

export function countAppointmentsByStatus(status: Appointment["status"]): number {
  return mockAppointments.filter((apt) => apt.status === status).length
}

export function countAppointmentsByDateRange(startDate: Date, endDate: Date): number {
  return mockAppointments.filter((apt) => apt.datetime >= startDate && apt.datetime <= endDate).length
}
