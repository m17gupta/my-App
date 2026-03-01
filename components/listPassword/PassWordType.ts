export interface PasswordType {
    id: string;
    title: string;
    user: string;
    type: string;
    icon: any; // Using any for icon name to avoid strict MaterialIcon type issues
    password?: string;
    isShowPassword?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}