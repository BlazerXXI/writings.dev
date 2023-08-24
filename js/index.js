const mobileMenu = document.querySelector(".header_mobile-menu");
const headerNav = document.querySelector(".header_nav");
const body = document.querySelector("body");
const lock = document.querySelector(".lock");

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
