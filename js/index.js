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
function handleCategoryLinkClick(event) {
	event.preventDefault();

	const clickedCategory = event.target.innerText;

	if (clickedCategory) {
		const isLinkClass = event.target.classList;
		const isLinkActive = isLinkClass.contains("link-active");

		categoryLinks.forEach((link) => {
			link.classList.remove("link-active");
		});

		if (isLinkActive) {
			categoryValue = "All"; // Если ссылка уже активна, устанавливаем categoryValue в "All"
			updateSelectedOption(categoryValue);
		} else {
			categoryValue = clickedCategory;
			event.target.classList.add("link-active"); // Добавляем класс "link-active" к выбранной ссылке
		}
		updateArticleVisibility();
	}
}
// Добавляем обработчик для каждой ссылки
categoryLinks.forEach((link) => {
	link.addEventListener("click", handleCategoryLinkClick);
});
// Инициализация активного элемента при загрузке страницы
updateSelectedOption(categoryValue);
updateArticleVisibility();

categorySelect.addEventListener("change", () => {
	categoryValue = categorySelect.value;

	localStorage.setItem("category", categoryValue);
	updateSelectedOption(categoryValue);
	updateArticleVisibility();
});

// JavaScript: Дополненный код для отображения/скрытия статей
function updateArticleVisibility() {
	const articles = document.querySelectorAll(".article");

	articles.forEach((article) => {
		const authorElement = article.querySelector(".article_author");
		const author = authorElement.textContent.trim(); // Получаем текст автора статьи

		if (!categoryValue || author === categoryValue) {
			article.style.display = "block"; // Показать статью, если автор совпадает или categoryValue пустой
		} else if (categoryValue === "All") {
			article.style.display = "block"; // Показать статью, если categoryValue === "All"
		} else {
			article.style.display = "none"; // Скрыть статью, если автор не совпадает
		}
	});
}

// mobileMenu
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
