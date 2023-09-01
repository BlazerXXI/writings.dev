const mobileMenu = document.querySelector(".header_mobile-menu");
const headerNav = document.querySelector(".header_nav");
const body = document.querySelector("body");
const lock = document.querySelector(".lock");

const categorySelect = document.querySelector(".category_buttons");
let categoryValue = categorySelect.value;
categoryValue = localStorage.getItem("category");
const categoryLinks = document.querySelectorAll(".category_link");

const categoryGrid = document.querySelector(".category_grid");
const categoryLine = document.querySelector(".category_line");
const articlesList = document.querySelector(".articles_list");

const windowSize = window.innerWidth;

const GridActive = () => {
	categoryGrid.classList.add("category_active");
	categoryLine.classList.remove("category_active");
	localStorage.setItem("grid", "true");
	localStorage.removeItem("line");
	articlesList.classList.remove("articles_list-inline");
};
const LineActive = () => {
	categoryLine.classList.add("category_active");
	categoryGrid.classList.remove("category_active");
	localStorage.removeItem("grid");
	localStorage.setItem("line", "true");
	articlesList.classList.add("articles_list-inline");
};
if (localStorage.getItem("grid")) {
	GridActive();
} else if (localStorage.getItem("line")) {
	LineActive();
} else {
	windowSize < 768 ? LineActive() : GridActive();
}

categoryGrid.addEventListener("click", () => {
	GridActive();
});
categoryLine.addEventListener("click", () => {
	LineActive();
});

function updateSelectedOption(selectedValue) {
	for (let i = 0; i < categorySelect.options.length; i++) {
		if (categorySelect.options[i].value === selectedValue) {
			categorySelect.options[i].selected = true;
		} else {
			categorySelect.options[i].selected = false;
		}
	}
}
updateSelectedOption(categoryValue);
// Обработчик клика по ссылке
function handleCategoryLinkClick(event) {
	event.preventDefault(); // Предотвращаем стандартное действие перехода по ссылке

	const clickedCategory = event.target.innerText; // Получаем значение категории
	if (clickedCategory) {
		localStorage.setItem("category", clickedCategory); // Устанавливаем значение в localStorage
		updateSelectedOption(clickedCategory); // Обновляем активный элемент в select
	}
}
// Добавляем обработчик для каждой ссылки

categoryLinks.forEach((link) => {
	link.addEventListener("click", handleCategoryLinkClick);
});
// Инициализация активного элемента при загрузке страницы
updateSelectedOption(categoryValue);

categorySelect.addEventListener("change", () => {
	categoryValue = categorySelect.value;
	localStorage.setItem("category", categoryValue);
	updateSelectedOption(categoryValue);
});

mobileMenu.addEventListener("click", () => {
	mobileMenu.classList.toggle("active");
	body.classList.toggle("active");
});
window.addEventListener("click", (e) => {
	if (
		!e.target.closest(".header_mobile-menu") &&
		!e.target.closest(".header_nav")
	) {
		mobileMenu.classList.remove("active");
		body.classList.remove("active");
	}
});
