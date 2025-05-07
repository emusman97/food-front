import {
    dateTimeValid,
    emailValid,
    nameValid,
    showSuccessAlert,
} from "./utils.js";

const menuData = [
    {
        id: 1,
        name: "Classic Burger",
        image: "assets/menu-1.jpg.png",
        price: 999,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "mains",
    },
    {
        id: 2,
        name: "Margherita Pizza",
        image: "assets/menu-2.jpg.png",
        price: 1299,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "mains",
    },
    {
        id: 3,
        name: "Grilled Salmon",
        image: "assets/menu-3.jpg.png",
        price: 1799,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "mains",
    },
    {
        id: 4,
        name: "Caesar Salad",
        image: "assets/menu-4.jpg.png",
        price: 799,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "starters",
    },
    {
        id: 5,
        name: "Garlic Bread",
        image: "assets/menu-5.jpg.png",
        price: 499,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "starters",
    },
    {
        id: 6,
        name: "Chocolate Lava Cake",
        image: "assets/menu-6.jpg.png",
        price: 650,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "desserts",
    },
    {
        id: 7,
        name: "Tiramisu",
        image: "assets/menu-7.jpg.png",
        price: 750,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "desserts",
    },
    {
        id: 8,
        name: "Iced Tea",
        image: "assets/menu-8.jpg.png",
        price: 299,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "drinks",
    },
    {
        id: 9,
        name: "Fresh Lemonade",
        image: "assets/menu-3.jpg.png",
        price: 350,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "drinks",
    },
    {
        id: 10,
        name: "Cappuccino",
        image: "assets/menu-4.jpg.png",
        price: 450,
        description: "Ipsum ipsum clita erat amet dolor justo diam",
        category: "drinks",
    },
];
const tabIdIndexMap = {
    1: 0,
    2: 1,
    3: 2,
};

const nameInputId = "name";
const emailInputId = "email";
const dateTimeInputId = "date_time";

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

function shuffleData() {
    const shuffled = [...menuData];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}
function populateMenuItems() {
    const menuItemsContainer = document.getElementsByClassName(
        "menu-items-container"
    );

    const itemsHtml = shuffleData().reduce(
        (prev, currItem, index) =>
            (prev += `
 <div class="menu-item-container">
                            <img
                                class="menu-item-image"
                                src="${currItem.image}"
                                alt="Menu item image ${index + 1}"
                            />
                            <div class="menu-item-description-container">
                                <div class="menu-item-name-container">
                                    <p class="menu-item-name-text">
                                        ${currItem.name}
                                    </p>
                                    <p class="menu-item-price-text">$${
                                        currItem.price
                                    }</p>
                                </div>
                                <div class="menu-item-name-separator"></div>
                                <p>
                                    ${currItem.description}
                                </p>
                            </div>
                        </div>
    `),
        ""
    );

    const item = menuItemsContainer?.item?.(0);
    if (item) {
        item.innerHTML = itemsHtml;
    }
}

let selectedTabIndex = -1;
function focusTab(index = 0) {
    if (typeof index !== "number" || index < 0) {
        return;
    } else if (selectedTabIndex === index) {
        return;
    }

    const focusedTabClassName = "menu-tab-container-selected";
    const tabContainerClsName = "menu-tab-container";
    const tabElements = document.getElementsByClassName(tabContainerClsName);

    for (let i = 0; i < tabElements.length; i++) {
        const tabItem = tabElements?.item?.(i);
        tabItem?.classList?.remove(focusedTabClassName);
    }

    tabElements?.item?.(index)?.classList?.add(focusedTabClassName);

    selectedTabIndex = index;
}

function registerTabListeners() {
    document
        .querySelector(".menu-selection-tabs-container")
        ?.addEventListener("click", function (event) {
            const clickedItem = event.target?.closest?.(".menu-tab-container");

            if (clickedItem) {
                const itemId = clickedItem?.id;
                if (itemId) {
                    focusTab(tabIdIndexMap?.[itemId]);
                    populateMenuItems();
                }
            }
        });
}

function registerBookReservationHandler() {
    const formId = "book_reservation_form";
    const form = document.getElementById(formId);

    form?.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const dateTime = document.getElementById("date_time");
        const peoplePicker = document.getElementById("people_picker");
        const specialRequest = document.getElementById("special_request");

        const nameValue = name?.value?.trim() ?? "";
        const emailValue = email?.value?.trim() ?? "";
        const dateTimeValue = dateTime?.value?.trim() ?? "";
        const noOfPeople = peoplePicker?.value?.trim() ?? "";
        const specialRequestValue = specialRequest?.value?.trim() ?? "";

        let valid = true;
        let errorMessage = "";
        let inputId = "";
        if (nameValue === "") {
            valid = false;
            errorMessage = "Name cannot be empty";
            inputId = nameInputId;
        } else if (nameValid(nameValue) === false) {
            valid = false;
            errorMessage =
                "Name should only contain aplphabets, spaces or hyphens";
            inputId = nameInputId;
        } else if (emailValue === "") {
            valid = false;
            errorMessage = "Email cannot be empty";
            inputId = emailInputId;
        } else if (emailValid(emailValue) === false) {
            valid = false;
            errorMessage = "Enter valid email address";
            inputId = emailInputId;
        } else if (dateTimeValue === "") {
            valid = false;
            errorMessage = "Date and time cannot be empty";
            inputId = dateTimeInputId;
        } else if (dateTimeValid(dateTimeValue) === false) {
            valid = false;
            errorMessage = "Required format: DD/MM/YYYY HH:MM";
            inputId = dateTimeInputId;
        } else {
            const [datePart] = dateTimeValue?.split(" ");
            const [day, month, year] = datePart.split("/");
            const formattedDate = `${year}-${month}-${day}`;
            if (isNaN(Date.parse(formattedDate))) {
                valid = false;
                errorMessage = "Invalid date selected";
                inputId = dateTimeInputId;
            }
        }

        if (valid === false) {
            showErrorMessage(errorMessage, inputId);
            return;
        }

        showSuccessAlert("Congratulations your reservation has been booked!");

        name && (name.value = "");
        email && (email.value = "");
        dateTime && (dateTime.value = "");
        peoplePicker && (peoplePicker.selectedIndex = 0);
        specialRequest && (specialRequest.value = "");
    });
}

function registerTextChangeListeners() {
    const fields = document.querySelectorAll(
        "#book_reservation_form input, #book_reservation_form textarea"
    );

    fields?.forEach((field) => {
        field.addEventListener("input", () => {
            const inputId = field.id;
            inputId && clearErrorMessage(inputId);
        });
    });
}

function registerScrollToTop() {
    const btn = document.getElementById("scroll_to_top");
    btn?.addEventListener("click", () => {
        window.scroll({ top: 0, behavior: "smooth" });
    });
}

function registerMenuToggle() {
    const menuToggleClass = "menu-toggle";
    const navContainerClass = "nav_container";
    const navContainerActiveClass = "nav_container-active";

    const menuToggleElm = document.querySelector(`.${menuToggleClass}`);
    const navContainerElm = document.querySelector(`.${navContainerClass}`);

    menuToggleElm.addEventListener("click", (event) => {
        event.stopPropagation();
        navContainerElm.classList.toggle(navContainerActiveClass);
    });

    document.addEventListener("click", () => {
        navContainerElm.classList.remove(navContainerActiveClass);
    });
}

function main() {
    window.onload = function () {
        populateMenuItems();
        focusTab(0);
        registerTabListeners();
        registerBookReservationHandler();
        registerTextChangeListeners();
        registerScrollToTop();
        registerMenuToggle();
    };
}

main();
