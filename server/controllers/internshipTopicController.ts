import type { Request, Response } from "express"
import * as internshipTopicService from "../services/internshipTopic.service"

export const createInternshipTopic = async (req: Request, res: Response) => {
  try {
    const topicData = req.body
    const newTopicId = await internshipTopicService.createInternshipTopic(topicData)
    res.status(201).json({ id: newTopicId, message: "Internship topic created successfully" })
  } catch (error) {
    console.error("Error creating internship topic:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAllInternshipTopics = async (req: Request, res: Response) => {
  try {
    const topics = await internshipTopicService.getAllInternshipTopics()
    res.status(200).json(topics)
  } catch (error) {
    console.error("Error fetching internship topics:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getInternshipTopicById = async (req: Request, res: Response) => {
  try {
    const topicId = Number(req.params.id)
    const topic = await internshipTopicService.getInternshipTopicById(topicId)
    if (topic) {
      res.status(200).json(topic)
    } else {
      res.status(404).json({ error: "Internship topic not found" })
    }
  } catch (error) {
    console.error("Error fetching internship topic:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const updateInternshipTopic = async (req: Request, res: Response) => {
  try {
    const topicId = Number(req.params.id)
    const updateData = req.body
    const affectedRows = await internshipTopicService.updateInternshipTopic(topicId, updateData)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Internship topic updated successfully" })
    } else {
      res.status(404).json({ error: "Internship topic not found" })
    }
  } catch (error) {
    console.error("Error updating internship topic:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteInternshipTopic = async (req: Request, res: Response) => {
  try {
    const topicId = Number(req.params.id)
    const affectedRows = await internshipTopicService.deleteInternshipTopic(topicId)
    if (affectedRows > 0) {
      res.status(200).json({ message: "Internship topic deleted successfully" })
    } else {
      res.status(404).json({ error: "Internship topic not found" })
    }
  } catch (error) {
    console.error("Error deleting internship topic:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

