import * as wmRoot from "./modules/root.js"
import * as wmFunctions from "./modules/functions.js"
import * as wmAnimations from "./modules/animations.js"
import * as wmMobile from "./modules/mobile.js"

// Root functions

wmRoot.isWebp();
wmRoot.project();

// Functions
wmFunctions.lenisScroll();
wmFunctions.burgerMenu();
wmFunctions.accordion();
wmFunctions.faq();

//Animations variables

const mainSlider = document.querySelector('.main__slider');

//Animations functions
// wmAnimations.mainAnimate();
wmAnimations.mainSlider(mainSlider);
//wmAnimations.mainNewTest();

// Mobile functions
if (window.innerWidth < 992) {
	wmMobile.aboutMobile();
	wmMobile.benefitsMobile();
	wmMobile.imagesMobile();
}