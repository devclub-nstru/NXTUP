const mongoose = require('mongoose')

async function connectDB(){
    try{
        await mongoose.connect("mongodb+srv://udit:udituditudit@cluster0.mmib2.mongodb.net/MERADB?retryWrites=true&w=majority&appName=Cluster0")
        console.log('Successfully connected to the database');
    }
    catch(error){
        console.error('Error connecting to the database:', error);
    }
}


connectDB();
