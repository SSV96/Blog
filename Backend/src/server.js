import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import admin from 'firebase-admin';
import express from 'express';
import router from './routes/blog.route.js';
import { log } from 'console';
import mongoose from 'mongoose';
import cors from 'cors';

const credentails = JSON.parse(fs.readFileSync('./credentials.json'));

admin.initializeApp({ credential: admin.credential.cert(credentails) });

mongoose.set('strictQuery', true);
const app = express();
// When ever it receives a request that has json body , its going to parse that and autmatically available to us on request.body
const CONNECTION_STRING = process.env.ATLAS;
app.use(cors());
app.use(express.json());
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
        } catch (error) {
            return res.sendStatus(400);
        }
    }
    req.user = req.user || {};
    next();
})
app.use('/api/', router);
app.listen(8000, () => {
    mongoose.connect(CONNECTION_STRING, () => log('Db connected'));
    console.log("Server is Listening on port 8000");
});