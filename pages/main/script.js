import { switchMenu } from "../../js_modules/_menuSwitching.js";

switchMenu();



new Swiper(".slider", {
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},



	// скорость переключения слайдов
	speed: 1500,

	breakpoints: {
		// when window width is >= 320px
		320: {
			slidesPerGroup: 1,
			slidesPerView: 1,
			spaceBetween: 30,
			speed: 600,
		},
		// when window width is >= 480px
		576: {
			slidesPerGroup: 2,
			slidesPerView: 2,
			spaceBetween: 20,
		},
		// when window width is >= 640px
		768: {
			slidesPerGroup: 2,
			slidesPerView: 2,
			spaceBetween: 40,
		},
		992: {
			slidesPerGroup: 3,
			slidesPerView: 3,
		},
		1279.999: {
			slidesPerGroup: 3,
			slidesPerView: 3,
			spaceBetween: 90,
		}

	},

	// Disable preloading of all images
	preloadImages: false,
	// Enable lazy loading
	lazy: {
		// подгружать на старте перек-я слайдера
		loadOnTransitionStart: false,
		// подгружать предыд-ю и след-ю картинку
		loadPrevNext: true,
	},
	// включаем когда больше 1 слайда или auto (loadPrevNext: true - не работает без них)
	watchSlidesProgress: true,
	watchSlidesVisibility: true,

	//------------------------------------------------------------------
	// Эффекты переключения слайдера
	effect: "slide", //- листание (по умолчанию), 

	/* effect: "fade", // - смена прозрачности (только для одного слайда)
	// Дополнительно к fade 
	fadeEffect: {
		//(поралельная смена прозрачности)
		crossFade: true
	},  */

	/* effect: "coverflow",
	// Дополнительно к coverflow 
	coverflowEffect: {
		rotate: 45,
		stretch: 50, // налажение  
		slideShadows: true,
	}, */

	/* effect: "flip", // - для одного слайда
	flipEffect: {
		slideShadows: false,
	}, */

	/* effect: "cube",
	cubeEffect: {
		slideShadows: false,
		shadow: true,
		shaddowOffset: 20,
		shadowScale: 0.94,
	}, */

	/* effect: 'cards',
	cardsEffect: {
		// ...
	}, */
	//----------------------------------------------------------------------------

	// Бесконечный слайдер
	loop: true,
	/* //Кол-во дублирующих слайтов.Нужно установить, если slidesPerView: 'auto'
	loopedSlides: 3, */

	// свободный режим
	// freeMode: true,

	// Делаем вертикальный слайдер (нужно установить hieght для слайдера)
	// direction: "vertical",

	// автопрокрутка
	/* autoplay: {
		delay: 3000,
		// заканчивать на последнем слайде, если нет тавтопрокрутки
		stopOnLastSlide: false,
		// отключить после ручного переключения
		disableOnInteraction: true,
	}, */

	//какой слайд будет показан первым (cx`n c 0)
	initialSlide: 0,

	//отключает слайдер, если слайдов меньше чем указано (выключил)
	watchOverflow: false,

	//подстраивание высоты слайдера под контент
	autoHeight: false,

	// чувствительность перетаскивания (при 0 - отключ-я)
	touchRatio: 0,

	// угол срабатывания перетаскивания
	touchAngle: 45,

	// изменяем курсор перетаскивания
	grabCursor: false,

	//Управление клавиатурой
	keyboard: {
		// вкл/выкл
		enabled: true,
		// вкл/выкл только, когда слайдер в пределах вьюпорта
		onlyInViewport: true,
		// управление стрелками
		pageUPDown: true,
	},

});

