const passport = require('passport');
const {printd} = require('lee-simple-log')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const User = require('../models/user');

module.exports = () => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
  }, async (accessToken, refreshToken, profile, done) => {
    
    try {
      const exUser = await User.findOne({
        where: { email: profile.email },
      });
      if (exUser) {
        User.update({
          accessToken: accessToken,
          refreshToken:refreshToken
        },{
          where:{ email: profile.email }
        })
        done(null, exUser);
      } else {
        const newUser = await User.create({
          email: profile.email,
          nick: profile.family_name + " "+ profile.given_name,
          accessToken: accessToken,
          refreshToken: refreshToken
        });
        done(null, newUser);
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};
