import express from 'express';
import { createRole, deleteRole, getAllRole, updateRole } from '../controllers/role.controller.js';

const router = express.Router();

router.get('/',(req, res)=>{});

// Create a new role in DB
router.post('/create', createRole);

// Update role in DB 
router.put('/update/:id', updateRole);

// Get all roles
router.get('/getAll', getAllRole)

// Delete a role
router.delete('/deleteRole/:id', deleteRole);

router.get('/:id', (req, res)=>{});

export default router;