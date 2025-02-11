import type { Request, Response } from "express"
import * as mouService from "../services/mou.service"

export const createMOU = async (req: Request, res: Response) => {
  try {
    const mouData = req.body
    const newMOUId = await mouService.createMOU(mouData)
    res.status(201).json({ id: newMOUId, message: "MOU created successfully" })
  } catch (error) {
    console.error("Error creating MOU:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllMOUs = async (req: Request, res: Response) => {
  try {
    const mous = await mouService.getAllMOUs()
    res.status(200).json(mous)
  } catch (error) {
    console.error("Error fetching MOUs:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getMOUById = async (req: Request, res: Response) => {
  try {
    const mouId = Number(req.params.id)
    const mou = await mouService.getMOUById(mouId)
    if (mou) {
      res.status(200).json(mou)
    } else {
      res.status(404).json({ error: "MOU not found" })
    }
  } catch (error) {
    console.error("Error fetching MOU:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateMOU = async (req: Request, res: Response) => {
  try {
    const mouId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await mouService.updateMOU(mouId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "MOU updated successfully" })
    } else {
      res.status(404).json({ error: "MOU not found" })
    }
  } catch (error) {
    console.error("Error updating MOU:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteMOU = async (req: Request, res: Response) => {
  try {
    const mouId = Number(req.params.id)
    const affectedRows = await mouService.deleteMOU(mouId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "MOU deleted successfully" })
    } else {
      res.status(404).json({ error: "MOU not found" })
    }
  } catch (error) {
    console.error("Error deleting MOU:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

