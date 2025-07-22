// controller/contactController.js

import { ContactModel } from '../models/Contact.js';

// Create Contact
export const createContact = async (req, res) => {
  const { name, email, phone, address } = req.body;

  if (!name || !email || !phone || !address) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    const existing = await ContactModel.findOne({
      email,
      postedBy: req.user._id,
    });

    if (existing) {
      return res
        .status(409)
        .json({ success: false, message: 'Contact already exists for this user' });
    }

    // Save contact
    const contact = await ContactModel.create({
      name,
      email,
      phone,
      address,
      postedBy: req.user._id,
    });

    res.status(201).json({ success: true, contact });
  } catch (error) {
    console.error('Contact Error:', error);
    res.status(500).json({ success: false, message: 'Server error while creating contact' });
  }
};

// Fetch Contacts
export const getContact = async (req, res) => {
  try {
    const contacts = await ContactModel.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    console.error('Fetch Contacts Error:', error);
    res.status(500).json({ success: false, message: 'Unable to retrieve contacts' });
  }
};
