import { Router } from 'express';
import petsDb from '../../db/petsDb.js'; 

const petRoutes = Router();


petRoutes.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const pet = await petsDb.getPetById(parseInt(id, 10)); // Ensure ID is treated as an integer

    if (!pet) {
      return res.status(404).send(`Pet with ID ${id} not found.`);
    }

    return res.status(200).json(pet);
  } catch (error) {
    console.error('Error fetching pet by ID:', error.message);
    return res.status(500).send('Unable to fetch pet. Please try again later.');
  }
});

// Route to handle /pets (without ID parameter)
petRoutes.get('/', async (req, res) => {
  try {
    const pets = await petsDb.getAllPets();
    return res.status(200).json(pets);
  } catch (error) {
    console.error('Error fetching all pets:', error.message);
    return res.status(500).send('Unable to fetch pets. Please try again later.');
  }
});

export default petRoutes;
