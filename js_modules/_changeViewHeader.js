const header = document.querySelector(".header");

export function changeViewHeader() {
	window.addEventListener("scroll", checkScroll);
	function checkScroll() {
		if (window.scrollY > 5) {
			header.style.backgroundColor = "rgba(41, 41, 41, 0.6)";
			header.style.padding = "10px 0px";
		} else {
			header.style.backgroundColor = "rgba(41, 41, 41, 0)";
			header.style.padding = "60px 0px 0px 0px";
		}
	}
	checkScroll();
}
