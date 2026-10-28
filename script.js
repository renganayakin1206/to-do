
const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");
const clearCompletedButton = document.getElementById("clearCompleted");

let tasks = [];

function addTask(taskText) {
    const task = {
        id: Date.now() + Math.random(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    renderTasks();
}

function toggleTask(taskId) {
    tasks = tasks.map(function(task) {
        if (task.id === taskId) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    renderTasks();
}

function deleteTask(taskId) {
    tasks = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    renderTasks();
}

function clearCompletedTasks() {
    tasks = tasks.filter(function(task) {
        return !task.completed;
    });

    renderTasks();
}

function updateTaskCount() {
    const remaining = tasks.filter(function(task) {
        return !task.completed;
    }).length;

    taskCount.textContent =
        remaining + (remaining === 1
            ? " task remaining"
            : " tasks remaining");
}

function renderTasks() {
    taskList.replaceChildren();

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.setAttribute(
            "aria-label",
            "Mark " + task.text + " as completed"
        );

        checkbox.addEventListener("change", function() {
            toggleTask(task.id);
        });

        const span = document.createElement("span");
        span.className = "task-text";
        span.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });

        li.append(checkbox, span, deleteButton);
        taskList.appendChild(li);
    });

    emptyMessage.style.display =
        tasks.length === 0 ? "block" : "none";

    updateTaskCount();
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = taskInput.value.trim();

    if (text === "") {
        return;
    }

    addTask(text);
    taskInput.value = "";
    taskInput.focus();
});

clearCompletedButton.addEventListener(
    "click",
    clearCompletedTasks
);

renderTasks();
