export const StaffRoles = {
    ADMIN: 'admin',
    STAFF: 'staff'
} as const

export type StaffRoles = (typeof StaffRoles)[keyof typeof StaffRoles] 