

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
}

module.exports = UserService; // ✅ Exporting the class, not the instance
