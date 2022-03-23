import { arrPets } from "./arrPets.js";

let cloneArrPets = [...arrPets];
const sliderBtns = document.querySelectorAll(".slider__btn");
const wrapers = document.querySelectorAll(".slider__wraper");
const firstSliderWraper = document.querySelector(".slider__wraper_first");
const secondSliderWraper = document.querySelector(".slider__wraper_second");
let arrShowSlides = [];
let count = 0;
let pushFirstWraper = true;

const createSlide = (src, name) => {
	const slide = document.createElement("div");
	slide.className = "slider__slide";
	slide.dataset.petName = name;
	const divImage = document.createElement("div");
	divImage.className = "slider__slide-image";
	const image = document.createElement("img");
	image.src = src;
	image.alt = `pet ${name}`;
	const title = document.createElement("h4");
	title.className = "slider__slide-title";
	title.textContent = name;
	const btn = document.createElement("button");
	btn.className = "slider__slide-btn";
	btn.textContent = `Learn more`;


	divImage.append(image);
	slide.append(divImage);
	slide.append(title);
	slide.append(btn);

	return slide
};

function randomNum(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};

const getRandomPets = () => {
	let randNum = randomNum(0, cloneArrPets.length - 1);
	let randPet = cloneArrPets.splice(randNum, 1);
	arrShowSlides.push(randPet);

	if (count >= 2) {
		count = 0;
	} else {
		count++;
		getRandomPets();
	}
};

const addSlides = (wraper) => {
	getRandomPets();
	if (arrShowSlides.length >= 6) {
		arrShowSlides.splice(0, 3).forEach(el => cloneArrPets.push(el));
	}

	arrShowSlides = arrShowSlides.flat();
	wraper.innerHTML = "";
	arrShowSlides.forEach(el => {
		let newSlide = createSlide(el.img, el.name);
		wraper.append(newSlide);
	});
};

const switchSlider = () => {
	if (pushFirstWraper) {
		addSlides(firstSliderWraper);
		pushFirstWraper = false;
	} else {
		addSlides(secondSliderWraper);
		pushFirstWraper = true;
	}
}
switchSlider();

sliderBtns.forEach(el => el.addEventListener("click", () => {
	switchSlider();
	secondSliderWraper.classList.toggle("visible");
	wrapers.forEach(el => el.style = "0s ease");

	if (secondSliderWraper.classList.contains("visible")) {
		secondSliderWraper.style.transition = "1.5s ease 0.1s";
		firstSliderWraper.classList.add("unvisible");
	} else {
		firstSliderWraper.style.transition = "1.5s ease 0.1s";
		firstSliderWraper.classList.remove("unvisible");
	}
}));

