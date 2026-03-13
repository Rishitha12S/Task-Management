const API = "http://localhost:5000/api/tasks";

async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${task.title}
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

async function addTask() {

    const input = document.getElementById("taskInput");

    if(input.value.trim() === ""){
        alert("Please enter a task");
        return;
    }

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            title:input.value,
            description:""
        })
    });

    input.value="";
    loadTasks();
}

async function deleteTask(id) {
    await fetch(API + "/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();