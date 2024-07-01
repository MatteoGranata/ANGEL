import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(404).json({ status: 'error', message: 'utente/password errata' });
  if (await bcryptjs.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET);
    return res.json({ status: 'ok', data: token.split(' ')[0], user: user });
  }
  res.status(404).json({ status: 'error', message: 'utente/password non trovati' });
};
export const register = async (req, res) => {
  const { username, password, email } = req.body;
  //  controllo username
  if (!username || typeof username != 'string') {
    return res.json({ status: 'error', message: 'username non valido' });
  }
  // controllo pasword
  if (!password || typeof password != 'string') {
    return res.json({ status: 'error', message: 'password non valida' });
  }
  if (password.length < 5) {
    return res.json({ status: 'error', message: 'password troppo corta' });
  }
  // controllo email
  if (!email || typeof email != 'string') {
    return res.json({ status: 'error', message: 'email non valida' });
  }
  // Controllo se l'username esiste già
  const existingUser = await User.findOne({ username: username });
  if (existingUser) {
    return res.status(409).json({ status: 'error', message: 'username occupato' });
  }
  // Controllo se l'email esiste già
  const existingEmail = await User.findOne({ email: email });
  if (existingEmail) {
    return res.status(409).json({ status: 'error', message: 'email già registrata' });
  }
  const passwordHashed = await bcryptjs.hash(password, 10);
  const user = new User({
    username: username,
    password: passwordHashed,
    email: email,
  });
  try {
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ status: 'okay', token: token });
  } catch (error) {
    res.status(409).json({ status: 'error', message: error.message });
  }
};
