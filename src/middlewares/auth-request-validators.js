// const validateUserSignup = (req, res, next) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         return res.status(400).json({
//             message: 'All fields are required',
//             data: {},
//             success: false,
//             err: {}
//         });
//     }
//     next();
// }
// module.exports = {
//     validateUserAuth
// }





// const validateUserSignup = (req, res, next) => {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//         return res.status(400).json({
//             message: 'All fields are required',
//             data: {},
//             success: false,
//             err: {}
//         });
//     }
//     next();
// };

// module.exports = {
//     validateUserSignup,
//     validateUserAuth // ✅ corrected export
// };


const validateUserSignup = (req, res, next) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required',
            data: {},
            success: false,
            err: {}
        });
    }
    next();
};

const validateUserAuth = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required',
            data: {},
            success: false,
            err: {}
        });
    }
    next();
};

module.exports = {
    validateUserSignup,
    validateUserAuth // ✅ now it's defined AND exported
};
