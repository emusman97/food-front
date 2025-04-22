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
        console.log(tabItem);
        tabItem?.classList?.remove(focusedTabClassName);
    }

    tabElements?.item?.(index)?.classList?.add(focusedTabClassName);

    selectedTabIndex = index;
}

function registerTabListeners() {
    document
        .querySelector(".menu-selection-tabs-container")
        .addEventListener("click", function (event) {
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

function main() {
    window.onload = function () {
        populateMenuItems();
        focusTab(0);
        registerTabListeners();
    };
}

main();
