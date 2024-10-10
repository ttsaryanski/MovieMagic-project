import { connect } from 'mongoose';

const LocalDB_URL = 'mongodb://localhost:27017/';
const CloudDB_URL = 'mongodb+srv://SoftUniUser:SoftUniBackEndSeptember2024@softuni.a3ekn.mongodb.net/';

export default async function mongooseInit() {
    try {
        await connect(LocalDB_URL, { dbName: 'MovieMagic'});
    
        console.log('Successfully connect to local DB!');  
    } catch (error) {
        console.log("Failed to connect to local DB!");
        console.log(error.message);

        try {
            await connect(CloudDB_URL, { dbName: 'MovieMagic'});
    
            console.log('Successfully connect to cloud DB!');
        } catch (error) {
            console.log("Failed to connect to cloud DB!");
            console.log(error.message);
        }
    };
};
