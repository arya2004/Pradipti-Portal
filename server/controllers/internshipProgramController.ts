import type { Request, Response } from "express"
import * as internshipProgramService from "../services/internshipProgram.service"

export const createInternshipProgram = async (req: Request, res: Response) => {
  try {
    const programData = req.body
    const newProgramId = await internshipProgramService.createInternshipProgram(programData)
    res.status(201).json({ id: newProgramId, message: "Internship program created successfully" })
  } catch (error) {
    console.error("Error creating internship program:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllInternshipPrograms = async (req: Request, res: Response) => {
  try {
    const programs = await internshipProgramService.getAllInternshipPrograms()
    res.status(200).json(programs)
  } catch (error) {
    console.error("Error fetching internship programs:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getInternshipProgramById = async (req: Request, res: Response) => {
  try {
    const programId = Number(req.params.id)
    const program = await internshipProgramService.getInternshipProgramById(programId)
    if (program) {
      res.status(200).json(program)
    } else {
      res.status(404).json({ error: "Internship program not found" })
    }
  } catch (error) {
    console.error("Error fetching internship program:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateInternshipProgram = async (req: Request, res: Response) => {
  try {
    const programId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await internshipProgramService.updateInternshipProgram(programId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Internship program updated successfully" })
    } else {
      res.status(404).json({ error: "Internship program not found" })
    }
  } catch (error) {
    console.error("Error updating internship program:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteInternshipProgram = async (req: Request, res: Response) => {
  try {
    const programId = Number(req.params.id)
    const affectedRows = await internshipProgramService.deleteInternshipProgram(programId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Internship program deleted successfully" })
    } else {
      res.status(404).json({ error: "Internship program not found" })
    }
  } catch (error) {
    console.error("Error deleting internship program:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

