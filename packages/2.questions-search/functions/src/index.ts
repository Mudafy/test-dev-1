import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import * as express from 'express';
import * as cors from 'cors';

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

var serviceAccount = "./serviceAccountKey.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://questions-search.firebaseio.com"
});

app.get('/questions', async (req, res) => {
    const questions = await admin.firestore().collection('questions').get();
    res.send(questions.docs.map(q => q.data()));
});

// Expose Express API as a single Cloud Function:
exports.questions_search = functions.https.onRequest(app);
