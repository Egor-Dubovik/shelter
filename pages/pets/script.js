import { switchMenu } from "../../js_modules/menuSwitching.js";
import { switchPopap } from "../../js_modules/switchPopap.js";
import { arrPets } from "../../js_modules/arrPets.js";

switchMenu();

const paginationWraper = document.querySelector(".pagination__wraper");
const ourFriendsContent = document.querySelector(".our-friends__content");
const paginationCurrentPage = document.querySelector(".pagination__btn_current-page");
const paginationBtns = document.querySelectorAll(".pagination__btn");
const paginationBtnEnd = document.querySelector(".pagination__btn_end");
const paginationBtnNext = document.querySelector(".pagination__btn_next");
const paginationBtnPrev = document.querySelector(".pagination__btn_prev");
const paginationBtnBegin = document.querySelector(".pagination__btn_begin");

let cloneArrPets = [...arrPets];
let randomPetsArr = [];


//** creation function  -------------------------------------------------------------------
function randomNum(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};

const createRandomPetsArr = (amountCards = 8) => {
	for (let i = 0; i < 48; i++) {
		const currentIndex = randomNum(0, cloneArrPets.length - 1);
		const randomPet = cloneArrPets.splice(currentIndex, 1);

		if (cloneArrPets.length <= arrPets.length - amountCards) {
			arrPets.forEach(pet => {
				if (!cloneArrPets.some(clonePet => clonePet.name === pet.name)) {
					cloneArrPets.push(pet);
				}
			})
		}

		randomPetsArr.push(randomPet[0]);
	}
}


const createItemPet = (src, name) => {
	const item = document.createElement("div");
	item.className = "our-friends__item-pet pet-item";
	item.dataset.petName = name;
	const divImage = document.createElement("div");
	divImage.className = "pet-item__image";
	const image = document.createElement("img");
	image.src = src;
	image.alt = `pet ${name}`;
	const title = document.createElement("h4");
	title.className = "pet-item__title";
	title.textContent = name;
	const btn = document.createElement("button");
	btn.className = "pet-item__btn";
	btn.textContent = `Learn more`;

	divImage.append(image);
	item.append(divImage);
	item.append(title);
	item.append(btn);

	return item
};

//** inner Items -------------------------------------------------------------------
let currentPage = 0;
let amountCards = 0;
let animationSwitchPage = true;

function innerItems(startNum, endNum) {
	ourFriendsContent.innerHTML = '';
	if (animationSwitchPage) {
		ourFriendsContent.classList.add("animate");
		setTimeout(() => {
			ourFriendsContent.classList.remove("animate");
		}, 1000);
	}

	for (let i = startNum; i < endNum; i++) {
		const srcPet = randomPetsArr[i].img;
		const namePet = randomPetsArr[i].name;
		ourFriendsContent.append(createItemPet(srcPet, namePet));
	}
	paginationCurrentPage.textContent = currentPage;
}

//** Pagination -------------------------------------------------------------------
const showCurrentPage = () => {
	let width = document.documentElement.clientWidth;
	currentPage = 1;

	removeLockPaginationBtns(paginationBtns);
	addLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);

	if (width >= 1230) {
		amountCards = 8;
		createRandomPetsArr(amountCards)
		innerItems(0, 8);
	} else if (width >= 576) {
		amountCards = 6;
		createRandomPetsArr(amountCards)
		innerItems(0, 6);
	} else {
		amountCards = 3;
		createRandomPetsArr(amountCards)
		innerItems(0, 3);
	}
	switchPopap();
}
showCurrentPage();

window.addEventListener("resize", () => {
	randomPetsArr.length = 0;
	showCurrentPage();
});


function addLockPaginationBtns(arrBtns) {
	arrBtns.forEach(btn => btn.classList.add("lock-btn"));
}

function removeLockPaginationBtns(arrBtns) {
	arrBtns.forEach(btn => btn.classList.remove("lock-btn"));
}

paginationWraper.addEventListener("click", (e) => {
	turnThePages(e);
	paginationWraper.style.pointerEvents = "none";
	setTimeout(() => {
		paginationWraper.style.pointerEvents = "auto";
	}, 800)
});


function turnThePages(e) {
	animationSwitchPage = false;

	if (e.target.classList.contains("pagination__btn_next")) {
		removeLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);
		currentPage++;
		animationSwitchPage = true;

		if (amountCards * currentPage >= randomPetsArr.length) {
			addLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);
		}
	} else if (e.target.classList.contains("pagination__btn_prev")) {
		removeLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);
		currentPage--;
		animationSwitchPage = true;

		if (amountCards * currentPage <= amountCards) {
			addLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);
		}
	} else if (e.target.classList.contains("pagination__btn_end")) {
		removeLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);

		while (amountCards * currentPage < randomPetsArr.length) {
			currentPage++;
		}
		addLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);
		animationSwitchPage = true;
	} else if (e.target.classList.contains("pagination__btn_begin")) {
		removeLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);

		while (amountCards * currentPage > amountCards) {
			currentPage--;
		}
		addLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);
		animationSwitchPage = true;
	}

	innerItems(amountCards * (currentPage - 1), amountCards * currentPage);
	switchPopap();
}




