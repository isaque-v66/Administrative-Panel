export interface User {
  id: string
  name: string
  email: string
  role: "ADMIN" | "EDITOR" | "VIEWER"
  status: "ACTIVE" | "INACTIVE" | "PENDING"
  departments:
    | "ENGINEERING"
    | "MARKETING"
    | "SALES"
    | "PRODUCT"
    | "DESIGN"
    | "FINANCE"
    | "OPERATIONS"
    | "HR"
  createdAt: Date
  lastLogin: string | null
  avatar?: string
}


export type UserFormData = Omit<
  User,
  "id" | "createdAt" | "lastLogin"
>