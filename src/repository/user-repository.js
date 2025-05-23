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
const { User, Role } = require('../models/index');

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
  async getByEmail(userEmail) {
    try {
      const user = await User.findOne({ where: { email: userEmail } });
      return user;
    } catch (error) {
      console.log('Error fetching user by email:');
      throw error;
    }
  }

  async isAdmin(userId) {
    try{
      const user=await User.findOne({
        where:{id:userId},
        include:[{
          model:Role,
          attributes:['name'],
          where:{
            name:'admin'
          }
        }]
      });
    }
    catch(error){
      console.log('Error checking if user is admin:');
      throw error;
    }
  }
}

module.exports = UserRepository; // ✅ Export the class
