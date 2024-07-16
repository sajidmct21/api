import express from 'express';
import { getAllUsers, getUserByID } from '../controllers/user.controller.js';
import { verifyAdmin, verifyUser } from '../utils/verfyToken.js';

const router = express.Router();


router.get('/',verifyAdmin, getAllUsers)

router.get('/:id',verifyUser, getUserByID )

export default router;