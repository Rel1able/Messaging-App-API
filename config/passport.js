require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../services/authQueries");
const bcrypt = require("bcryptjs");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;


passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = await db.getUserByName(payload.username);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
}))

passport.use(
    new LocalStrategy(async (username, password, done) => {
        try {
            const user = await db.getUserByName(username);

            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }
            return done(null, user)
        } catch (err) {
            return done(err);
        }
    })
)



module.exports = passport;