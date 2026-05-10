// Your Firebase config

const firebaseConfig = {

apiKey: "AIzaSyBOQCsCkyRBL4lG5M-A_mycfc3TxC02LFc",

authDomain: "ai-resume-assistant-b677a.firebaseapp.com",

projectId: "ai-resume-assistant-b677a",

storageBucket: "ai-resume-assistant-b677a.firebasestorage.app",

messagingSenderId: "145270869824",

appId: "1:145270869824:web:45d51269c2e36db9b034a5"

};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

// Initialize services

const db = firebase.firestore();

const auth = firebase.auth();