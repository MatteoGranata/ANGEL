import mongoose from "mongoose";
import { Timer } from "../models/timer.js";

export const createTimer = async (req, res) => {
  const { nome, tempo, intervallo } = req.body;
  const userId = req.user.userId;
  try {
    const timer = new Timer({
      author: userId,
      nome,
      tempo,
      attivo: false,
      intervallo,
    });
    await timer.save();
    res.status(201).json({ timer });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
export const getTimer = async (req, res) => {
  const userId = req.user.userId;
  try {
    const timers = await Timer.find({ author: userId });
    res.status(200).json({ timers });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const startTimer = async (req, res) => {
  const { id } = req.params;
  const timer = await Timer.findById(id);
  if (!timer) {
    return res.status(404).send("Cronometro non trovato");
  }
  timer.attivo = true;
  await timer.save();
  res.json(timer);
};
export const stopTimer = async (req, res) => {
  const { id } = req.params;
  const timer = await Timer.findById(id);
  if (!timer) {
    return res.status(404).send("Cronometro non trovato");
  }
  timer.attivo = false;
  await timer.save();
  res.json(timer);
};
export const resetTimer = async (req, res) => {
  const { id } = req.params;
  //   const userId = req.res.userId;
  try {
    const timer = await Timer.findById(id);
    if (!timer) {
      return res.status(404).send("Cronometro non trovato");
    }
    timer.tempo = 0;
    await timer.save();
    res.status(200).json({ message: "timer resettato correttamente" });
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};
