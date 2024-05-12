const sortBy = document.querySelector("#sortBy");
const contactList = [];

const createContactBtn = document.querySelector("#create-contact");
const preview = [];

function filteringList(event) {
  const value = event.target.value;
  const allTheTask = Array.from(tasks.querySelectorAll(".task"));
  if (value === "completed") {
    filterDone(allTheTask);
  } else {
    allTheTask.forEach((element) => {
      element.classList.remove("hide");
    });
  }
}

function filterDone(array) {
  array.forEach((element) => {
    console.log(element.className);
    if (element.className !== "task done") element.classList.add("hide");
  });
}

function createElement(type, properties = {}) {
  const element = document.createElement(type);
  Object.assign(element, properties);
  return element;
}

function createButton(text, clickHandler) {
  return createElement("button", {
    textContent: text,
    onclick: clickHandler,
  });
}

function createContact(
  countryId,
  email,
  enterprise,
  firstName,
  functionIn,
  lastName,
  phoneNumber
) {
  const contactId = crypto.randomUUID();
  const checkBoxId = `tache${contactId}`;

  const taskCheckInput = createElement("input", {
    type: "checkbox",
    id: checkBoxId,
    onchange: () => {
      changeChecked(contactId);
    },
  });

  const taskLabel = createElement("label", {
    htmlFor: checkBoxId,
    textContent: taskName,
  });

  const deleteBtn = createButton("Supprimer", function () {
    deleteTask(contactId);
  });
  const updateBtn = createButton("Modifier", function () {
    updateTask(contactId);
  });

  const task = createElement("div", {
    className: "task",
    id: contactId,
  });

  task.append(
    taskCheckInput,
    taskLabel,
    document.createElement("br"),
    deleteBtn,
    updateBtn,
    document.createElement("hr")
  );

  tasks.appendChild(task);
}

function changeChecked(taskId) {
  const task = document.getElementById(taskId);
  if (task.className === "task hide") task.classList.remove("hide");
  else task.classList.add("hide");
  task.classList.toggle("done");
}

function deleteContact(taskId) {
  const task = document.getElementById(taskId);

  const confirmDeletion = confirm("Voulez-vous supprimer ce contact ?");

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

function openAddContact(event) {
  const main = document.querySelector(".main__list");
  preview.push(main.innerHTML);

  main.innerHTML = `
    <main class="add-edit-contact">
				<form>
					<header class="edit-contact__header">
						<button class="back">
							<i class="fa-solid fa-arrow-left"></i>
						</button>
						<div class="save">
							<button type='submit'>Enregistrer</button>
						</div>
					</header>

					<figure class="ml-40">
						<img src="./images/image.png" alt="photo de profil" />
						<i class="fa-solid fa-plus"></i>
					</figure>

					<div class="form__component__container">
						<div class="form__component identity">
							<i class="fa-regular fa-user"></i>
							<div>
								<label for="prenom">Prenom</label>
								<input type="text"  id="prenom" name='firstName' />
								<label for="name">Nom</label>
								<input type="text" name='lastName' id="name"/>
							</div>
						</div>
						<div class="form__component functions">
							<i class="fa-solid fa-building"></i>
							<div>
								<label for='entreprise'>Entreprise</label>
								<input name='enterprise' type="text" id="entreprise" />
								<label for="fonction">Foncton</label>
								<input type="text" id="fonction" name="functionIn" id="function" />
							</div>
						</div>
						<div class="form__component contacts">
							<i class="fa-regular fa-envelope"></i>
							<div>
								<label for="email">Email</label>
								<input type="text" id="email" name="email" id="email" />
								<button class="add-button">
                  <i class="fa-solid fa-plus"></i>Ajouter une adresse Email
								</button>
              </div>

              <i class="fa-solid fa-phone"></i>
              <div class="phone-number__container">
                <select name="countryId" id="country-id"><option value="243">+243</option></select>
                <label for="phone_number">Telephone</label>
                <input type="text" name='phoneNumber'
                  pattern="^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$"
                  id="phone_number" />  
                <button class="add-button">
                  <i class="fa-solid fa-plus"></i>Ajouter un numero de telphone
                </button>      
              </div>
						</div>
					</div>



				</form>
			</main>
    `;
  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", (event) => {
    main.innerHTML = preview.at(-1);
    preview.pop;
  });

  const formInputs = document.querySelectorAll(".form__component div input");
  formInputs.forEach((entry) => {
    entry.addEventListener("focusin", (event) => {
      const label = document.querySelector(
        `label[for='${event.target.getAttribute("id")}']`
      );
      Object.assign(label.style, {
        top: "10px",
        left: "12px",
        "font-size": "x-small",
        color: "var(--inputing)",
      });
      entry.addEventListener("blur", (event) => {
        Object.assign(label.style, {
          left: "24px",
          top: "24px",
          "font-size": "15px",
          color: "rgb(104, 104, 104)",
        });
      });
    });
  });

  const contactForm = document.querySelector("form");
  contactForm.addEventListener("submit", (event) => {
    const data = new FormData(event.target);

    const {
      countryId,
      email,
      enterprise,
      firstName,
      functionIn,
      lastName,
      phoneNumber,
    } = Object.fromEntries(data.entries());
    console.log(
      countryId,
      email,
      enterprise,
      firstName,
      functionIn,
      lastName,
      phoneNumber
    );
    if (
      countryId &&
      email &&
      enterprise &&
      firstName &&
      functionIn &&
      lastName &&
      phoneNumber
    ) {
      createContact(
        countryId,
        email,
        enterprise,
        firstName,
        functionIn,
        lastName,
        phoneNumber
      );
      preview.at(-1);
    }

    event.preventDefault();
  });
}

createContactBtn.addEventListener("click", openAddContact);
