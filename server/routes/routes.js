// routes/routes.js

import express from 'express';
import { body } from 'express-validator';
import { Register, Login, Auth } from '../controller/userController.js';
import { createContact, getContact } from '../controller/contactController.js';
import { VerifyUser } from '../middleware/VerifyUser.js';


const router = express.Router();


// Register Route
router.post(
  '/register',
  [
    body('name', 'Name is required').notEmpty(),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  ],
  Register
);

// Login Route
router.post(
  '/login',
  [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password is required').notEmpty(),
  ],
  Login
);

// Verify Route (Protected)
router.get('/verify', VerifyUser, Auth);


// Create a new contact
router.post('/add-contact', VerifyUser, createContact);

// Get all contacts
router.get('/contact', VerifyUser, getContact);

export { router };
