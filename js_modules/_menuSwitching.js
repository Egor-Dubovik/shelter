const menuBody = document.querySelector('.menu__body');
const iconBurger = document.querySelector('.menu__icon');
const blackoutBlock = document.querySelector('.blackout-screan');
const menuLinks = document.querySelectorAll('.menu__link');

function closeMenu(arr) {
	arr.forEach(el => el.classList.remove('active'));
}

function openMenu(...arr) {
	arr.forEach(el => el.classList.toggle('active'));
}

export const switchMenu = () => {
	iconBurger.addEventListener("click", () => {
		openMenu.apply(this, [menuBody, iconBurger, blackoutBlock]);
		document.body.classList.toggle('lock');
	});

	menuBody.addEventListener("click", (e) => {
		if (e.target.classList.contains('menu__link')) {
			closeMenu([menuBody, iconBurger, blackoutBlock]);
			document.body.classList.remove('lock');
		}
	});

	document.addEventListener('mousedown', (e) => {
		if (!e.target.closest('.menu')) {
			closeMenu([menuBody, iconBurger, blackoutBlock]);
			document.body.classList.remove('lock');
		}
	});
}
