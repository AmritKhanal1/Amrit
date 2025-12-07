// ===== 1. Firebase SDK Imports ===== 
import { 
    initializeApp 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";

import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    sendEmailVerification 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

// ===== 2. Firebase Configuration & Initialization =====
const firebaseConfig = {
    apiKey: "AIzaSyBOcn0cbiBx1jfrZAG4DdAj-W63-6YJDVE",
    authDomain: "shikshaflow-auth.firebaseapp.com",
    projectId: "shikshaflow-auth",
    storageBucket: "shikshaflow-auth.firebasestorage.app",
    messagingSenderId: "730477172186",
    appId: "1:730477172186:web:00b8d401928a89ac35dce3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== 3. Get DOM elements =====
const signupBtn = document.getElementById('signup-btn');
const signinBtn = document.getElementById('signin-btn');

const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');

const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');

// ===== 4. Error Display Elements =====
const signupError = document.createElement('p');
signupError.style.color = 'red';
signupError.style.fontSize = '14px';
signupEmail.parentNode.insertBefore(signupError, signupPassword.nextSibling);

const signinError = document.createElement('p');
signinError.style.color = 'red';
signinError.style.fontSize = '14px';
signinEmail.parentNode.insertBefore(signinError, signinPassword.nextSibling);


// ===== 5. SIGN UP (with email verification) =====
signupBtn.addEventListener('click', () => {
    const email = signupEmail.value.trim();
    const password = signupPassword.value.trim();

    signupError.textContent = "";
    signupError.style.color = "red";

    if (!email || !password) {
        signupError.textContent = "Please fill in all fields.";
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            // Send verification link
            sendEmailVerification(user)
                .then(() => {
                    signupError.style.color = 'green';
                    signupError.textContent = 
                        `Account created! Verification email sent to ${user.email}.`;

                    signupEmail.value = "";
                    signupPassword.value = "";
                })
                .catch((error) => {
                    signupError.textContent = "Error sending verification email: " + error.message;
                });
        })
        .catch((error) => {
            signupError.style.color = 'red';
            signupError.textContent = error.message;
        });
});


// ===== 6. SIGN IN (block if email not verified) =====
signinBtn.addEventListener('click', () => {
    const email = signinEmail.value.trim();
    const password = signinPassword.value.trim();

    signinError.textContent = "";
    signinError.style.color = "red";

    if (!email || !password) {
        signinError.textContent = "Please fill in all fields.";
        return;
    }

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;

            if (!user.emailVerified) {
                signinError.style.color = "red";
                signinError.textContent = "Please verify your email before logging in!";
                auth.signOut();
                return;
            }

            // SUCCESS LOGIN
            signinError.style.color = "green";
            signinError.textContent = `Logged in as ${user.email}`;

            signinEmail.value = "";
            signinPassword.value = "";

            // Redirect if needed
            // window.location.href = "dashboard.html";
        })
        .catch((error) => {
            signinError.style.color = "red";
            signinError.textContent = error.message;
        });
});
