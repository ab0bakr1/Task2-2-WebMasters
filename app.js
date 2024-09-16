// Selectors
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const addTaskBtn = document.getElementById('add-task-btn');

// addEventListener
addTaskBtn.addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);
taskList.addEventListener('click', handleTaskActions);

// Functions
function addTask() {
    const taskText = taskInput.value;
    if (taskText === '') {
        showNotification('Please enter a task.');
        return;
    }

    // Create task item
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <div>
            <button class="complete-btn">Complete</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Add to list
    taskList.appendChild(li);

    // Save to localStorage
    saveTask(taskText);

    // Clear input
    taskInput.value = '';

    // Show notification
    showNotification('Task added successfully.');
}

// Handle task 
function handleTaskActions(e) {
    const item = e.target;
    const taskItem = item.parentElement.parentElement;
    const taskText = taskItem.querySelector('.task-text').innerText;

    // Complete Task
    if (item.classList.contains('complete-btn')) {
        taskItem.classList.toggle('completed');
        showNotification('Task marked as complete.');
    }

    // Edit Task
    if (item.classList.contains('edit-btn')) {
        const newTaskText = prompt('Edit your task:', taskText);
        if (newTaskText) {
            taskItem.querySelector('.task-text').innerText = newTaskText;
            updateTaskInStorage(taskText, newTaskText);
            showNotification('Task updated successfully.');
        }
    }

    // Delete Task
    if (item.classList.contains('delete-btn')) {
        if (confirm('Are you sure you want to delete this task?')) {
            taskItem.remove();
            deleteTaskFromStorage(taskText);
            showNotification('Task deleted successfully.');
        }
    }
}

// Save task to localStorage
function saveTask(task) {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Update task in localStorage
function updateTaskInStorage(oldTask, newTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskIndex = tasks.indexOf(oldTask);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTask;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Delete task from localStorage
function deleteTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="task-text">${task}</span>
            <div>
                <button class="complete-btn">Complete</button>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Show notification
function showNotification(message) {
    alert(message);
}
