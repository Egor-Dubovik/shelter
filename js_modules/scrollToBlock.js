const anchors = document.querySelectorAll("a[href*='#']");
const sections = document.querySelectorAll("section");

export function scrollToblock() {
	for (let anchor of anchors) {
		anchor.addEventListener("click", function (e) {
			e.preventDefault();
			const blockID = anchor.getAttribute("href");
			scrollFeature(document.querySelector("" + blockID));
		})

	}
}

function scrollFeature(event) {
	window.scroll({
		left: 0,
		top: event.offsetTop - 80.13,
		behavior: "smooth"
	})
}

export function scrollDecorationLink() {
	window.onscroll = () => {
		let currentSection = "";

		sections.forEach(section => {
			let sectionTop = "";

			if (section.id === "contacts") {
				sectionTop = section.offsetTop - 50;
			} else {
				sectionTop = section.offsetTop;
			}

			if (window.pageYOffset >= sectionTop - 80) {
				currentSection = section.getAttribute("id");
			}
		});

		anchors.forEach(anchor => {
			anchor.classList.remove("active");
			const sectionId = anchor.getAttribute("href").slice(1);
			if (sectionId === currentSection) {
				anchor.classList.add("active");
			}
		});
	}
}