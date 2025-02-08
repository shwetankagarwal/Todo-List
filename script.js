document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);
        saveTasks();
        todoInput.value = "";
        console.log(tasks);
    });

    function renderTask(task) {
        // created list element
        const list = document.createElement("li");
        // Set data id of list as task.id
        list.setAttribute("data-id", task.id);
        //Added completed class
        if (task.completed) list.classList.add("completed");
        //Added task to the list along with a delete button
        list.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>`;
        //Added task to list
        todoList.appendChild(list);

        list.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed;
            list.classList.toggle("completed");
            saveTasks();
        });

        list.querySelector("button").addEventListener("click", (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            list.remove();
            saveTasks();
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
