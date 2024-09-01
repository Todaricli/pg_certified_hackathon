// Import Prisma Client
import prisma from './database.js';


// Get all users
const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};

// Get user by ID
const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

// Get user by email
const getUserByEmail = async (userEmail) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: userEmail
      },
    });
    return user;
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
};

// Update user by ID
const updateUserById = async (userId, data) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data,
    });
    return updatedUser;
  } catch (error) {
    console.error('Error updating user by ID:', error);
    throw error;
  }
};

const getUserActivities = async (userId) => {
  try {
    const activities = await prisma.activities.findMany({
      where: {
        userId: userId,
      },
    });
    return activities;
  } catch (error) {
    console.error('Error fetching user activities:', error);
    throw error;
  }
};

export default { getAllUsers, getUserActivities, updateUserById, getUserById, getUserByEmail }