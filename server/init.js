// Setup database with initial test data.
// Include an admin user.
// Script should take admin credentials as arguments as described in the requirements doc.
const mongoose = require('mongoose');
const Tag = require('./models/tags');
const Answer = require('./models/answers');
const Question = require('./models/questions');

const mongoDB = process.argv[2];

if (!mongoDB.startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid MongoDB URL as the first argument');
    process.exit(1);
}

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

async function createInitialData() {
    try {
        const tags = [
            await new Tag({ name: 'react' }).save(),
            await new Tag({ name: 'javascript' }).save(),
            await new Tag({ name: 'android-studio' }).save(),
            await new Tag({ name: 'shared-preferences' }).save(),
        ];

        const answers = [
            await new Answer({
                text: 'React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
                ans_by: 'hamkalo',
                ans_date_time: new Date()
            }).save(),
            await new Answer({
                text:'On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 
                ans_by:'azad', 
                ans_date_time: new Date()
            }).save(),
            await new Answer({
                text:'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 
                ans_by:'abaya',
                ans_date_time: new Date()
            }).save(),
            await new Answer({
                text:'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 
                ans_by:'alia',
                ans_date_time: new Date()
            }).save(),
            await new Answer({
                text:'I just found all the above examples just too confusing, so I wrote my own. ', 
                ans_by:'sana',
                ans_date_time: new Date()
            }).save(),
        ];

        const questions = [
            await new Question({
                title: 'Sample Question 1',
                text: 'Sample question text here...',
                tags: tags.map(tag => tag._id),
                answers: answers.map(answer => answer._id),
                asked_by: 'user1',
                ask_date_time: new Date()
            }).save(),
            // Add more questions as needed
        ];

        console.log('Database initialized with sample data.');
    } catch (error) {
        console.error('Failed to create initial data:', error);
    } finally {
        db.close();
    }
}

createInitialData();