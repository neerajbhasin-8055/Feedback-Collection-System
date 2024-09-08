// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Feedback = require('./models/Feedback');
// const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3001;
// const USer = require('./models/User');
const User = require('./models/User');
const jwt = require('jsonwebtoken');
// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/fdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// Routes
// app.use('/api/auth', authRoutes);
app.post('/api/register', async(req,res)=>{
    const {name , email , password} = req.body;
    try {
        const user = new User({name , email , password});
        await user.save();
        res.status(201).json({message : "User created successfully"});
    } catch (error) {
        res.status(400).json({'message' : 'Error Registering User'})
    }
})

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send('Invalid credentials');
        }
        const token = jwt.sign({ userId: user._id }, 'e08485ecd8c3cca75bce3f9629', { expiresIn: '7d' });
        res.json({ token, name:user.name});
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});


app.post('/submit-feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        const userName = req.body.name;

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Feedback Submitted</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body class="bg-gray-100 flex justify-center items-center min-h-screen">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                        <h1 class="text-2xl font-bold mb-4">Thank You, ${userName}!</h1>
                        <p class="text-gray-700 mb-4">Your feedback has been received successfully. We appreciate your input!</p>
                        <a href="/" class="text-blue-500 hover:underline">Go back to the form</a>
                    </div>
                </body>
            </html>
        `);
    } catch (err) {
        res.status(500).send(`
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Error</title>
                    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
                </head>
                <body class="bg-gray-100 flex justify-center items-center min-h-screen">
                    <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                        <h1 class="text-2xl font-bold mb-4">Oops!</h1>
                        <p class="text-gray-700 mb-4">There was an error saving your feedback. Please try again.</p>
                        <a href="/" class="text-blue-500 hover:underline">Go back to the form</a>
                    </div>
                </body>
            </html>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
