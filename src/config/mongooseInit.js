import { connect } from 'mongoose';

const CloudDB_URL = '${{ secrets.DATABASE_URL }}';

export default async function mongooseInit() {
    try {
        await connect(CloudDB_URL, { dbName: 'MovieMagic'});
    
        console.log('Successfully connect to DB!');
        
    } catch (error) {
        console.log("Failed to connect to DB!");
        console.log(error.message);
    };
};
