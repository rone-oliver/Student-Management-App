export interface Student {
    id: number; // Or string if using UUIDs
    name: string;
    course: string;
    age: number;
}

export interface CreateStudentRequest {
    name: string;
    course: string;
    age: number;
}

export interface UpdateStudentRequest {
    name?: string;
    age?: number;
    course?: string;
}

export interface ApiResponse<T>{
    success: boolean;
    data?: T;
    message?: string;
}