const mongoose = require('mongoose');



const connection = async() =>{

    let url = 'mongodb://127.0.0.1:27017/notes';

    try {
        
        await mongoose.connect(url);

        console.log("mongoose connected to DB");

    } catch (error) {
        console.log(error);
    }
};


module.exports = connection;