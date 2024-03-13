export type User = {
    id: string;
    name: string;
    email: string;
    role: UserRoles;
}

export type UserRoles = 'admin' | 'qa' | 'developer'