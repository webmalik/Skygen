import * as wmRoot from "./modules/root.js"
import * as wmFunctions from "./modules/functions.js"
import * as wmAnimations from "./modules/animations.js"
import * as wmMobile from "./modules/mobile.js"
import * as wmProducts from "./modules/products.js"

// Pages

const page = document.querySelector('.page')
const select = document.querySelector('.select')
const commercial = document.querySelector('.commercial')
const windowProducts = document.querySelector('.window-catalog')
const otherProducts = document.querySelector('.other-catalog')
const doorProducts = document.querySelector('.door-catalog')

//Animations variables

const windowSlider = document.querySelector('.window__slider')
const doorSlider = document.querySelector('.door__slider')
const otherSlider = document.querySelector('.other__slider')

// Root functions

//wmRoot.isWebp();
<<<<<<< HEAD
// wmRoot.preloader();
=======
>>>>>>> 4e31b941ac5e4e50071b3bbcdb96c6cc6db3b151
wmRoot.project();
wmRoot.fixWP();
wmRoot.fixP();

// Functions
wmFunctions.lenisScroll();
wmFunctions.headerFix();
document.addEventListener("DOMContentLoaded", function () {
	setTimeout(() => {
		wmFunctions.burgerMenu();
		wmFunctions.pageNav();
		wmFunctions.modal();
		wmFunctions.modal_window();
		wmRoot.catalogFiles();
	}, 100);
});
wmFunctions.accordion();
wmFunctions.faq();
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

if (windowProducts) {
	wmAnimations.productsAnimations();
	wmProducts.productsInit();
}

if (otherProducts) {
	wmAnimations.productsAnimations();
	wmProducts.productsInit();
}
if (doorProducts) {
	wmAnimations.productsAnimations();
	wmProducts.productsInit();
}