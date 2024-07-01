import mongoose from "mongoose";
import { Project } from "../models/project.js";

export const createProject = async (req, res) => {
  const userId = req.user.userId;
  try {
    const project = new Project({
      author: userId,
      ...req.body,
    });
    await project.save();
    res.status(201).json({ project });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getAllProjects = async (req, res) => {
  const userId = req.user.userId;

  try {
    const projects = await Project.find({ author: userId });
    res.status(200).json({ projects });
  } catch (error) {
    restart.status(404).json({ message: error.message });
  }
};
export const updateProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.status(200).send(project);
  } catch (err) {
    res.status(400).send(err);
  }
};
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "id non conforme con mongo" });
  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      return res.status(404).send("Project not found");
    }
    res.status(200).send("Project deleted");
  } catch (err) {
    res.status(400).send(err);
  }
};
