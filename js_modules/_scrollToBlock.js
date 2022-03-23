const anchors = document.querySelectorAll("a[href*='#']");

export function scrollToblock() {
	for (let anchor of anchors) {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const blockID = anchor.getAttribute("href");
			scrollTo(document.querySelector("" + blockID));
		})

	}
}

function scrollTo(event) {
	window.scroll({
		left: 0,
		top: event.offsetTop - 80.13,
		behavior: "smooth"
	})
};