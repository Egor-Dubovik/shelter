import { switchMenu } from "../../js_modules/_menuSwitching.js";
import { switchPopap } from "../../js_modules/_switchPopap.js";


switchMenu();






import { arrPets } from "../../js_modules/arrPets.js";
const paginationWraper = document.querySelector(".pagination__wraper");
const ourFriendsContent = document.querySelector(".our-friends__content");
const paginationCurrentPage = document.querySelector(".pagination__btn_current-page");
const paginationBtns = document.querySelectorAll(".pagination__btn");
const paginationBtnEnd = document.querySelector(".pagination__btn_end");
const paginationBtnNext = document.querySelector(".pagination__btn_next");
const paginationBtnPrev = document.querySelector(".pagination__btn_prev");
const paginationBtnBegin = document.querySelector(".pagination__btn_begin");

let cloneArrPets = [...arrPets];
let prev8ItemsArr = [];
let randomPetsArr = [];


let temporaryArr = [];


function randomNum(min, max) {
	// случайное число от min до (max+1)
	let rand = min + Math.random() * (max + 1 - min);
	return Math.floor(rand);
};



const createItems = () => {

	if (prev8ItemsArr.length < 8) {
		randomPetsArr = [...cloneArrPets];
		prev8ItemsArr = [...cloneArrPets];
	} else {
		for (let i = 0; i < 8; i++) {
			if (randomPetsArr.length >= 48) break;
			const currentIndex = randomNum(0, cloneArrPets.length - 1);
			const randomPet = cloneArrPets.splice(currentIndex, 1);

			if (prev8ItemsArr[i].name === randomPet[0].name) {
				temporaryArr.push(randomPet[0])
				continue; // !!!!!!
			} else {
				randomPetsArr.push(randomPet[0]);
				prev8ItemsArr.push(randomPet[0]);
			}
		}
	}
	randomPetsArr = randomPetsArr.concat(temporaryArr);
	temporaryArr.length = 0;

	cloneArrPets = [...arrPets];


	if (randomPetsArr.length < 48) {
		createItems();
	} else {
		randomPetsArr = randomPetsArr.flat()
	}
}
createItems();



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

let currentPage = 0;
let amountPage = 0;

function innerItems(startNum, endNum) {
	ourFriendsContent.innerHTML = '';

	for (let i = startNum; i < endNum; i++) {
		const srcPet = randomPetsArr[i].img;
		const namePet = randomPetsArr[i].name;
		ourFriendsContent.append(createItemPet(srcPet, namePet));
	}
	paginationCurrentPage.textContent = currentPage;
}



const showCurrentPage = () => {
	let width = window.innerWidth;
	currentPage = 1;

	removeLockPaginationBtns(paginationBtns);
	addLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);

	if (width >= 1230) {
		amountPage = 8;
		innerItems(0, 8);
	} else if (width >= 576) {
		amountPage = 6;
		innerItems(0, 6);
	} else {
		amountPage = 3;
		innerItems(0, 3);
	}
	switchPopap();
}
showCurrentPage();
window.addEventListener("resize", showCurrentPage);


function addLockPaginationBtns(arrBtns) {
	arrBtns.forEach(btn => btn.classList.add("lock-btn"));
}

function removeLockPaginationBtns(arrBtns) {
	arrBtns.forEach(btn => btn.classList.remove("lock-btn"));
}

paginationWraper.addEventListener("click", turnThePages);


function turnThePages(e) {
	if (e.target.classList.contains("pagination__btn_next")) {
		removeLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);
		currentPage++;

		if (amountPage * currentPage >= randomPetsArr.length) {
			addLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);
		}

	} else if (e.target.classList.contains("pagination__btn_prev")) {
		removeLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);
		currentPage--;

		if (amountPage * currentPage <= amountPage) {
			addLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);
		}
	} else if (e.target.classList.contains("pagination__btn_end")) {
		removeLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);

		while (amountPage * currentPage < randomPetsArr.length) {
			currentPage++;
		}
		addLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);
	} else if (e.target.classList.contains("pagination__btn_begin")) {
		removeLockPaginationBtns([paginationBtnEnd, paginationBtnNext]);

		while (amountPage * currentPage > amountPage) {
			currentPage--;
		}
		addLockPaginationBtns([paginationBtnPrev, paginationBtnBegin]);
	}

	innerItems(amountPage * (currentPage - 1), amountPage * currentPage);
	switchPopap();
}




switchPopap();