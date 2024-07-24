const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL || "http://localhost:3010/users/auth/google/callback";
const User = require('../models/userModel.js'); // Adjust the path to your User model

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  passReqToCallback: true
},
async (req, accessToken, refreshToken, profile, done) => {
    try {
      console.log(profile, "profile");
      let user = await User.findOne({ googleId: profile.id });
  
      if (!user) {
        const existingUser = await User.findOne({ email: profile.emails[0].value });
  
        if (req.query.state === 'login') {
          // Trying to log in but user does not exist
          if (existingUser) {
            return done(null, existingUser); // If email exists, log the user in
          }
          return done(null, false, { message: 'User not found, please sign up first' });
        }
  
        if (req.query.state === 'signup') {
          // Proceed with the signup process
          if (existingUser) {
            return done(null, false, { message: 'Email already registered, please log in instead' });
          }
          user = new User({
            googleId: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            image: profile.photos[0].value
          });
          await user.save();
        }
      }
  
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  }));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
