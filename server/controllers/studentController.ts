import type { Request, Response } from "express"
import * as studentService from "../services/student.service"

export const createStudent = async (req: Request, res: Response) => {
  try {
    const studentData = req.body
    const newStudentId = await studentService.createStudent(studentData)
    res.status(201).json({ id: newStudentId, message: "Student created successfully" })
  } catch (error) {
    console.error("Error creating student:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllStudents = async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents()
    res.status(200).json(students)
  } catch (error) {
    console.error("Error fetching students:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.id)
    const student = await studentService.getStudentById(studentId)
    if (student) {
      res.status(200).json(student)
    } else {
      res.status(404).json({ error: "Student not found" })
    }
  } catch (error) {
    console.error("Error fetching student:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await studentService.updateStudent(studentId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Student updated successfully" })
    } else {
      res.status(404).json({ error: "Student not found" })
    }
  } catch (error) {
    console.error("Error updating student:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.id)
    const affectedRows = await studentService.deleteStudent(studentId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Student deleted successfully" })
    } else {
      res.status(404).json({ error: "Student not found" })
    }
  } catch (error) {
    console.error("Error deleting student:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

