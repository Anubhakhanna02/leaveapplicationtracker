import express from 'express';
import {
  submitLeave,
  getAllLeaves,
  updateLeave,
  deleteLeave
} from '../controllers/leaveController.js';

const router = express.Router();

router.post('/leave', submitLeave);            
router.get('/getleave', getAllLeaves);           
router.put('/updateleave/:id', updateLeave);        
router.delete('/deleteleave/:id', deleteLeave);      

export default router;
