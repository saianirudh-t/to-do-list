sub = document.querySelector('#sub')
container = document.querySelector('.container')
let arr = []

let display = document.querySelector(".display")  // element to show completed count

// ------------------------------
// Update completed task count
// ------------------------------
function updateCompletedCount() {
    let completed = arr.filter(t => t.completed).length;
    display.innerText = completed;
}

// ------------------------------
// Save to localStorage
// ------------------------------
function saveToLocal() {
    localStorage.setItem("tasks", JSON.stringify(arr));
}

// ------------------------------
// Create a task card
// ------------------------------
function createTask(task, completed) {

    let div = document.createElement('div')
    let del = document.createElement('button')
    let update = document.createElement('button')
    let checkbox = document.createElement('input')
    let p = document.createElement('p')

    p.innerText = task
    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = completed

    // Add classes
    div.classList.add('task')
    del.classList.add('remove-btn')
    update.classList.add('update-btn')

    del.innerText = "remove"
    update.innerText = "update"

    div.append(checkbox, p, del, update)
    container.append(div)

    // Strike-through if completed
    if (completed) p.style.textDecoration = "line-through"

    // Checkbox event
    checkbox.addEventListener('change', () => {
        let index = arr.findIndex(t => t.entered === task)
        if (index !== -1) {
            arr[index].completed = checkbox.checked
            saveToLocal()
        }

        p.style.textDecoration = checkbox.checked ? "line-through" : "none"
        updateCompletedCount()
    })

    // Delete task
    del.addEventListener('click', () => {
        div.remove()
        arr = arr.filter(t => t.entered !== task)
        saveToLocal()
        updateCompletedCount()
    })

    // Update task
    update.addEventListener('click', () => {
        document.querySelector("#task").value = p.innerText
        div.remove()
        arr = arr.filter(t => t.entered !== task)
        saveToLocal()
        updateCompletedCount()
    })
}

// ------------------------------
// Load tasks from localStorage
// ------------------------------
window.addEventListener("load", () => {
    let saved = JSON.parse(localStorage.getItem("tasks")) || []
    arr = saved
    saved.forEach(taskObj => {
        createTask(taskObj.entered, taskObj.completed)
    })
    updateCompletedCount()   // IMPORTANT
})

// ------------------------------
// Add new task
// ------------------------------
sub.addEventListener('click', () => {
    let inp = document.querySelector("#task")
    let task = inp.value.trim()
    if (task === "") return

    createTask(task, false)

    arr.push({ entered: task, completed: false })
    saveToLocal()
    updateCompletedCount()

    inp.value = ''
})
