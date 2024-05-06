    // Application server
    const express = require('express');
    const mongoose = require('mongoose');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    const morgan = require('morgan');

    const app = express();
    const PORT = process.env.PORT || 8000;
    const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/fake_stackoverflow";

    app.use(cors());
    app.use(bodyParser.json());
    app.use(morgan("tiny"));

    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("MongoDB connected successfully"))
        .catch(err => console.error("MongoDB connection error:", err));

    // Define routes here
    app.get("/", (req, res) => {
        res.send("Server is running.");
    });

    // More route definitions...

    app.use((req, res, next) => {
        res.status(404).send("Sorry can't find that!");
    });

    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    });

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });