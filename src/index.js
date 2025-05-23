const express = require('express');
const bodyParser = require('body-parser');
const{PORT} = require('./config/serverConfig');

const apiRoutes = require('./routes/index');

const db = require('./models/index');



// const {User} = require('./models/index');
// const bcrypt = require('bcrypt');

const UserRepository = require('./repository/user-repository');

const app = express();
const prepareAndStartServer=()=>{
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use('/api',apiRoutes);

app.listen(PORT,async() => {
    console.log(`Server Started on port ${PORT}`);
    if(process.env.DB_SYNC){
db.sequelize.sync({alter:true});
    }
    // const service = new UserService();
    // const newToken = service.createToken({email:'arpit@admin.com',id:1});
    
});
}

prepareAndStartServer();