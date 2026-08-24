"use strict";
const addBtnTask = document.getElementById("add-task-btn");
const modalOverlay = document.getElementById("modal-overlay");
const closeModalBtn = document.getElementById("close-modal-btn");
const cancelBtn = document.getElementById("cancel-btn");
const notificationContainer = document.getElementById("notification-container");
addBtnTask.addEventListener("click", () => {
    taskIndex = -1;
    clearForm();
    submitBtn.textContent = "Add Task";
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
});
function closeModal() {
    modalOverlay.classList.remove("flex");
    modalOverlay.classList.add("hidden");
}
closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
const taskTitle = document.getElementById("task-title");
const taskPriority = document.getElementById("task-priority");
const taskDueDate = document.getElementById("task-due-date");
const taskDescription = document.getElementById("task-description");
const submitBtn = document.getElementById("submit-btn");
const tasksTodo = document.getElementById("tasks-todo");
const tasksInProgress = document.getElementById("tasks-in-progress");
const tasksCompleted = document.getElementById("tasks-completed");
const todoCount = document.getElementById("todo-count");
const progressCount = document.getElementById("progress-count");
const completedCount = document.getElementById("completed-count");
const TaskList = JSON.parse(localStorage.getItem("TaskList") || "[]");
var Status;
(function (Status) {
    Status[Status["todo"] = 0] = "todo";
    Status[Status["inProgress"] = 1] = "inProgress";
    Status[Status["completed"] = 2] = "completed";
})(Status || (Status = {}));
const today = new Date().toISOString().split("T")[0];
taskDueDate.min = today;
display();
function createTask() {
    const taskObj = {
        id: Date.now(),
        title: taskTitle.value,
        priority: taskPriority.value,
        dueDate: taskDueDate.value,
        description: taskDescription.value,
        createdAt: new Date().toLocaleDateString(),
        status: Status.todo
    };
    TaskList.push(taskObj);
    localStorage.setItem("TaskList", JSON.stringify(TaskList));
    display();
}
function display() {
    tasksTodo.innerHTML = "";
    tasksInProgress.innerHTML = "";
    tasksCompleted.innerHTML = "";
    if (TaskList.filter(task => task.status === Status.todo).length === 0) {
        tasksTodo.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
                <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
                <p class="text-sm">No tasks yet</p>
                <p class="text-xs mt-1">Click + to add one</p>
            </div>
        `;
    }
    if (TaskList.filter(task => task.status === Status.inProgress).length === 0) {
        tasksInProgress.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
                <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
                <p class="text-sm">No tasks yet</p>
                <p class="text-xs mt-1">Click + to add one</p>
            </div>
        `;
    }
    if (TaskList.filter(task => task.status === Status.completed).length === 0) {
        tasksCompleted.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
                <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
                <p class="text-sm">No tasks yet</p>
                <p class="text-xs mt-1">Click + to add one</p>
            </div>
        `;
    }
    TaskList.forEach((task, index) => {
        let priorityClass = "";
        let priorityDot = "";
        if (task.priority === "high") {
            priorityClass = "bg-red-50 text-red-600";
            priorityDot = "bg-red-500";
        }
        else if (task.priority === "medium") {
            priorityClass = "bg-amber-50 text-amber-600";
            priorityDot = "bg-amber-500";
        }
        else {
            priorityClass = "bg-emerald-50 text-emerald-600";
            priorityDot = "bg-emerald-500";
        }
        const taskHTML = `
            <div 
                class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200"
                data-task-id="${task.id}"
            >

                <!-- Top Bar -->
                <div class="flex items-center justify-between mb-3">

                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full ${priorityDot}"></span>

                        <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                            #00${(index + 1)}
                        </span>
                    </div>

                    <div class="flex items-center gap-1 opacity-100  lg:opacity-0 lg:group-hover:opacity-100">

                        <button 
                            class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                            data-task-id="${task.id}"
                            title="Edit task"
                        >
                            <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
                        </button>

                        <button 
                            class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                            data-task-id="${task.id}"
                            title="Delete task"
                        >
                            <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
                        </button>

                    </div>
                </div>


                <!-- Title -->
                <h3 class="font-semibold text-slate-800 mb-2 leading-snug ${task.status === 2 ? "line-through text-slate-400" : ""}">
                    ${task.title}
                </h3>


                <!-- Description -->
                <p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                    ${task.description}
                </p>


                <!-- Tags Row -->
                <div class="flex flex-wrap items-center gap-2 mb-4">

                    <!-- Priority Badge -->
                    <span class="${priorityClass} text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">

                        <span class="w-1.5 h-1.5 rounded-full ${priorityDot}"></span>

                        ${task.priority} Priority

                    </span>

             ${task.status === 2 ? `
              <span class="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
              <i class="fa-solid fa-check"></i>
              Done
            </span>
            ` : ""}

          ${(task.status === Status.todo || task.status === Status.inProgress) && task.dueDate == today ? `
             <span class="bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                    <i class="fa-solid fa-triangle-exclamation"></i>Overdue</span>` : ""}


                <!-- Meta Info -->
                <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">

                    <div class="flex items-center gap-1.5">
                        <i class="fa-regular fa-calendar"></i>
                        <span>${task.dueDate}</span>
                    </div>

                    <div 
                        class="flex items-center gap-1.5"
                        title="Created ${task.createdAt}"
                    >
                        <i class="fa-regular fa-clock"></i>
                        <span>${task.createdAt}</span>
                    </div>

                </div>
<br>
<!-- Action Buttons -->
<div class="flex flex-wrap gap-2">

    ${task.status === 0 ? `
        <button 
            class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200"
            data-task-id="${task.id}"
            data-status="${Status.inProgress}"
        >
            <i class="fa-solid fa-play pointer-events-none"></i>
            <span class="pointer-events-none">Start</span>
        </button>
          <button 
            class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            data-task-id="${task.id}"
            data-status="${Status.completed}"
        >
            <i class="fa-solid fa-check pointer-events-none"></i>
            <span class="pointer-events-none">Complete</span>
        </button> ` : ""}


    ${task.status === 1 ? `
        <button 
            class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200"
            data-task-id="${task.id}"
            data-status="${Status.todo}"
        >
            <i class="fa-solid fa-rotate-left pointer-events-none"></i>
            <span class="pointer-events-none">To Do</span>
        </button>
        <button 
            class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            data-task-id="${task.id}"
            data-status="${Status.completed}"
        >
            <i class="fa-solid fa-check pointer-events-none"></i>
            <span class="pointer-events-none">Complete</span>
        </button>

     
    ` : ""}


    ${task.status === 2 ? `
       <button 
            class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200"
            data-task-id="${task.id}"
            data-status="${Status.todo}"
        >
            <i class="fa-solid fa-rotate-left pointer-events-none"></i>
            <span class="pointer-events-none">To Do</span>
        </button>
             <button 
            class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200"
            data-task-id="${task.id}"
            data-status="${Status.inProgress}"
        >
            <i class="fa-solid fa-play pointer-events-none"></i>
            <span class="pointer-events-none">Start</span>
        </button>
    ` : ""}
            </div>
  </div>
        `;
        if (task.status === Status.todo) {
            tasksTodo.innerHTML += taskHTML;
        }
        if (task.status === Status.inProgress) {
            tasksInProgress.innerHTML += taskHTML;
        }
        if (task.status === Status.completed) {
            tasksCompleted.innerHTML += taskHTML;
        }
        const statusBtns = document.querySelectorAll(".status-btn");
        statusBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const target = e.currentTarget;
                const taskId = target.dataset.taskId;
                const newStatus = target.dataset.status;
                changeStatus(Number(taskId), Number(newStatus));
            });
        });
        todoCount.textContent =
            `${TaskList.filter(task => task.status === Status.todo).length} tasks`;
        progressCount.textContent =
            `${TaskList.filter(task => task.status === Status.inProgress).length} tasks`;
        completedCount.textContent =
            `${TaskList.filter(task => task.status === Status.completed).length} tasks`;
    });
}
submitBtn.addEventListener("click", (e) => {
    if (!validateTitle()) {
        return;
    }
    if (taskIndex === -1) {
        createTask();
        clearForm();
        closeModal();
        showNotification("Task added successfully!", "success");
    }
    else {
        saveUpdate();
        clearForm();
        showNotification("Task updated successfully!", "success");
    }
});
function changeStatus(id, newStatus) {
    const taskIndex = TaskList.find((task) => task.id === id);
    if (taskIndex) {
        taskIndex.status = newStatus;
    }
    localStorage.setItem("TaskList", JSON.stringify(TaskList));
    display();
}
//npx @tailwindcss/cli -i ./src/css/input.css -o ./src/css/output.css --watch
document.addEventListener("click", (e) => {
    const target = e.target;
    const deleteBtn = target.closest(".delete-btn");
    if (!deleteBtn)
        return;
    const taskId = Number(deleteBtn.dataset.taskId);
    const taskIndex = TaskList.findIndex((task) => task.id === taskId);
    if (taskIndex === -1)
        return;
    TaskList.splice(taskIndex, 1);
    localStorage.setItem("TaskList", JSON.stringify(TaskList));
    display();
});
const titleError = document.getElementById("title-error");
function validateTitle() {
    const value = taskTitle.value.trim();
    if (value === "") {
        titleError.textContent = "Title is required";
        titleError.classList.remove("hidden");
        taskTitle.classList.add("border-red-500");
        return false;
    }
    titleError.textContent = "";
    titleError.classList.add("hidden");
    taskTitle.classList.remove("border-red-500");
    return true;
}
function clearForm() {
    taskTitle.value = "";
    taskDescription.value = "";
    taskPriority.value = "medium";
    taskDueDate.value = "";
}
let taskIndex = -1;
function updateTask(index) {
    taskIndex = index;
    const task = TaskList[index];
    if (!task) {
        return;
    }
    taskTitle.value = task.title;
    taskDescription.value = task.description;
    taskPriority.value = task.priority;
    taskDueDate.value = task.dueDate;
    modalOverlay.classList.remove("hidden");
    modalOverlay.classList.add("flex");
    submitBtn.textContent = "Update Task";
}
function saveUpdate() {
    const task = TaskList[taskIndex];
    if (!task) {
        return;
    }
    TaskList[taskIndex].title = taskTitle.value;
    TaskList[taskIndex].description = taskDescription.value;
    TaskList[taskIndex].priority = taskPriority.value;
    TaskList[taskIndex].dueDate = taskDueDate.value;
    localStorage.setItem("TaskList", JSON.stringify(TaskList));
    display();
    clearForm();
    closeModal();
    taskIndex = -1;
}
document.addEventListener("click", (e) => {
    const target = e.target;
    const editBtn = target.closest(".edit-btn");
    if (!editBtn)
        return;
    const taskId = Number(editBtn.dataset.taskId);
    const index = TaskList.findIndex(task => task.id === taskId);
    if (index === -1)
        return;
    updateTask(index);
});
function showNotification(message, type) {
    const colors = { success: "bg-green-500", error: "bg-red-600" };
    notificationContainer.classList.remove("hidden", "bg-green-500", "bg-red-600");
    notificationContainer.classList.add(colors[type]);
    notificationContainer.innerHTML = message;
    setTimeout(() => {
        notificationContainer.innerHTML = "";
        notificationContainer.classList.add("hidden");
    }, 3000);
}
