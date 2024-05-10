const tasksForm = document.querySelector("form")
const tasks = document.querySelector("#tasks")
const sortBy = document.querySelector("#sortBy")
const contactList = []
const createContactBtn = document.querySelector("#create-contact")
let preview = ""

function filteringList(event) {
    const value = event.target.value
    const allTheTask = Array.from(tasks.querySelectorAll('.task'))
    if(value === "completed") {
        filterDone(allTheTask)
    } else {
        allTheTask.forEach(element => {
            element.classList.remove('hide')
        })
    }
}

function filterDone(array) {
    array.forEach(element => {
        console.log(element.className)
        if(element.className !== "task done") element.classList.add("hide")
    });
}

function createElement(type, properties = {}) {
    const element = document.createElement(type);
    Object.assign(element, properties);
    return element;
}

function createButton(text, clickHandler) {
    return createElement('button', {
        textContent: text,
        onclick: clickHandler
    });
}

function createContact(taskName) {
    const taskId = crypto.randomUUID();
    const checkBoxId = `tache${taskId}`;
    
    const taskCheckInput = createElement('input', {
        type: 'checkbox',
        id: checkBoxId,
        onchange: () => {
            changeChecked(taskId)
        }
    });
    
    const taskLabel = createElement('label', {
        htmlFor: checkBoxId,
        textContent: taskName
    });
    
    const deleteBtn = createButton('Supprimer', function () {
        deleteTask(taskId)
    });
    const updateBtn = createButton('Modifier', function () {
        updateTask(taskId)
    });
    
    const task = createElement('div', {
        className: 'task',
        id: taskId
    });

   
    
    task.append(taskCheckInput, taskLabel, document.createElement('br'), deleteBtn, updateBtn, document.createElement('hr'));
    
    tasks.appendChild(task);

}

function changeChecked(taskId) {
    const task = document.getElementById(taskId)
    if(task.className === "task hide") task.classList.remove('hide')
    else task.classList.add('hide')
    task.classList.toggle("done")
}

function deleteContact(taskId) {
    const task = document.getElementById(taskId)
    
    const confirmDeletion = confirm("Voulez-vous supprimer ce contact ?")
    
    if (confirmDeletion) {
        task.remove();
    }
}

function updateTask(taskId) {
    const task = document.getElementById(taskId);
    const taskLabel = task.querySelector("label");
    const newTaskName = prompt("Enter the new task name", taskLabel.textContent);
    
    if (newTaskName) {
        const taskLabel = task.querySelector("label");
        taskLabel.textContent = newTaskName;
    }
}

function addContact(event) {
    // const data = new FormData(event.target)
    
    // const {task} = Object.fromEntries(data.entries())
    // console.log(Object.fromEntries(data.entries()))
    // if (task) {
    //     createTask(task)
    //     event.target.reset()
    // }
    
    
    // event.preventDefault();
    const main = document.querySelector('.main__list')
    preview = main.innerHTML

    main.innerHTML = `
    <main class="add-edit-contact">
            <header class="edit-contact__header">
              <button class="back">
                <i class="fa-solid fa-arrow-left"></i>
              </button>
              <div class="save">
                <button type="submit">Enregistrer</button>
              </div>
            </header>

            <figure>
              <img src="" alt="photo de profil" />
              <i class="fa-solid fa-plus"></i>
            </figure>
            <form>
              <div class="identity">
                <i class="fa-regular fa-user"></i>
                <input type="text" placeholder="Prenom" />
                <input type="text" placeholder="Nom" />
              </div>

              <div class="functions">
                <input type="text" placeholder="Entreprise" />
                <input
                  type="text"
                  placeholder="Fonction"
                  name="function"
                  id="function"
                />
              </div>

              <div class="contacts">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  id="email"
                />
                <button>
                  <i class="fa-solid fa-plus"></i> Ajouter une adresse Email
                </button>
                <i class="fa-solid fa-phone"></i>
                <select name="country-id" id="country-id"></select>
                <input
                  type="tel"
                  pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"
                  name="phone_number"
                />
              </div>
            </form>
          </main>
    `
    const backBtn = document.querySelector(".back")
    backBtn.addEventListener("click", (event) => {
        main.innerHTML = preview
    })
}



createContactBtn.addEventListener("click", addContact)