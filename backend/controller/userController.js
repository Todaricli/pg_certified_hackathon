// Import required modules
import userDb from '../db/userDb.js';

const { getAllUsers, getUserById, getUserByEmail, updateUserById, getUserActivities } = userDb;


// Route to get all users
const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    const usersObj = JSON.stringify(users, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );
    res.json(JSON.parse(usersObj)); // JSON.parse to convert the string back to JSON format
  } catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
};

// Route to get a user by ID
const getUserByIdController = async (req, res) => {
  const { userId } = req.params

  try {
    const user = await getUserById(Number(userId));

    console.log(user)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const usersObj = JSON.stringify(user, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

    res.json(JSON.parse(usersObj));
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

    const usersObj = JSON.stringify(user, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    );

    res.json(JSON.parse(usersObj));

  } catch (error) {
    console.error('Error fetching user by email:', error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
};

// Route to update a user by ID
const updateUserInfoController = async (req, res) => {
  const data = req.body; // Assumes your middleware handles JSON parsing

  try {
    // Validate and sanitize input data
    const allowedFields = ['id', 'email', 'name', 'password', 'username', 'muscleMass', 'muscleMassTrend', 'stress', 'stressDesc', 'heartRateResting', 'heartRateAverage'];
    const sanitizedData = {};

    const id = data['id'];
    
    for (const key in data) {
      if (allowedFields.includes(key)) {
        sanitizedData[key] = data[key];
      }
    }

    // Convert fields to appropriate types if necessary
    if (sanitizedData.muscleMass) {
      sanitizedData.muscleMass = Number(sanitizedData.muscleMass);
    }

    if (sanitizedData.stress) {
      sanitizedData.stress = Number(sanitizedData.stress);
    }

    if (sanitizedData.heartRateResting) {
      sanitizedData.heartRateResting = Number(sanitizedData.heartRateResting);
    }

    if (sanitizedData.heartRateAverage) {
      sanitizedData.heartRateAverage = Number(sanitizedData.heartRateAverage);
    }

    // Proceed with the update operation
    const updatedUser = await updateUserById(Number(id), sanitizedData);

    if (updatedUser) {
      // Convert BigInt values to strings to prevent JSON.stringify errors
      const userWithoutBigInt = JSON.parse(JSON.stringify(updatedUser, (key, value) => 
        typeof value === 'bigint' ? value.toString() : value
      ));
      
      res.json(userWithoutBigInt);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
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
export default { getAllUsersController, getUserActivitiesController, getUserByEmailController, getUserByIdController, updateUserInfoController };
