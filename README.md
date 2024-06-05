
# To-Do List App

This is a simple To-Do List application built with HTML, CSS, JavaScript, and Firebase for authentication and database management.

## Technologies Used

- HTML
- CSS
- JavaScript
- Firebase (Authentication and Realtime Database)

## Setup Instructions

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your machine.
- Firebase project set up with Email/Password Authentication enabled.

### Installation

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/obibi11/todo-list-app.git

2. Navigate to the project directory:
    ```bash
    cd todo-list-app
    
3. Install live-server globally to serve the application locally:
    ```bash
    npm install -g live-server
    
4. Open the project directory in your code editor.

5. Create a file named firebase-config.js in the js directory with your Firebase configuration:
    ```bash
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
    import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
    import { getDatabase } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

    const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db = getDatabase(app);
    export { db, auth };

6. Replace the placeholder values in the firebase-config.js file with your actual Firebase project configuration values.

### Running the Application
   
7. Start the live server to serve the application:
   ```bash
   live-server
   http://127.0.0.1:8080.

