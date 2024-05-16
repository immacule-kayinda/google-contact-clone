const sortBy = document.querySelector("#sortBy");
const contactList = document.querySelector(".contact-list");
const createContactBtn = document.querySelector("#create-contact");
const main = document.querySelector(".main__list");

const preview = [];
const contactArray = [];
const labelArray = [];
function updateCounter() {
  document.querySelectorAll(".counter").forEach((counter) => {
    counter.innerHTML = !counter.className.includes("side")
      ? ` (${contactArray.length}) `
      : ` ${contactArray.length} `;
    console.log(counter.innerHTML);
  });
}

updateCounter();

function displayContactList(contactArray) {
  let innerHTML = "";

  contactArray.forEach((contact) => {
    const contactId = document.getElementById(contact.id);
    if (!contactId && contact.isDeleted === false) {
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

function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("create-label").style.display = "none";
  document.getElementById("label-name").value;
}

function createLabel(event) {
  event.preventDefault();
  const { labelName } = Object.fromEntries(
    new FormData(event.target).entries()
  );
  event.target.reset();
  labelArray.push(labelName);
  document.getElementById("label-name").textContent = "";
  closePopup();
  console.log(labelName);
  document.querySelector(".label__list").innerHTML = `
    <div class="label__item">
      <i class="fa-solid fa-bookmark"></i>
      <h2>${labelName}</h2>
    </div>  
`;
}

function openCreateLabelPopup() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("create-label").style.display = "flex";
}

function createElement(type, properties = {}) {
  const element = document.createElement(type);
  Object.assign(element, properties);
  return element;
}

function researching() {
  console.log("'esdf");
  const search = document.getElementById("search").value;
  const contactList = document.querySelector(".contact-list").innerHTML;
  let innerHTML = "";
  if (search !== "") {
    document.querySelector(".contact-list").innerHTML = "";
    contactArray
      .filter((el) => search.match(`${el.firstName} + ${el.lastName}`))
      .forEach((contact) => {
        if (contact.isDeleted === false) {
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
  } else {
    document.querySelector(".contact-list").innerHTML = contactList;
  }
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

  contactArray.push({
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
    isDeleted: false,
  });
  console.log(contactArray.filter((el) => el.isDeleted));
  main.innerHTML = preview.at(-1);
  console.log(displayContactList(contactArray));
  main.innerHTML += displayContactList(contactArray);
  updateCounter();

  preview.pop();
}

function changeChecked(contactId) {}

function deleteContact(contactId) {
  const confirmDeletion = confirm("Voulez-vous supprimer ce contact ?");

  if (confirmDeletion) {
    const index = contactArray.findIndex((el) => el.id === contactId);
    contactArray[index].isDeleted = true;
    displayContactList(contactArray);
  }
}

function updateTask(contactId) {
  const task = document.getElementById(contactId);
  const taskLabel = task.querySelector("label");
  const newTaskName = prompt("Enter the new task name", taskLabel.textContent);

  if (newTaskName) {
    const taskLabel = task.querySelector("label");
    taskLabel.textContent = newTaskName;
  }
}

function addEditContact(contactId = "", action = "add") {
  const countryId =
    (email =
    enterprise =
    firstName =
    functionIn =
    lastName =
    phoneNumber =
    isFavorite =
    labels =
    id =
      "");
  console.log(enterprise);
  if (action === "edit" && contactId !== "") {
    const contactIndex = contactArray.findIndex(
      (contact) => contact.id === contactId
    );
    const contact = contactArray[contactIndex];
    countryId = contact.countryId;
    email = contact.email;
    enterprise = contact.enterprise;
    firstName = contact.firstName;
    functionIn = contact.functionIn;
    lastName = contact.lastName;
    phoneNumber = contact.phoneNumber;
    isFavorite = contact.isFavorite;
    labels = [...contact.labels];
    id = contact.id;
  }
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
              <input type="text"  id="prenom" name='firstName' value="${firstName}" />
              <label for="name">Nom</label>
              <input type="text" name='lastName' id="name" value="${lastName}"/>
            </div>
          </div>
          <div class="form__component functions">
            <i class="fa-solid fa-building"></i>
            <div>
              <label for='entreprise'>Entreprise</label>
              <input name='enterprise' type="text" id="entreprise" value="${enterprise}" />
              <label for="fonction">Foncton</label>
              <input type="text" id="fonction" name="functionIn" id="function" value='${functionIn}'  />
            </div>
          </div>
          <div class="form__component contacts">
            <i class="fa-regular fa-envelope"></i>
            <div>
              <label for="email">Email</label>
              <input type="text" id="email" name="email" id="email" value='${email}' />
              <button class="add-button">
                <i class="fa-solid fa-plus"></i>Ajouter une adresse Email
              </button>
            </div>

            <i class="fa-solid fa-phone"></i>
            <div class="phone-number__container">
              <select name="countryId" id="country-id" def ><option selected value="243">+243</option></select>
              <label for="phone_number">Telephone</label>
              <input type="text" value='${phoneNumber}' name='phoneNumber'
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
      if (entry.textContent === "") {
        entry.addEventListener("blur", (event) => {
          Object.assign(label.style, {
            left: "24px",
            top: "24px",
            "font-size": "15px",
            color: "rgb(104, 104, 104)",
          });
        });
      }
    });
  });
  const contactForm = document.querySelector(".add-edit-contact form");
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

    event.preventDefault();
  });
}
