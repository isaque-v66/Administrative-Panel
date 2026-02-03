export interface User {
  id: string
  name: string
  email: string
  role: "Admin" | "Editor" | "Viewer"
  status: "Active" | "Inactive" | "Pending"
  department: string
  createdAt: string
  lastLogin: string | null
  avatar?: string
}

export type UserFormData = Omit<User, "id" | "createdAt" | "lastLogin">
