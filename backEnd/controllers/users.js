import mongoose from "mongoose"
import { User } from "../models/user.js"

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        restart.status(404).json({ message: error.message })
    }
}
export const getUserByID = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'id non conforme con mongo' })
    try {
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const insertUser = async (req, res) => {
    const newUser = new User(req.body)

    try {
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}
export const deleteUserByID = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'id non conforme con mongo' })
    try {
        await User.findByIdAndDelete(id)
        res.status(200).json({ message: 'utente eliminato con successo' })
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}
export const updateUserByID = async (req, res) => {
    const { id } = req.params
    const data = { ...req.body }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'id non conforme con mongo' })
    try {
        const user = await User.findByIdAndUpdate(id, data,{new: true})
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}