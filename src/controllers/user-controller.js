// const UserService = require('../services/user-service');

// const userService = require('../services/user-service'); // ✅ Just use the instance




// const create = async (req, res) => {
//     try {
//         const user = await UserService.create({
//             name: req.body.name,
//             email: req.body.email,
//             password: req.body.password
//         });
//         return res.status(201).json({
//             message: 'User created successfully',
//             data: user,
//             success: true,
//             err:{}
//         });
//     } catch (error) {
//         console.log('Error creating user:', error);
//         return res.status(500).json({
//              message: 'Error creating user',
//              data:{},
//              success: false, 
//              err:error
//              });
//     }
// }
// const signIn = async (req, res) => {
//     try {
        
//         const token = await userService.signIn(req.body.email, req.body.password);
//         return res.status(200).json({
//             message: 'User signed in successfully',
//             data: token,
//             success: true,
//             err:{}
//         });
//     } catch (error) {
//         console.log('Error signing in:', error);
//         return res.status(500).json({
//              message: 'Error signing in',
//              data:{},
//              success: false, 
//              err:error
//              });
//     }
// }


// const isAuthenticated = async (req, res) => {
//     try {
//         const token = req.headers['authorization'];
//         const response = await userService.isAuthenticated(token);
//         return res.status(200).json({
//             message: 'User is authenticated',
//             data: response,
//             success: true,
//             err:{}
//         });
//     } catch (error) {
//         console.log('Error verifying token:', error);
//         return res.status(500).json({
//             message: 'Error verifying token',
//             data: {},
//             success: false,
//             err: error
//         });
//     }
// }
// module.exports = {
//     create,   
//     signIn,
//     isAuthenticated
// };





const { response } = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created a new user',
            data: response,
            err: {}
        });
    } catch (error) {
        // console.log(error);
        return res.status(error.statusCode).json({
            message: error.message,
            data: {},
            success: false,
            err: error.explanation
        });
    }
}

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['x-access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: 'user is authenticated and token is valid'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

const isAdmin = async(req, res) => {
    try {
        const response = await userService.isAdmin(req.body.id);
        return res.status(200).json({
            data: response,
            err: {},
            success: true,
            message: 'Successfully fetched whether user is admin or not'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated,
    isAdmin
}