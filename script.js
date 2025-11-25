sub = document.querySelector('#sub')
container = document.querySelector('.container')
let arr = []

sub.addEventListener('click', (event) => {
    let inp = document.querySelector("#task")
    let task = inp.value.trim()

    if (task === "") return

    let div = document.createElement('div')
    let del = document.createElement('button')
    let update = document.createElement('button')
    let checkbox = document.createElement('input')
    let p = document.createElement('p')

    p.innerText = task
    checkbox.setAttribute('type', 'checkbox')

    div.classList.add('task')
    del.classList.add('remove-btn')
    update.classList.add('update-btn')

    del.innerHTML = `
    <img src="bin.svg">
    `
    update.innerHTML = `
    <img src="edit.svg">
    `

    div.append(checkbox, p, update, del)
    container.append(div)

    arr.push({ entered: task, completed: checkbox.checked })

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            p.style.textDecoration = "line-through"
            p.style.color="lightGrey"
        } else {
            p.style.textDecoration = 'none'
            p.style.color="#333"
        }
    })

    del.addEventListener('click', () => div.remove())

    update.addEventListener('click', () => {
        inp.value = p.innerText
        div.remove()
    })

    // Clear input
    inp.value = ''
})
