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

const windowSlider = document.querySelector('.window__slider');
const doorSlider = document.querySelector('.door__slider');
const otherSlider = document.querySelector('.other__slider');

//Animations functions
// wmAnimations.mainAnimate();
if (window.innerWidth > 992) {

	wmAnimations.mainSlider(windowSlider);
	wmAnimations.doorSlider(doorSlider);
	wmAnimations.otherSlider(otherSlider);
} else {
	// wmAnimations.mainSliderMobile(windowSlider);
	// wmAnimations.doorSliderMobile(doorSlider);
	// wmAnimations.otherSliderMobile(otherSlider);
	wmAnimations.mainSlider(windowSlider);
	wmAnimations.doorSlider(doorSlider);
	wmAnimations.otherSlider(otherSlider);
}
//wmAnimations.mainNewTest();

// Mobile functions
if (window.innerWidth < 992) {
	wmMobile.aboutMobile();
	wmMobile.benefitsMobile();
	wmMobile.imagesMobile();
}