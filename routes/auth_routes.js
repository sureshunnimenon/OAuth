const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req,res) => {
    res.render('login');
})

// auth logout
router.get('/logout', (req,res) => {
    // res.send("logging out!"); // delete/commented out after testing
    // handle with passport
    req.logout();
    res.redirect('/');
})

// auth with google
router.get('/google', passport.authenticate('google',{
    scope: ['profile']
}));

// callback route for google for redirecting to

router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    // res.send(`You reachedd the callback URI': ${req.user}`);
    res.redirect('/profile');
})


module.exports = router; 