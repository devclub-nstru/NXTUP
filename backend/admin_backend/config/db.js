const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect(process.env.KEY)
        console.log('Successfully connected to the database');
    }
    catch(error){
        console.error('Error connecting to the database:', error);
    }
}


connectDB();
