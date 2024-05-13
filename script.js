const sortBy = document.querySelector("#sortBy");
const contactList = document.querySelector(".contact-list");
const createContactBtn = document.querySelector("#create-contact");
const main = document.querySelector(".main__list");

const preview = [];
const contactArray = [];

function displayContactList(contactArray) {
  let innerHTML = "";
  contactArray.forEach((contact) => {
    const contactId = document.getElementById(contact.id);
    if (!contactId) {
      console.log(preview.includes(contact.id));
      let labelHtml = "";
      contact.labels.forEach((label) => {
        labelHtml += `
        <div class="label">
          ${label}
        </div>
      `;
      });

      innerHTML += `
      <div class="contact-item">
        <div class="head contact-list-header" id="${contact.id}">
          <div class="contact-item header__title">${
            contact.firstName + " " + contact.lastName
          }</div>
          <div class="contact-item header__email">
            ${contact.email}
          </div>
          <div class="contact-item header__phone-number">
            ${contact.phoneNumber}
          </div>
          <div class="contact-item header__fonction-and-enterprise">
            ${contact.functionIn}
          </div>
          <div class="contact-item header__label">
            ${labelHtml}
          </div>
        </div>
      </div>
    `;
    }
  });
  return innerHTML;
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
  const id = crypto.randomUUID();
  const checkBoxId = `tache${id}`;

  const Contact = {
    countryId,
    email,
    enterprise,
    firstName,
    functionIn,
    lastName,
    phoneNumber,
    isFavorite: false,
    labels: [],
    id,
  };

  contactArray.push(Contact);
  console.log(contactArray);
  main.innerHTML = preview.at(-1);
  main.innerHTML += displayContactList(contactArray);
  preview.pop();

  // const taskCheckInput = createElement("input", {
  //   type: "checkbox",
  //   id: checkBoxId,
  //   onchange: () => {
  //     changeChecked(contactId);
  //   },
  // });

  // const taskLabel = createElement("label", {
  //   htmlFor: checkBoxId,
  //   textContent: taskName,
  // });

  // const deleteBtn = createButton("Supprimer", function () {
  //   deleteTask(contactId);
  // });
  // const updateBtn = createButton("Modifier", function () {
  //   updateTask(contactId);
  // });

  // const contact = createElement("div", {
  //   className: "contact-item",
  //   id: contactId,
  // });

  // contact.append(
  //   taskCheckInput,
  //   taskLabel,
  //   document.createElement("br"),
  //   deleteBtn,
  //   updateBtn,
  //   document.createElement("hr")
  // );

  // tasks.appendChild(contact);
}

function changeChecked(contactId) {}

function deleteContact(contactId) {
  const confirmDeletion = confirm("Voulez-vous supprimer ce contact ?");

  if (confirmDeletion) {
    const index = contactArray.findIndex((el) => el.id === contactId);
    contactArray.splice(index, 1);
  }
  displayContactList(contactArray);
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

function addEditContact(
  countryId,
  email,
  enterprise,
  firstName,
  functionIn,
  lastName,
  phoneNumber,
  isFavorite,
  labels,
  id
) {
  return `
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
}

function openAddContact(event) {
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
    event.preventDefault();
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
      event.target.reset();
    }
  });
}

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      console.log("L'élément est maintenant visible!");
      displayContactList(contactArray);
      document.querySelector(
        ".main__header p"
      ).innerHTML = `${contactArray.length}`;
    }
  });
};

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0,
};

const observer = new IntersectionObserver(callback, options);

observer.observe(main);

createContactBtn.addEventListener("click", openAddContact);
