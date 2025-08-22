import { StudentRepository } from "../repositories/studentRepository.js";
import {
    Student,
    CreateStudentRequest,
    UpdateStudentRequest,
    ApiResponse,
} from "../models/studentModel.js";

export class StudentService {
    constructor(private studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }
    async createStudent(request: CreateStudentRequest): Promise<ApiResponse<Student>> {
        try {
            const student = await this.studentRepository.create(request);
            return { success: true, data: student };
        } catch (error) {
            return { success: false, message: "Error creating student" };
        }
    }
    async getAllStudents(): Promise<ApiResponse<Student[]>> {
        try {
            const students = await this.studentRepository.getAll();
            return { success: true, data: students };
        } catch (error) {
            return { success: false, message: "Error fetching students" };
        }
    }
    async getStudentById(id: number): Promise<ApiResponse<Student>> {
        try {
            const student = await this.studentRepository.getById(id);
            if (!student) {
                return { success: false, message: "Student not found" };
            }
            return { success: true, data: student };
        } catch (error) {
            return { success: false, message: "Error retrieving student" };
        }
    }

    async updateStudent(
        id: number,
        request: UpdateStudentRequest
    ): Promise<ApiResponse<Student>> {
        try {
            const updatedStudent = await this.studentRepository.update(id, request);
            if (!updatedStudent) {
                return { success: false, message: "Student not found" };
            }
            return { success: true, data: updatedStudent };
        } catch (error) {
            return { success: false, message: "Error updating student" };
        }
    }

    async deleteStudent(id: number): Promise<ApiResponse<boolean>> {
        try {
            const success = await this.studentRepository.delete(id);
            if (!success) {
                return { success: false, message: "Student not found" };
            }
            return { success: true, data: success };
        } catch (error) {
            return { success: false, message: "Error deleting student" };
        }
    }
}

// // Interface for the data access layer (could be a database or an API)
// interface StudentDataService {
//     getAllStudents(): Promise<Student[]>;
//     getStudentById(id: number): Promise<Student | undefined>;
//     createStudent(student: Omit<Student, 'id'>): Promise<Student>;
//     updateStudent(id: number, student: Omit<Student, 'id'>): Promise<Student>;
//     deleteStudent(id: number): Promise<void>;
// }

// export class StudentService {
//     private studentDataService: StudentDataService; // Dependency

//     constructor(studentDataService: StudentDataService) { // Dependency Injection
//         this.studentDataService = studentDataService;
//     }

//     async getAllStudents(): Promise<Student[]> {
//         return this.studentDataService.getAllStudents();
//     }

//     async getStudentById(id: number): Promise<Student | undefined> {
//         return this.studentDataService.getStudentById(id);
//     }

//     async createStudent(student: Omit<Student, 'id'>): Promise<Student> {
//         return this.studentDataService.createStudent(student);
//     }

//     async updateStudent(id: number, student: Omit<Student, 'id'>): Promise<Student> {
//         return this.studentDataService.updateStudent(id, student);
//     }

//     async deleteStudent(id: number): Promise<void> {
//         return this.studentDataService.deleteStudent(id);
//     }
// }

// // Example implementation using in-memory data (replace with database or API calls)
// export class InMemoryStudentDataService implements StudentDataService {
//     private students: Student[] = [];

//     async getAllStudents(): Promise<Student[]> {
//         return Promise.resolve([...this.students]); // Return a copy
//     }

//     async getStudentById(id: number): Promise<Student | undefined> {
//         return Promise.resolve(this.students.find(s => s.id === id));
//     }

//     async createStudent(student: Omit<Student, 'id'>): Promise<Student> {
//         const newStudent: Student = { id: this.students.length + 1, ...student };
//         this.students.push(newStudent);
//         return Promise.resolve(newStudent);
//     }

//     async updateStudent(id: number, student: Omit<Student, 'id'>): Promise<Student> {
//         const index = this.students.findIndex(s => s.id === id);
//         if (index !== -1) {
//             this.students[index] = { id, ...student };
//             return Promise.resolve(this.students[index]);
//         }
//         return Promise.reject(new Error("Student not found"));
//     }

//     async deleteStudent(id: number): Promise<void> {
//         this.students = this.students.filter(s => s.id !== id);
//         return Promise.resolve();
//     }
// }