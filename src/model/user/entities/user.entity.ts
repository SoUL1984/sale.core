import { $Enums, user } from '@prisma/client';

export class UserEntity implements user {
    id: number;
    email: string;
    password: string;
    active: boolean;
    role: $Enums.UserRole;
    createdAt: Date;
    updatedAt: Date;
}
