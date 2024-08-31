// Import required modules
import express from 'express';
import petControllers from '../../controller/petController.js'; // Adjust the import path as needed

const {
  getAllPetsController,
  getPetByIdController,
  getPetByNameController,
  createPetController,
  getPetsByUserIdController
} = petControllers

const petRoute = express.Router();

// Define routes for pets
petRoute.get('/pets', getAllPetsController);
petRoute.get('/pets/:id', getPetByIdController);
petRoute.get('/pet-user/:userId', getPetsByUserIdController);
petRoute.post('/pets/name', getPetByNameController);
petRoute.post('/pets', createPetController);

// Export the router
export default petRoute;
