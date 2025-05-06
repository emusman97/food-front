import { emailValid, showErrorAlert, showSuccessAlert } from "./utils.js";

function registerContactUsSubmission() {
    const formId = "contact-us-form";
    const formElm = document.getElementById(formId);

    formElm?.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameElm = document.getElementById("name");
        const emailElm = document.getElementById("email");
        const subElm = document.getElementById("subject");
        const messageElm = document.getElementById("message");

        const name = nameElm?.value?.trim();
        const email = emailElm?.value?.trim();
        const subject = subElm?.value?.trim();
        const message = messageElm?.value?.trim();

        let valid = true;
        if (name === "") {
            showErrorAlert("Name cannot be empty");
            valid = false;
        } else if (email === "") {
            showErrorAlert("Email cannot be empty");
            valid = false;
        } else if (emailValid(email) === false) {
            showErrorAlert("Enter valid email");
            valid = false;
        } else if (subject === "") {
            showErrorAlert("Subject cannot be empty");
            valid = false;
        } else if (message === "") {
            showErrorAlert("Message cannot be empty");
            valid = false;
        }

        if (valid === false) {
            return;
        }

        nameElm && (nameElm.value = "");
        emailElm && (emailElm.value = "");
        subElm && (subElm.value = "");
        messageElm && (messageElm.value = "");

        showSuccessAlert("We will contact you very soon!");
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
        registerScrollToTopButton();
    };
}

main();
