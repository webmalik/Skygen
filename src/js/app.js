import * as wmRoot from "./modules/root.js"
import * as wmFunctions from "./modules/functions.js"
import * as wmAnimations from "./modules/animations.js"
import * as wmMobile from "./modules/mobile.js"

// Pages

const page = document.querySelector('.page')
const select = document.querySelector('.select')
const commercial = document.querySelector('.commercial')
const windowProducts = document.querySelector('.window-catalog')

//Animations variables

const windowSlider = document.querySelector('.window__slider')
const doorSlider = document.querySelector('.door__slider')
const otherSlider = document.querySelector('.other__slider')

// Root functions

wmRoot.isWebp();
wmRoot.project();

// Functions
wmFunctions.lenisScroll();
wmFunctions.burgerMenu();
wmFunctions.accordion();
wmFunctions.faq();
wmFunctions.modal();
wmFunctions.pageNav();
wmFunctions.fancy();
wmFunctions.backToTop();

if (page) {


	//Animations functions
	wmAnimations.benefitsZoom();
	wmAnimations.mainAnimations();

	wmAnimations.mainSwiper();
	wmAnimations.doorSwiper();

	wmAnimations.otherSwiper();



	// Mobile functions
	if (window.innerWidth < 992) {
		wmMobile.aboutMobile();
		wmMobile.benefitsMobile();
		wmMobile.imagesMobile();
		wmMobile.education();
	}
}

if (commercial) {

	//Animations functions
	wmAnimations.benefitsZoom();

	wmAnimations.doorSwiperCom();

	// Mobile functions
	if (window.innerWidth < 992) {
		wmMobile.benefitsMobile();
		wmMobile.education();
	}
}

