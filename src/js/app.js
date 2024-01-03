import * as wmRoot from "./modules/root.js"
import * as wmFunctions from "./modules/functions.js"
import * as wmMobile from "./modules/mobile.js"

// Root functions

wmRoot.isWebp();
wmRoot.project();

wmFunctions.lenisScroll();
wmFunctions.burgerMenu();
// wmFunctions.mainAnimate();
// wmFunctions.mainGSlider();
wmFunctions.mainNewTest();
wmFunctions.accordion();
wmFunctions.faq();

// Mobile functions
if (window.innerWidth < 992) {
	wmMobile.aboutMobile();
	wmMobile.benefitsMobile();
	wmMobile.imagesMobile();
}