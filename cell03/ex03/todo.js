window.onload = () => {
    document.getElementById("newBtn").onclick = newTodo;
    loadTodos();
};

function newTodo() {
    const task = prompt("Enter new TO DO:");
    if (task && task.trim() !== "") {
        addTodo(task.trim(), true);
        saveTodos();
    }
}

function addTodo(text, toTop = false) {
    const todo = document.createElement("div");
    todo.textContent = text;

    // คลิกเพื่อลบ
    todo.onclick = () => {
        if (confirm("Do you want to remove this TO DO?")) {
            todo.remove();
            saveTodos();
        }
    };

    const list = document.getElementById("ft_list");
    if (toTop && list.firstChild) {
        list.insertBefore(todo, list.firstChild);
    } else {
        list.appendChild(todo);
    }
}

function saveTodos() {
    const list = document.querySelectorAll("#ft_list div");
    const tasks = [];
    list.forEach(item => tasks.push(item.textContent));
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(tasks)) + ";path=/";
}

function loadTodos() {
    const cookies = document.cookie.split("; ");
    const todoCookie = cookies.find(row => row.startsWith("todos="));
    if (todoCookie) {
        const tasks = JSON.parse(decodeURIComponent(todoCookie.split("=")[1]));
        tasks.forEach(task => addTodo(task, false));
    }
}
