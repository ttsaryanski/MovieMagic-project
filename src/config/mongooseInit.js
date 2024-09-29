import { connect } from 'mongoose';

const LocalDB_URL = 'mongodb://localhost:27017';
const CloudDB_URL = process.env.DB_URL;

export default async function mongooseInit() {
    try {
        await connect(CloudDB_URL, { dbName: 'MovieMagic'});
    
        console.log('Successfully connect to DB!');
        
    } catch (error) {
        console.log("Failed to connect to DB!");
        console.log(error.message);
    };
};
