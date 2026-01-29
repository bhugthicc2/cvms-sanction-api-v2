const admin = require("firebase-admin");

console.log("Initializing Firebase with environment variables...");
console.log("Project ID:", process.env.FIREBASE_PROJECT_ID ? "Found" : "Missing");
console.log("Client Email:", process.env.FIREBASE_CLIENT_EMAIL ? "Found" : "Missing");
console.log("Private Key:", process.env.FIREBASE_PRIVATE_KEY ? "Found" : "Missing");

// Handle private key formatting for different environments
let privateKey = process.env.FIREBASE_PRIVATE_KEY;
if (privateKey) {
  // Replace literal \n with actual newlines
  privateKey = privateKey.replace(/\\n/g, '\n');
  // Remove any quotes that might have been added
  privateKey = privateKey.replace(/^"|"$/g, '');
}

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: privateKey,
};

console.log("Service account configured, initializing Firebase...");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();
  console.log("Firebase initialized successfully");

  module.exports = { admin, db };
} catch (error) {
  console.error("Firebase initialization failed:", error);
  console.error("Service account details:", {
    projectId: serviceAccount.projectId,
    clientEmail: serviceAccount.clientEmail,
    privateKeyLength: serviceAccount.privateKey?.length || 0,
    privateKeyStart: serviceAccount.privateKey?.substring(0, 20) + "..."
  });
  throw error;
}
