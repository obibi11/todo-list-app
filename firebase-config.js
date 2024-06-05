import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCP2ukYNWuSEUxF18SY_OtJSLujGqKfwoA",
    authDomain: "todo-2c798.firebaseapp.com",
    databaseURL: "https://todo-2c798-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "todo-2c798",
    storageBucket: "todo-2c798.appspot.com",
    messagingSenderId: "272784011865",
    appId: "1:272784011865:web:dafe59c012b7ddae353748"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
export { db, auth };