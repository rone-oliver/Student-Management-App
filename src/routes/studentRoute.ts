import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent,
} from "../controllers/studentController.js";

const router = express.Router();

router.get('/',(req:Request,res:Response)=>{
    // const __dirname = path.dirname(new URL(import.meta.url).pathname);
    // const filePath = path.resolve(__dirname, '../../Frontend/index.html'); // Create an absolute path
    const __dirname = path.dirname(fileURLToPath(import.meta.url)); // Get correct directory path
    const filePath = path.resolve(__dirname, '../../Frontend/index.html');
    res.sendFile(filePath);
})
router.post('/api/students',createStudent);
router.get('/api/students',getAllStudents);
router.get('/api/students/:id',getStudentById);
router.put('/api/students/:id',updateStudent);
router.delete('/api/students/:id',deleteStudent);

export default router;