// Import required modules
import petsDb from '../db/petsDb.js'; // Adjust the import path as needed
const { getAllPets, getPetById, getPetByName, createPet, getPetsByUserId } = petsDb

// Controller to get all pets
const getAllPetsController = async (req, res) => {
  try {
    const pets = await getAllPets();
    res.json(pets);
  } catch (error) {
    console.error('Error fetching all pets:', error);
    res.status(500).json({ error: 'An error occurred while fetching pets.' });
  }
};

// Controller to get a pet by ID
const getPetByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const pet = await getPetById(Number(id));
    res.json(pet);
  } catch (error) {
    console.error('Error fetching pet by ID:', error);
    res.status(404).json({ error: error.message || 'An error occurred while fetching the pet.' });
  }
};

// Controller to get a pet by name
const getPetByNameController = async (req, res) => {
  const { name } = req.body;
  try {
    const pet = await getPetByName(name);
    res.json(pet);
  } catch (error) {
    console.error('Error fetching pet by name:', error);
    res.status(404).json({ error: error.message || 'An error occurred while fetching the pet.' });
  }
};

// Controller to create a new pet
const createPetController = async (req, res) => {
  const { name, hp, exp, level, strength, health } = req.body;
  try {
    const newPet = await createPet(name, hp, exp, level, strength, health);
    res.status(201).json(newPet);
  } catch (error) {
    console.error('Error creating pet:', error);
    res.status(500).json({ error: 'An error occurred while creating the pet.' });
  }
};

// Controller to get pets by user ID
const getPetsByUserIdController = async (req, res) => {
  const { id } = req.params; // Extract userId from request parameters

  try {
    // Call the database function to get pets by user ID
    const pets = await getPetsByUserId(Number(id));

    // If pets are found, return them in the response
    if (pets.length > 0) {
      res.json(pets);
    } else {
      // If no pets are found, return a 404 error
      res.status(404).json({ error: 'No pets found for this user.' });
    }
  } catch (error) {
    console.error('Error fetching pets by user ID:', error);
    // Return a 500 status code with an error message
    res.status(500).json({ error: 'An error occurred while fetching pets for the specified user.' });
  }
};


// Export the controllers
export default {
  getAllPetsController,
  getPetByIdController,
  getPetByNameController,
  createPetController,
  getPetsByUserIdController
};
