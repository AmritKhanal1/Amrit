import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBOcn0cbiBx1jfrZAG4DdAj-W63-6YJDVE",
    authDomain: "shikshaflow-auth.firebaseapp.com",
    projectId: "shikshaflow-auth",
    storageBucket: "shikshaflow-auth.firebasestorage.app",
    messagingSenderId: "730477172186",
    appId: "1:730477172186:web:00b8d401928a89ac35dce3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const forgotForm = document.getElementById('forgotForm');
const forgotEmail = document.getElementById('forgot-email');
const forgotError = document.getElementById('forgotError');

forgotForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = forgotEmail.value.trim();

    forgotError.textContent = '';
    forgotError.style.color = 'red';

    if (!email) {
        forgotError.textContent = "Please enter your registered email.";
        return;
    }

    sendPasswordResetEmail(auth, email)
        .then(() => {
            // SECURITY BEST PRACTICE:
            // Always show success even if email not registered.
            forgotError.style.color = 'green';
            forgotError.textContent = 
                "If this email is registered, a password reset link has been sent.";
            forgotEmail.value = '';
        })
        .catch((error) => {
            console.error("Password reset error:", error);

            if (error.code === "auth/invalid-email") {
                forgotError.textContent = "Invalid email format. Please try again.";
            } else {
                // Still do not reveal whether account exists
                forgotError.style.color = 'green';
                forgotError.textContent = 
                    "If this email is registered, a password reset link has been sent.";
            }
        });
});
