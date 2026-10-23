import type { StaffRoles } from "./staff.roles.ts"

export type Staff = {
    id: Number,
    name: String,
    username: String,
    password: String,
    status: Boolean,
    role: StaffRoles
}

export type StaffCreate = Omit<Staff, 'id' | 'status'>
export type StaffUpdate = Partial<StaffCreate>