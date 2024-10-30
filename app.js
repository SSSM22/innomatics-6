let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
    const taskInput = document.getElementById('taskInput').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    if (taskInput === "") return;

    const newTask = {
        id: Date.now(),
        text: taskInput,
        dueDate: dueDate,
        priority: priority,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function editTask(id) {
    const taskText = prompt('Edit task:');
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, text: taskText || task.text };
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks(filter = 'all') {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) taskItem.classList.add('completed');

        taskItem.innerHTML = `
            <span>${task.text} - Due: ${task.dueDate} - Priority: ${task.priority}</span>
            <div>
                <button onclick="toggleComplete(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
}

function filterTasks() {
    const filter = document.getElementById('filter').value;
    renderTasks(filter);
}

// Initialize on page load
renderTasks();
