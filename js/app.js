import { db, auth } from '../firebase-config.js';
import { ref, set, push, onValue, remove, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Реєстрація та вхід
document.getElementById('register-btn').addEventListener('click', registerUser);
document.getElementById('login-btn').addEventListener('click', loginUser);
document.getElementById('logout-btn').addEventListener('click', logoutUser);
document.getElementById('show-login').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});
document.getElementById('show-register').addEventListener('click', () => {
    document.getElementById('register-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
});

function registerUser() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const phone = document.getElementById('register-phone').value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            set(ref(db, 'users/' + user.uid), {
                email: email,
                phone: phone
            });
            alert('User registered successfully!');
            document.getElementById('register-form').reset();
            showTodoContainer();
        })
        .catch((error) => {
            alert(error.message);
        });
}

function loginUser() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert('User logged in successfully!');
            document.getElementById('login-form').reset();
            showTodoContainer();
        })
        .catch((error) => {
            alert(error.message);
        });
}

function logoutUser() {
    signOut(auth).then(() => {
        alert('User logged out successfully!');
        showAuthContainer();
    }).catch((error) => {
        alert(error.message);
    });
}

function showAuthContainer() {
    document.getElementById('auth-container').style.display = 'block';
    document.getElementById('todo-container').style.display = 'none';
}

function showTodoContainer() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('todo-container').style.display = 'block';
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        showTodoContainer();
    } else {
        showAuthContainer();
    }
});

// Існуючий код для функціоналу To-Do списку
document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value;

    if (taskText === '') return;

    const taskRef = ref(db, 'tasks');
    const newTaskRef = push(taskRef);
    set(newTaskRef, {
        text: taskText,
        completed: false
    });

    taskInput.value = '';
}

function loadTasks() {
    const taskRef = ref(db, 'tasks');
    onValue(taskRef, (snapshot) => {
        const tasks = snapshot.val();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        for (const id in tasks) {
            const task = tasks[id];
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button class="delete-btn" data-id="${id}">Delete</button>
                <button class="complete-btn" data-id="${id}">${task.completed ? 'Undo' : 'Complete'}</button>
            `;
            taskList.appendChild(li);

            li.querySelector('.delete-btn').addEventListener('click', deleteTask);
            li.querySelector('.complete-btn').addEventListener('click', toggleComplete);
        }
    });
}

function deleteTask(e) {
    const taskId = e.target.getAttribute('data-id');
    const taskRef = ref(db, 'tasks/' + taskId);
    remove(taskRef);
}

function toggleComplete(e) {
    const taskId = e.target.getAttribute('data-id');
    const taskRef = ref(db, 'tasks/' + taskId);
    const task = e.target.previousElementSibling;

    const updatedTask = {
        text: task.textContent,
        completed: !task.classList.contains('completed')
    };

    update(taskRef, updatedTask);
}

document.addEventListener('DOMContentLoaded', loadTasks);
