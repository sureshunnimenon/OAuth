const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done)=>{
    done(null,user.id)
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        done(null,user)
    })
    
});

passport.use(new GoogleStrategy({
    // options for the strategy
            callbackURL: '/auth/google/redirect',
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret
        }, (accessToken, refreshToken, profile, done) => {
            //passport callback function
                // console.log("callback function");
                // console.log(profile);
                //check if user already exists
                User.findOne({googleId: profile.id}).then((currentUser)=>{
                    if(currentUser){
                        // already user exists
                        console.log("user is ", currentUser);
                        done(null, currentUser);
                    }
                    else {
                        //create user in our db
                        new User({
                            username: profile.displayName,
                            googleId: profile.id,
                            thumbnail: profile._json.image.url
                        }).save().then((newUser)=>{
                            console.log(`'new user created: ${newUser}`);
                            done(null, newUser);
                        })                    
                    }
                }  )              
            })
    )

