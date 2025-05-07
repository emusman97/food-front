import { emailValid, showSuccessAlert } from "./utils.js";

const nameInputId = "name";
const emailInputId = "email";
const subjectInputId = "subject";
const messageInputId = "message";

const selectErrorTextQuery = (inputId = "") => `#${inputId} ~ p`;

function showErrorMessage(errorMessage = "", inputId = "") {
    const errorTextElm = document.querySelector(selectErrorTextQuery(inputId));

    if (errorTextElm) {
        errorTextElm.innerText = errorMessage;
        errorTextElm.style.visibility = "visible";
    }
}

function clearErrorMessage(inputId = "") {
    const errorTextElm = document.querySelector(selectErrorTextQuery(inputId));

    if (errorTextElm) {
        errorTextElm.innerText = "Error";
        errorTextElm.style.visibility = "hidden";
    }
}

function registerContactUsSubmission() {
    const formId = "contact-us-form";
    const formElm = document.getElementById(formId);

    formElm?.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameElm = document.getElementById(nameInputId);
        const emailElm = document.getElementById(emailInputId);
        const subElm = document.getElementById(subjectInputId);
        const messageElm = document.getElementById(messageInputId);

        const name = nameElm?.value?.trim();
        const email = emailElm?.value?.trim();
        const subject = subElm?.value?.trim();
        const message = messageElm?.value?.trim();

        let valid = true;
        let inputId = "";
        let errorMessage = "";
        if (name === "") {
            valid = false;
            errorMessage = "Name cannot be empty";
            inputId = nameInputId;
        } else if (email === "") {
            valid = false;
            errorMessage = "Email cannot be empty";
            inputId = emailInputId;
        } else if (emailValid(email) === false) {
            valid = false;
            errorMessage = "Enter valid email";
            inputId = emailInputId;
        } else if (subject === "") {
            valid = false;
            errorMessage = "Subject cannot be empty";
            inputId = subjectInputId;
        } else if (message === "") {
            valid = false;
            errorMessage = "Message cannot be empty";
            inputId = messageInputId;
        }

        if (valid === false) {
            showErrorMessage(errorMessage, inputId);
            return;
        }

        nameElm && (nameElm.value = "");
        emailElm && (emailElm.value = "");
        subElm && (subElm.value = "");
        messageElm && (messageElm.value = "");

        showSuccessAlert("We will contact you very soon!");
    });
}

function registerTextChangeListeners() {
    const fields = document.querySelectorAll(
        "#contact-us-form input, #contact-us-form textarea"
    );

    fields?.forEach((field) => {
        field.addEventListener("input", () => {
            const inputId = field.id;
            inputId && clearErrorMessage(inputId);
        });
    });
}

function registerMenuToggle() {
    const menuToggleClass = "menu-toggle";
    const navContainerClass = "nav_container";
    const navContainerActiveClass = "nav_container-active";

    const menuToggleElm = document.querySelector(`.${menuToggleClass}`);
    const navContainerElm = document.querySelector(`.${navContainerClass}`);

    menuToggleElm?.addEventListener("click", (event) => {
        event.stopPropagation();
        navContainerElm.classList.toggle(navContainerActiveClass);
    });

    document?.addEventListener("click", () => {
        navContainerElm.classList.remove(navContainerActiveClass);
    });
}

function registerScrollToTopButton() {
    const scrollToTopBtnElm = document.getElementById("scroll_to_top");

    scrollToTopBtnElm?.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function main() {
    window.onload = function () {
        registerContactUsSubmission();
        registerMenuToggle();
        registerTextChangeListeners();
        registerScrollToTopButton();
    };
}

main();
