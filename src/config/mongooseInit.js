import { connect } from 'mongoose';

const LocalDB_URL = 'mongodb://localhost:27017/';
const CloudDB_URL = 'mongodb+srv://SoftUniUser:SoftUniBackEndSeptember2024@softuni.a3ekn.mongodb.net/';

export default async function mongooseInit() {
    try {
        await connect(LocalDB_URL, { dbName: 'MovieMagic'});
    
        console.log('Successfully connect to DB!');
        
    } catch (error) {
        console.log("Failed to connect to DB!");
        console.log(error.message);
    };
};
