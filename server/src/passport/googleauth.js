const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const User = require("../utils/models/UserModel.js");
const Stats = require("../utils/models/StatsModel.js");

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);

        const email = profile.emails[0].value;
        const nameParts = profile.displayName.split(' ');

        const newUser = new User({
            googleId: profile.id,
            email,
            firstName: nameParts[0],
            lastName: nameParts.slice(1).join(' '),
            createdVia: 'google'
        });

        await newUser.save();
        const today = new Date();
        const newStats = new Stats({
        email: email,
        netTotalTasks: 0,
        totalTasks: 0,
        tasksCompleted: 0,
        totalTime: 0,
        timeSpend: 0,
        onTimeCompletedTasks: 0,
        focusPerHour: Array(24).fill(0),
        focusPerDay: [],
        focusLastWeek: Array(7).fill(0),
        completedTasks: [],
        startedTasks: [],
        focusPhase: Array(8).fill(0),
        currentDate: today.getDate(),
        currentMonth: today.getMonth() + 1,
        currentYear: today.getFullYear(),
        todaysFocusTime: 0,
        focusSession: 0,
        longestFocusSession: 0
        });
        await newStats.save();

        return done(null, newUser);
    } catch (error) {
        return done(error, null);
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
