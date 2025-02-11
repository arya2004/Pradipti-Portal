import type { Request, Response } from "express"
import * as institutionService from "../services/institution.service"

export const createInstitution = async (req: Request, res: Response) => {
  try {
    const institutionData = req.body
    const newInstitutionId = await institutionService.createInstitution(institutionData)
    res.status(201).json({ id: newInstitutionId, message: "Institution created successfully" })
  } catch (error) {
    console.error("Error creating institution:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllInstitutions = async (req: Request, res: Response) => {
  try {
    const institutions = await institutionService.getAllInstitutions()
    res.status(200).json(institutions)
  } catch (error) {
    console.error("Error fetching institutions:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getInstitutionById = async (req: Request, res: Response) => {
  try {
    const institutionId = Number(req.params.id)
    const institution = await institutionService.getInstitutionById(institutionId)
    if (institution) {
      res.status(200).json(institution)
    } else {
      res.status(404).json({ error: "Institution not found" })
    }
  } catch (error) {
    console.error("Error fetching institution:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateInstitution = async (req: Request, res: Response) => {
  try {
    const institutionId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await institutionService.updateInstitution(institutionId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Institution updated successfully" })
    } else {
      res.status(404).json({ error: "Institution not found" })
    }
  } catch (error) {
    console.error("Error updating institution:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteInstitution = async (req: Request, res: Response) => {
  try {
    const institutionId = Number(req.params.id)
    const affectedRows = await institutionService.deleteInstitution(institutionId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Institution deleted successfully" })
    } else {
      res.status(404).json({ error: "Institution not found" })
    }
  } catch (error) {
    console.error("Error deleting institution:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

