const infoPopap = document.querySelector(".info-popap");
const btnPopapClose = document.querySelector('.info-popap__btn-close');
const sliderBtns = document.querySelectorAll(".slider__btn");


export const showPopap = () => {
	const learnMoreBtns = document.querySelectorAll(".slider__slide-btn");

	learnMoreBtns.forEach(btn => {
		btn.addEventListener("click", () => {
			infoPopap.classList.add("active");
			document.body.classList.add("lock");
		});
	});

	btnPopapClose.addEventListener("click", () => {
		infoPopap.classList.remove("active");
		document.body.classList.remove("lock");
	});

	document.addEventListener("mousedown", (e) => {
		if (!e.target.closest(".menu") && !e.target.closest(".info-popap__content")) {
			infoPopap.classList.remove("active");
			document.body.classList.remove("lock");
		}
	});
}

sliderBtns.forEach(btn => {
	btn.addEventListener("click", showPopap);
});