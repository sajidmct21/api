import express from 'express';
import Role from '../models/Role.js';

const router = express.Router();

router.get('/',(req, res)=>{});

// Create a new role in DB
router.post('/create',async (req,res, next)=>{
    try {
        if(req.body.role && req.body.role !== ''){
            const newRole = new Role(req.body);
            await newRole.save();
            return res.send('Role is created');
        }
        else{
            return res.status(400).send('Bad Request');
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error');
    }
});

router.get('/:id', (req, res)=>{});
router.put('/:id', (req, res)=>{});
router.delete('/:id', (req, res)=>{});

export default router;