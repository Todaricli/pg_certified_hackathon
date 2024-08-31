async function getAllPets() {
    try {
        return await prisma.pet.findMany();
    } catch (error) {
        console.error('Error fetching all pets:', error);
        throw new Error('Unable to fetch pets. Please try again later.');
    }
}

async function getPetById(id) {
    try {
        const pet = await prisma.pet.findUnique({
            where: { id: id }
        });

        if (!pet) {
            throw new Error(`Pet with ID ${id} not found.`);
        }

        return pet;
    } catch (error) {
        console.error('Error fetching pet by ID:', error);
        throw new Error('Unable to fetch pet. Please try again later.');
    }
}

async function getPetByName(name) {
    try {
        const pet = await prisma.pet.findUnique({
            where: { name: name }
        });

        if (!pet) {
            throw new Error(`Pet with name "${name}" not found.`);
        }

        return pet;
    } catch (error) {
        console.error('Error fetching pet by name:', error);
        throw new Error('Unable to fetch pet. Please try again later.');
    }
}

async function createPet(name, hp, exp, level, strength, health) {
    try {
        return await prisma.pet.create({
            data: {
                name: name,
                hp: hp,
                exp: exp,
                level: level,
                strength: strength,
                health: health
            }
        });
    } catch (error) {
        console.error('Error creating pet:', error);
        throw new Error('Unable to create pet. Please try again later.');
    }
}

export default {getAllPets, getPetById, getPetByName, createPet}
