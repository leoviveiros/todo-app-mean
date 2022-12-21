require('dotenv').config();
const mongo = require('./mongo-connection.js');

describe('Mongo Connection Test Suit', () => {
    
    it('should connect to Mongo', async () => {
        const connection = await mongo.connect();

        await new Promise(resolve => setTimeout(resolve, 500));

        expect(connection).toBeDefined();
        expect(connection.readyState).toBe(1);

        await connection.close();
    });

    it('should disconnect from Mongo', async () => {
        const connection = await mongo.connect();

        await new Promise(resolve => setTimeout(resolve, 500));

        expect(connection).toBeDefined();

        await mongo.disconnect();
        
        expect(connection.readyState).toBe(0);
    });
    
});