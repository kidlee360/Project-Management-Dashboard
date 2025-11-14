// /lib/passport.js (Conceptual Setup)

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import db from '@/lib/db'; // Your database connector

// --- 1. Serialization/Deserialization (REQUIRED for req.login) ---
passport.serializeUser((user: any, done: any) => {
    // Save user ID to session
    done(null, user.id); 
});

passport.deserializeUser(async (id: any, done: any) => {
    try {
        // Fetch user from DB using the ID stored in the session
        const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
        done(null, result.rows[0]);
    } catch (err) {
        done(err);
    }
});

// --- 2. Google Strategy Setup ---
passport.use(
    new GoogleStrategy({
        // Get these from Google Developer Console (APIs & Services -> Credentials)
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        // This MUST match the redirect URI you registered in the Google Console
        callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/api/auth/google/callback',
        scope: ['profile', 'email'],
    },
    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
        const googleId = profile.id;
        const email = profile.emails?.[0]?.value;
        const displayName = profile.displayName;

        try {
            // 1. Check if user already exists in your database by Google ID or Email
            let userResult = await db.query(
                "SELECT * FROM users WHERE google_id = $1 OR email = $2", 
                [googleId, email]
            );
            
            let user = userResult.rows[0];

            if (user) {
                // User exists: Log them in
                return done(null, user);
            } else {
                // User does not exist: Create a new account
                const newUserResult = await db.query(
                    "INSERT INTO users (username, email, google_id) VALUES ($1, $2, $3) RETURNING *",
                    [displayName || email, email, googleId]
                );
                user = newUserResult.rows[0];
                return done(null, user); // Log in the new user
            }
        } catch (err) {
            return done(err);
        }
    })
);

export default passport;