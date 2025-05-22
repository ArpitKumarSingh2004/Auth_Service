// const UserRepository = require('../repository/user-repository');

// class UserService {
//     constructor() {
//         this.userRepository = new UserRepository;
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
// }

// module.exports = new UserService();
const userRepository = require('../repository/user-repository'); // ✅ lowercase: it's an instance

class UserService {
    constructor() {
        this.userRepository = userRepository; // ✅ already an instance
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
}

module.exports = new UserService();
