import type { Request, Response } from "express"
import * as stationService from "../services/station.service"

export const createStation = async (req: Request, res: Response) => {
  try {
    const stationData = req.body
    const newStationId = await stationService.createStation(stationData)
    res.status(201).json({ id: newStationId, message: "Station created successfully" })
  } catch (error) {
    console.error("Error creating station:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllStations = async (req: Request, res: Response) => {
  try {
    const stations = await stationService.getAllStations()
    res.status(200).json(stations)
  } catch (error) {
    console.error("Error fetching stations:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getStationById = async (req: Request, res: Response) => {
  try {
    const stationId = Number(req.params.id)
    const station = await stationService.getStationById(stationId)
    if (station) {
      res.status(200).json(station)
    } else {
      res.status(404).json({ error: "Station not found" })
    }
  } catch (error) {
    console.error("Error fetching station:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateStation = async (req: Request, res: Response) => {
  try {
    const stationId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await stationService.updateStation(stationId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Station updated successfully" })
    } else {
      res.status(404).json({ error: "Station not found" })
    }
  } catch (error) {
    console.error("Error updating station:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteStation = async (req: Request, res: Response) => {
  try {
    const stationId = Number(req.params.id)
    const affectedRows = await stationService.deleteStation(stationId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Station deleted successfully" })
    } else {
      res.status(404).json({ error: "Station not found" })
    }
  } catch (error) {
    console.error("Error deleting station:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

