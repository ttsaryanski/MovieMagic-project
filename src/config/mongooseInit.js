import { connect } from 'mongoose';

const dbUrl = 'mongodb://localhost:27017/catShelter';

export default async function mongooseInit() {
    try {
        await connect(dbUrl);
    
        console.log('Successfully connect to DB!');
        
    } catch (error) {
        console.log("Failed to connect to DB!");
        console.log(error.message);
    };
};