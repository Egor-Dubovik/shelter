import { arrPets } from "./arrPets.js";
const infoPopap = document.querySelector(".info-popap");
const titlePopap = document.querySelector(".info-popap__title");
const subTitlePopap = document.querySelector(".info-popap__sub-title");
const popapDescript = document.querySelector(".info-popap__description");
const imgPopap = document.querySelector(".info-popap__image img");
const petAge = document.querySelector(".features__age");
const petInoculation = document.querySelector(".features__inoculations");
const petDiseases = document.querySelector(".features__diseases");
const petParasites = document.querySelector(".features__parasites");
const btnPopapClose = document.querySelector('.info-popap__btn-close');
const sliderBtns = document.querySelectorAll(".slider__btn");
const body = document.querySelector("body");
const lockPadding = document.querySelectorAll(".lock-padding");
const lockPaddingValue = window.innerWidth - document.querySelector(".wraper").offsetWidth + "px";


function insertPopapInfo(name) {
	arrPets.forEach(el => {
		if (el.name === name) {
			imgPopap.src = el.img;
			titlePopap.textContent = el.name;
			subTitlePopap.textContent = `${el.type} - ${el.breed}`;
			popapDescript.textContent = el.description;
			petAge.textContent = el.age;
			petInoculation.textContent = el.inoculations;
			petDiseases.textContent = el.diseases;
			petParasites.textContent = el.parasites;
		}
	});
}

function showPopap(slide) {
	if (lockPadding.length > 0) {
		for (let i = 0; i < lockPadding.length; i++) {
			lockPadding[i].style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	insertPopapInfo(slide.dataset.petName);
	infoPopap.classList.add("active");
	document.body.classList.add("lock");
}

function closePopap() {
	for (let i = 0; i < lockPadding.length; i++) {
		lockPadding[i].style.paddingRight = "0px";
	}
	body.style.paddingRight = "0px";
	infoPopap.classList.remove("active");
	document.body.classList.remove("lock");
}


export const switchPopap = () => {
	const slides = document.querySelectorAll(".slider__slide");

	slides.forEach(slide => {
		slide.addEventListener("click", () => {
			showPopap(slide);
		});
	});

	btnPopapClose.addEventListener("click", closePopap);

	document.addEventListener("mousedown", (e) => {
		if (!e.target.closest(".menu") && !e.target.closest(".info-popap__content")) {
			closePopap();
		}
	});
}

sliderBtns.forEach(btn => {
	btn.addEventListener("click", showPopap);
});
