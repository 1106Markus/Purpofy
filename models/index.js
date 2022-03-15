const mongoose = require("mongoose");

// export singleton class named MongoDB
class MongoDB {
    static getInstance() {
        if (!MongoDB.instance) {
            MongoDB.instance = new MongoDB();
        }
        return MongoDB.instance;
    }

    constructor() {
        const connectionString = "mongodb+srv://Admin01:SiR0JngY2wkIB0cF@cluster0.bsxtm.mongodb.net/questions";
        console.log("jfdhjfkd", connectionString);

        mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

        this.db = mongoose.connection;
        this.db.on('error', (error) => console.error('Error' + error));
        this.db.once('open', function () {
            console.log('Connected to MongoDB');
        });
    }

    initialize() {
        console.log("Initializing database");
    }
}

module.exports = MongoDB;