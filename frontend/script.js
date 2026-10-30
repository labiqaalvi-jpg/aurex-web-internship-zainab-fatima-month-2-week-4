const API_URL = 'http://localhost:5000/api';

let isLoginMode = true;
let token = localStorage.getItem('token') || '';

const authSection = document.getElementById('auth-section');
const dashboardSection = document.getElementById('dashboard-section');
const authForm = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const authBtn = document.getElementById('auth-btn');
const toggleText = document.getElementById('toggle-text');
const toggleLink = document.getElementById('toggle-link');
const logoutBtn = document.getElementById('logout-btn');
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Check initial auth state
if (token) {
    showDashboard();
}

// Toggle between Login and Register
toggleLink.addEventListener('click', () => {
    isLoginMode = !isLoginMode;
    formTitle.innerText = isLoginMode ? 'Login' : 'Register';
    authBtn.innerText = isLoginMode ? 'Login' : 'Register';
    toggleText.innerHTML = isLoginMode 
        ? 'Don\'t have an account? <span id="toggle-link">Register</span>' 
        : 'Already have an account? <span id="toggle-link">Login</span>';
    
    // Re-bind listener to the new toggle link
    document.getElementById('toggle-link').addEventListener('click', arguments.callee);
});

// Handle Auth (Login / Register)
authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const endpoint = isLoginMode ? '/auth/login' : '/auth/register';

    try {
        const res = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || data.error || 'Authentication failed');

        if (isLoginMode) {
            token = data.token;
            localStorage.setItem('token', token);
            showDashboard();
        } else {
            alert('Registration successful! Please login.');
            isLoginMode = true;
            formTitle.innerText = 'Login';
            authBtn.innerText = 'Login';
        }
    } catch (err) {
        alert(err.message);
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    token = '';
    localStorage.removeItem('token');
    authSection.classList.remove('hidden');
    dashboardSection.classList.add('hidden');
});

// Fetch Tasks
async function fetchTasks() {
    try {
        const res = await fetch(`${API_URL}/tasks`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const tasks = await res.json();
        
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const div = document.createElement('div');
            div.className = 'task-item';
            div.innerHTML = `
                <div>
                    <strong>${task.title}</strong>
                    <p>${task.description || ''}</p>
                </div>
                <button onclick="deleteTask('${task._id}')">Delete</button>
            `;
            taskList.appendChild(div);
        });
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
}

// Add Task
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-desc').value;

    try {
        const res = await fetch(`${API_URL}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title, description })
        });

        if (!res.ok) throw new Error('Failed to create task');

        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
        fetchTasks();
    } catch (err) {
        alert(err.message);
    }
});

// Delete Task
async function deleteTask(id) {
    try {
        const res = await fetch(`${API_URL}/tasks/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to delete task');
        fetchTasks();
    } catch (err) {
        alert(err.message);
    }
}

function showDashboard() {
    authSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    fetchTasks();
      }
          
