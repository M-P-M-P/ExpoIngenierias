// controllers/UserController.js
import { PersonModel, StudentModel, AdminModel } from "../models/UserModel.js";
import  sequelize  from "../database/db.js";
import ProjectModel from "../models/ProjectModel.js";

// export const getUsers = async (req, res) => {
//   try {
//     const persons = await PersonModel.findAll();
//     const students = await StudentModel.findAll();
//     const admins = await AdminModel.findAll();

//     const allUsers = {
//       persons,
//       students,
//       admins
//     };

//     res.json(allUsers);

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// }

export const getUsers = async (req, res) => {
  try {

    // Fetch all users concurrently
    const [persons, students, admins] = await Promise.all([
      PersonModel.findAll(),
      StudentModel.findAll(),
      AdminModel.findAll()
    ]);

    const transformedPersons = persons.map(person => ({
      id: person.id,
      name: `${person.name} ${person.lastName}`,
      roles: ["Profesor", "Juez"],
      email: person.email || ""
    }));

    const transformedStudents = students.map(student => ({
      id: student.id,
      name: `${student.name} ${student.lastName}`,
      roles: ["Alumno"],
      enrollment: student.enrollment || ""
    }));

    const transformedAdmins = admins.map(admin => ({
      id: admin.id,
      name: `${admin.name} ${admin.lastName}`,
      roles: ["Administrador"],
      email: admin.email || ""
    }));

    const allUsers = [
      ...transformedPersons,
      ...transformedStudents,
      ...transformedAdmins
    ];

    res.json(allUsers);

  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: 'Internal server error while fetching users.' });
  }
}


// New function to update user details
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, enrollment } = req.body;

  try {
    // Find the user in the Person, Student, or Admin models
    let user = await PersonModel.findByPk(id);
    if (!user) {
      user = await StudentModel.findByPk(id);
    }
    if (!user) {
      user = await AdminModel.findByPk(id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's information
    if (name) {
      const [firstName, lastName] = name.split(' ');
      user.name = firstName || user.name;
      user.lastName = lastName || user.lastName;
    }
    if (user.enrollment) { // Check if user is a student and enrollment is provided
      user.enrollment = enrollment;
    } else if (email) { // Update email for non-student users
      user.email = email;
    }

    // Save the changes
    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: 'Internal server error while updating user.' });
  }
}


export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log(`Fetching user with ID: ${id}`); // Log for debugging
    let user = await PersonModel.findByPk(id);
    if (!user) {
      user = await StudentModel.findByPk(id);
    }
    if (!user) {
      user = await AdminModel.findByPk(id);
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    let userData = {
      id: user.id,
      name: `${user.name} ${user.lastName}`,
    };

    // Check if the user is a student and include enrollment if so
    if (user instanceof StudentModel) {
      userData.enrollment = user.enrollment;
    } else {
      userData.email = user.email;
    }

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: 'Internal server error while fetching user.' });
  }
}


export const updatePersonId = async (req, res) => {
    let transaction;
    try {
        // Validate input data
        if (!req.body.newId || !req.body.name || !req.body.lastName || !req.body.email) {
            return res.status(400).json({ message: "Please provide all required fields: newId, name, lastName, email" });
        }

        // Start a transaction
        transaction = await sequelize.transaction();

        // Create a new record with the updated id
        const newPerson = await PersonModel.create({
            id: req.body.newId,
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email
        }, { transaction });

        // Update the child records in the projects table to reference the new id
        await ProjectModel.update(
            { id_responsable: req.body.newId },
            { where: { id_responsable: req.params.id }, transaction }
        );

        // Delete the old person record
        await PersonModel.destroy({
            where: { id: req.params.id },
            transaction
        });

        // Commit the transaction
        await transaction.commit();

        res.json({
            message: "Record updated successfully",
            newPerson
        });
    } catch (error) {
        // Rollback the transaction if an error occurs
        if (transaction) await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};

export const updateStudentId = async (req, res) => {
    let transaction;
    try {
        // Validate input data
        if (!req.body.newId || !req.body.name || !req.body.lastName || !req.body.enrollment) {
            return res.status(400).json({ message: "Please provide all required fields: newId, name, lastName, enrollment" });
        }

        // Start a transaction
        transaction = await sequelize.transaction();

        // Create a new record with the updated id
        const newStudent = await StudentModel.create({
            id: req.body.newId,
            name: req.body.name,
            lastName: req.body.lastName,
            enrollment: req.body.enrollment
        }, { transaction });

        // Update the child records in the projects table to reference the new id
        await ProjectModel.update(
            { id_lider: req.body.newId },
            { where: { id_lider: req.params.id }, transaction }
        );

        // Delete the old student record
        await StudentModel.destroy({
            where: { id: req.params.id },
            transaction
        });

        // Commit the transaction
        await transaction.commit();

        res.json({
            message: "Record updated successfully",
            newStudent
        });
    } catch (error) {
        // Rollback the transaction if an error occurs
        if (transaction) await transaction.rollback();
        res.status(500).json({ message: error.message });
    }
};



export const deletePerson = async (req, res) => {
  try {
      await PersonModel.destroy({ 
          where: { id : req.params.id }
      })
      res.json({
          "message":"¡Registro eliminado correctamente!"
      })
  } catch (error) {
      res.json( {message: error.message} )
  }
}