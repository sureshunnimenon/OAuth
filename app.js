const express = require('express');
const authRoutes = require('./routes/auth_routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const app = express();
const mongoose = require('mongoose')
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

// set up view engine as ejs
app.set('view engine', 'ejs');

app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys:[keys.session.cookieKwey]
}))

//initialie passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("connected to mongodb");
})

//set up auth routes

app.use('/auth', authRoutes); // uses this route for /auth/xxxx routes 
app.use('/profile', profileRoutes);

// serve the server
app.listen(3000, () => {
    console.log("listening for requests on port 3000");
})

// create home routes

app.get('/', (req, res) => {
    res.render('home', {user: req.user})
})