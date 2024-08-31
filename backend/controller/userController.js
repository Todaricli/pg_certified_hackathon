// Import required modules
import express from 'express';
import { getAllUsers, getUserById, getUserByEmail, updateUserById, getUserActivities } from './database.js'; // Adjust the import path as needed

const router = express.Router();

// Route to get all users
const getAllUsersController =  async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};

// Route to get a user by ID
const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(Number(id));
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

// Route to get a user by email
const getUserByEmailController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

// Route to update a user by ID
const updateUserInfoController = async (req, res) => {
  const { id } = req.params;
  const data = req.body; // Make sure your middleware handles JSON parsing
  try {
    const updatedUser = await updateUserById(Number(id), data);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user by ID:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

// Route to get user's activities by user ID
const getUserActivitiesController = async (req, res) => {
  const { id } = req.params;
  try {
    const activities = await getUserActivities(Number(id));
    res.json(activities);
  } catch (error) {
    console.error('Error fetching user activities:', error);
    res.status(500).json({ error: 'An error occurred while fetching user activities.' });
  }
};

// Export the router
export default {getAllUsersController, getUserActivitiesController, getUserByEmailController, getUserByIdController, updateUserInfoController};
