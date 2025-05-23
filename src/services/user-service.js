

// const jwt = require('jsonwebtoken');
// const userRepository = require('../repository/user-repository'); // ✅ lowercase: it's an instance
// const { JWT_KEY } = require('../config/serverConfig'); // ✅ lowercase: it's a constant
// class UserService {
//     constructor() {
//         this.userRepository = userRepository; // ✅ already an instance
//     }

//     async create(data) {
//         try {
//             const user = await this.userRepository.create(data);
//             return user;
//         } catch (error) {
//             console.log('Error creating user:');
//             throw error;
//         }
//     }

//     async destroy(id) {
//         try {
//             const user = await this.userRepository.destroy(id);
//             return user;
//         } catch (error) {
//             console.log('Error deleting user:');
//             throw error;
//         }
//     }
//     createToken(user) {
//         try {
//             const result = jwt.sign(user,JWT_KEY, {
//                 expiresIn: '1h',
//             });
//             return result;
//         } catch (error) {
//             console.log('Error generating token:');
//             throw error;
//         }
//     }
//     verifyToken(token) {
//         try {
//             const result = jwt.verify(token, JWT_KEY);
//             return result;
//         } catch (error) {
//             console.log('Error verifying token:');
//             throw error;
//         }
//     }
// }

// module.exports = new UserService();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');

class UserService {
    constructor() {
        this.userRepository = userRepository;
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log('Error creating user:');
            throw error;
        }
    }

    async destroy(id) {
        try {
            const user = await this.userRepository.destroy(id);
            return user;
        } catch (error) {
            console.log('Error deleting user:');
            throw error;
        }
    }
    async signIn(email,plainPassword){
        try {
            const user = await this.userRepository.getByEmail(email);
            if (!user) {
                throw new Error('User not found');
            }
            const isPasswordValid = this.checkPassword(plainPassword, user.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const newJWT = this.createToken({email:user.email,id:user.id});
            return newJWT;
        } catch (error) {
            console.log('Error signing in:');
            throw error;
        }
    }
    async isAuthenticated(token) {
        try {
            const user = await this.verifyToken(token);
            if (!user) {
                throw new Error('Invalid token');
            }
            const userData = await this.userRepository.getById(user.id);
            if (!userData) {
                throw new Error('User not found');
            }
            return userData.id;
        } catch (error) {
            console.log('Error verifying token:');
            throw error;
        }
    }
        

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {
                expiresIn: '1h',
            });
            return result;
        } catch (error) {
            console.log('Error generating token:');
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log('Error verifying token:');
            throw error;
        }
    }
    checkPassword(userInputPlainPasswords,encryptedPasswords){
        try {
            const result = bcrypt.compareSync(userInputPlainPasswords,encryptedPasswords);
            return result;
        } catch (error) {
            console.log('Error verifying password:');
            throw error;
        }
       
    }
    isAdmin(userId){
        try {
            const user = this.userRepository.getById(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user.isAdmin;
        } catch (error) {
            console.log('Error verifying isAdmin:');
            throw error;
        }
    }
}

module.exports = UserService; // ✅ Exporting the class, not the instance
