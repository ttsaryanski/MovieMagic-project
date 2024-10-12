import { connect } from 'mongoose';

import { LocalDB_URL, CloudDB_URL } from './constans.js';

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
