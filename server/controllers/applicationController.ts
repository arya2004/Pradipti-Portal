import type { Request, Response } from "express"
import * as applicationService from "../services/application.service"

export const createApplication = async (req: Request, res: Response) => {
  try {
    const applicationData = req.body
    const newApplicationId = await applicationService.createApplication(applicationData)
    res.status(201).json({ id: newApplicationId, message: "Application created successfully" })
  } catch (error) {
    console.error("Error creating application:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await applicationService.getAllApplications()
    res.status(200).json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const applicationId = Number(req.params.id)
    const application = await applicationService.getApplicationById(applicationId)
    if (application) {
      res.status(200).json(application)
    } else {
      res.status(404).json({ error: "Application not found" })
    }
  } catch (error) {
    console.error("Error fetching application:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateApplication = async (req: Request, res: Response) => {
  try {
    const applicationId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await applicationService.updateApplication(applicationId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Application updated successfully" })
    } else {
      res.status(404).json({ error: "Application not found" })
    }
  } catch (error) {
    console.error("Error updating application:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteApplication = async (req: Request, res: Response) => {
  try {
    const applicationId = Number(req.params.id)
    const affectedRows = await applicationService.deleteApplication(applicationId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Application deleted successfully" })
    } else {
      res.status(404).json({ error: "Application not found" })
    }
  } catch (error) {
    console.error("Error deleting application:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

