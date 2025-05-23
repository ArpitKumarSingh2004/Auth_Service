// const {User} = require('../models/index');

// class UserRepository {

//     async create(data) {
//         try {
//             const user = await User.create(data);
//             return user;
//         } catch (error) {
//             console.log('Error creating user:');
//             throw error;
//         }
//     }

//     async destroy(id) {
//         try {
//             const user = await User.destroy({ where: { id } });
//             return user;
//         } catch (error) {
//             console.log('Error deleting user:');
//             throw error;
//         }
//     }
// }

// module.exports = UserRepository();


// src/repository/user-repository.js
const { User } = require('../models/index');

class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      console.log('Error creating user:');
      throw error;
    }
  }

  async destroy(id) {
    try {
      const user = await User.destroy({ where: { id } });
      return user;
    } catch (error) {
      console.log('Error deleting user:');
      throw error;
    }
  }

  async getById(userId) {
    try {
      const user = await User.findByPk(userId,{
        attributes: ['email','id' ]// Exclude password from the result
      });
      return user;
    } catch (error) {
      console.log('Error fetching user by ID:');
      throw error;
    }
  }

}

module.exports = UserRepository; // ✅ Export the class
