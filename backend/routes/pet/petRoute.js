// Import required modules
import express from 'express';
import {
  getAllPetsController,
  getPetByIdController,
  getPetByNameController,
  createPetController,
  getPetsByUserIdController
} from './petControllers.js'; // Adjust the import path as needed

const petRoute = express.Router();

// Define routes for pets
petRoute.get('/pets', getAllPetsController);
petRoute.get('/pets/:id', getPetByIdController);
petRoute.get('/pet-user/:userId', getPetsByUserIdController);
petRoute.post('/pets/name', getPetByNameController);
petRoute.post('/pets', createPetController);

// Export the router
export default petRoute;
