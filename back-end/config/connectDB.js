const mongoose = require('mongoose');


async function connectDatabase () {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@dream-it-jobs.a81y6a7.mongodb.net`);
        console.log("Connect MongoDB successfully !!!");
        
    }
    catch(error)
    {
        console.log(error);
        console.log("Connect MongoDB Fail !!!");
        console.log(process.env.DB_PASSWORD)
    }
}

module.exports = connectDatabase;