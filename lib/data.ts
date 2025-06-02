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
    datetime: new Date("2024-12-20T10:00:00"),
    duration: 30,
    status: "CONFIRMED",
    reason: "Regular checkup",
    notes: "Patient reports feeling well",
    createdAt: new Date("2024-12-01"),
    updatedAt: new Date("2024-12-01"),
  },
  {
    id: "2",
    patientId: "1",
    doctorId: "2",
    datetime: new Date("2024-12-25T14:00:00"),
    duration: 45,
    status: "PENDING",
    reason: "Follow-up consultation",
    createdAt: new Date("2024-12-10"),
    updatedAt: new Date("2024-12-10"),
  },
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
