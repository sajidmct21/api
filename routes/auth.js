import express from 'express';
import { login, register, registerAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

// register a user 
router.post('/register', register);

// register as a admin 
router.post('/register-admin', registerAdmin);

// Login a user
router.post('/login', login);

export default router