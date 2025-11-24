import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import admin from 'firebase-admin';
import userRouter from "./routes/userRouter";

dotenv.config();

// Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert({
//     projectId: process.env.FIREBASE_PROJECT_ID,
//     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
//     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//   }),
// });

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running with Firebase!' });
});

// Example Router Connection
app.use("/users", userRouter);

// Test Firebase connection
app.get('/test-firebase', async (req, res) => {
  try {
    const db = admin.firestore();
    const testDoc = await db.collection('test').add({
      message: 'Hello from backend!',
      timestamp: new Date(),
    });
    res.json({ success: true, docId: testDoc.id });
  } catch (error) {
    // Type the error properly
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json({ error: errorMessage });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});