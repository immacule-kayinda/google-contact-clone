const sortBy = document.querySelector("#sortBy");
const contactList = document.querySelector(".contact-list");
const createContactBtn = document.querySelector("#create-contact");
const main = document.querySelector(".main__list");

const preview = [];
const contactArray = [];
const labelArray = [];

let current = "contact-list";

function updateCounter() {
  document.querySelectorAll(".counter").forEach((counter) => {
    counter.innerHTML = !counter.className.includes("side")
      ? ` (${contactArray.filter((contact) => !contact.isDeleted).length}) `
      : ` ${contactArray.filter((contact) => !contact.isDeleted).length} `;
    console.log(contactArray.filter((contact) => !contact.isDeleted).length);
  });
}

updateCounter();

function displayContactList(contactArray, currentName = "contact-list") {
  const contactList = main.querySelector(".contact-list");
  contactList.innerHTML = "";
  contactArray.forEach((contact) => {
    const contactId = document.getElementById(contact.id);
    if (
      !contactId &&
      contact.isDeleted === false &&
      currentName === "contact-list"
    ) {
      console.log(contact.isDeleted);
      const div = createElement("div", {
        className: "action-hover__button",
      });
      const deleteBtn = createElement("button", {
        onclick: function () {
          deleteContact(contact.id);
        },
        innerHTML: `<i class="fa-solid fa-trash"></i>`,
        className: "action__button delete__button",
      });

      const modifyBtn = createElement("button", {
        innerHTML: "<i class='fa-solid fa-pen'></i>",
        onclick: () => {
          updateContactHandler(contact.id);
        },
      });

      div.append(deleteBtn, modifyBtn);
      let labelHtml = "";
      contact.labels.forEach((label, id) => {
        labelHtml += `
        <div id="${id}" class="label">
          ${label}
        </div>
        `;
      });
      contactList.innerHTML += `
      <div class="hover-class"  >
        <div class="head contact-elementonclick='retrieveContact(event)' contact-list-header" id="${
          contact.id
        }">
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
      contactList.children[contactList.children.length - 1].append(div);
    }
    if (
      !contactId &&
      contact.isDeleted === true &&
      currentName === "trash-list"
    ) {
      console.log(contact.isDeleted);
      const div = createElement("div", {
        className: "action-hover__button",
      });
      const deleteBtn = createElement("button", {
        onclick: function () {
          deleteContact(contact.id);
        },
        innerHTML: `<i class="fa-solid fa-trash"></i>`,
        className: "action__button delete__button",
      });

      const modifyBtn = createElement("button", {
        innerHTML: "<i class='fa-solid fa-pen'></i>",
        onclick: () => {
          updateContactHandler(contact.id);
        },
      });

      div.append(deleteBtn, modifyBtn);
      let labelHtml = "";
      contact.labels.forEach((label, id) => {
        labelHtml += `
        <div id="${id}" class="label">
          ${label}
        </div>
        `;
      });
      contactList.innerHTML += `
      <div class="hover-class"  >
        <div class="head contact-elementonclick='retrieveContact(event)' contact-list-header" id="${
          contact.id
        }">
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
      contactList.children[contactList.children.length - 1].append(div);
    }
    if (
      !contactId &&
      contact.isDeleted === false &&
      contact.labels.includes(currentName)
    ) {
      console.log(contact.isDeleted);
      const div = createElement("div", {
        className: "action-hover__button",
      });
      const deleteBtn = createElement("button", {
        onclick: function () {
          deleteContact(contact.id);
        },
        innerHTML: `<i class="fa-solid fa-trash"></i>`,
        className: "action__button delete__button",
      });

      const modifyBtn = createElement("button", {
        innerHTML: "<i class='fa-solid fa-pen'></i>",
        onclick: () => {
          updateContactHandler(contact.id);
        },
      });

      div.append(deleteBtn, modifyBtn);
      let labelHtml = "";
      contact.labels.forEach((label, id) => {
        labelHtml += `
        <div id="${id}" class="label">
          ${label}
        </div>
        `;
      });
      contactList.innerHTML += `
      <div class="hover-class"  >
        <div class="head contact-elementonclick='retrieveContact(event)' contact-list-header" id="${
          contact.id
        }">
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
      contactList.children[contactList.children.length - 1].append(div);
    }
  });
  const hoverClasses = document.querySelectorAll(".hover-class");
  hoverClasses.forEach((hoverClass) => {
    hoverClass.addEventListener("mouseover", function (event) {
      hoverClass.querySelector(
        ".action-hover__button, .action-hover__button button"
      ).style.left = "90%";
    });
    hoverClass.addEventListener("mouseout", function (event) {
      hoverClass.querySelector(
        ".action-hover__button, .action-hover__button button"
      ).style.left = "100%";
    });
  });
}

/**
 * This function closes the create label popup.
 * It hides the overlay and the create label form, and clears the input field.
 * @returns {void}
 */
function closePopup() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("create-label").style.display = "none";
  document.getElementById("label-name").value = "";
}

function setCurrent(event) {
  const current = document.querySelector(".current");
  current.classList.remove("current");
  event.target.classList.add("current");
  displayContactList(contactArray, event.target.id);
}

function createLabel(event) {
  event.preventDefault();
  const { labelName } = Object.fromEntries(
    new FormData(event.target).entries()
  );
  if (labelName) {
    event.target.reset();
    closePopup();
    if (!labelArray.includes(labelName)) {
      labelArray.push(labelName);
      document.getElementById("label-name").textContent = "";
      console.log(labelName);
      document.querySelector(".label__list").innerHTML = `
        <div class="label__item" id="${labelName}" onclick="setCurrent(event)">
          <i class="fa-solid fa-bookmark"></i>
          <h2>${labelName}</h2>
        </div>`;
    }
  }
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
        <div class="contact-item" id="${id}">
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
  main.innerHTML = preview.at(-1);
  displayContactList(contactArray);
  updateCounter();

  preview.pop();
}

function changeChecked(contactId) {}

function deleteContact(contactId) {
  const confirmDeletion = confirm("Voulez-vous supprimer ce contact ?");
  console.log("deleteContact");
  if (confirmDeletion) {
    const index = contactArray.findIndex((el) => el.id === contactId);
    console.log(contactArray[index].isDeleted);
    contactArray[index].isDeleted = true;
    console.log(contactArray[index].isDeleted);
    displayContactList(contactArray);
    updateCounter();
  }
}

function updateContact(
  contactId,
  countryId,
  email,
  enterprise,
  firstName,
  functionIn,
  lastName,
  phoneNumber
) {
  const index = contactArray.findIndex((contact) => contact.id === contactId);
  contactArray[index].email = email;
  contactArray[index].enterprise = enterprise;
  contactArray[index].firstName = firstName;
  contactArray[index].functionIn = functionIn;
  contactArray[index].lastName = lastName;
  contactArray[index].phoneNumber = phoneNumber;
  main.innerHTML = preview.at(-1);
  displayContactList(contactArray);

  const hoverClasses = document.querySelectorAll(".hover-class");
  hoverClasses.forEach((hoverClass) => {
    hoverClass.addEventListener("mouseover", function (event) {
      hoverClass.querySelector(
        ".action-hover__button, .action-hover__button button"
      ).style.left = "90%";
    });
    hoverClass.addEventListener("mouseout", function (event) {
      hoverClass.querySelector(
        ".action-hover__button, .action-hover__button button"
      ).style.left = "100%";
    });
  });
}

function updateContactHandler(contactId) {
  preview.push(main.innerHTML);
  main.innerHTML = addEditContact(contactId, "edit");
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
    const confirmDeletion = confirm(
      "Voulez vous appliquer les modifications ? "
    );
    if (
      confirmDeletion &&
      countryId &&
      email &&
      enterprise &&
      firstName &&
      functionIn &&
      lastName &&
      phoneNumber
    ) {
      updateContact(
        contactId,
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

function addEditContact(contactId = "", action = "add") {
  let countryId =
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
  main.innerHTML = addEditContact();

  const backBtn = document.querySelector(".back");
  backBtn.addEventListener("click", (event) => {
    main.innerHTML = preview.at(-1);
    preview.pop;
  });

  const formInputs = document.querySelectorAll(".form__component div input");
  formInputs.forEach((entry) => {
    let value = "";
    entry.addEventListener("focusin", (event) => {
      const label = document.querySelector(
        `label[for='${event.target.getAttribute("id")}']`
      );
      Object.assign(label.style, {
        top: "8px",
        left: "12px",
        "font-size": "x-small",
        color: "var(--inputing)",
      });

      entry.addEventListener("blur", (event) => {
        if (entry.value === "") {
          Object.assign(label.style, {
            left: "24px",
            top: "24px",
            "font-size": "15px",
            color: "rgb(104, 104, 104)",
          });
        } else {
          Object.assign(label.style, {
            color: "black",
          });
        }
      });
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
