document.addEventListener("DOMContentLoaded", function () {
    const inputTask = document.getElementById("task-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    window.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTaskButton.click();
    });

    addTaskButton.addEventListener("click", () => {
        let taskValue = inputTask.value.trim();
        if (taskValue === "") return;

        const newTask = {
            id: Date.now(),
            taskText: taskValue,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        renderTask(newTask);
        inputTask.value = "";
        console.log(newTask);
    });

    function renderTask(task) {
        const list = document.createElement("li");
        list.setAttribute("data-id", task.id);

        if (task.completed) {
            list.classList.add("completed");
            // list.querySelector("button").disabled = true;
        }

        list.innerHTML = `
        <span>${task.taskText}</span>
        <button>Delete</button>`;

        taskList.appendChild(list);

        list.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            list.classList.toggle("completed");
            if (list.classList.contains("completed")) {
                list.querySelector("button").disabled = true;
            } else {
                list.querySelector("button").disabled = false;
            }

            saveTasks();
        });
        list.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t.id !== task.id);
            list.remove();
            saveTasks();
        });
    }
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
