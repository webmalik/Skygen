//import $ from "jquery";
import gsap from 'gsap';
import * as THREE from 'three';

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { TextPlugin } from "gsap/TextPlugin.js";


import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


import { SplitText } from "./SplitText.js";

let typeOpts = {
	lines: { type: 'lines', linesClass: 'g-lines' },
	words: { type: 'words', },
	chars: { type: 'chars', }
};
let gOpts = {
	ease: 'power2.easeOut'
};

import { lenisS } from './functions.js';

gsap.registerPlugin(ScrollTrigger, SplitText);
gsap.registerPlugin(TextPlugin);


export function benefitsZoom() {
	const contents = document.querySelectorAll('.benefits__content');
	if (contents) {
		contents.forEach(content => {
			let image = content.previousElementSibling.children;
			content.addEventListener('mouseover', () => {
				gsap.to(image, { scale: 1.3, duration: 0 })
			})
			content.addEventListener('mouseleave', () => {
				gsap.to(image, { scale: 1, duration: 0 })
			})
		});
	}
}

function createScrollTriggerAbout(triggerName = "about") {
	const triggerSelector = `.${triggerName}`;
	const titleSelector = `.${triggerName}__title`;
	const textSelector = `.${triggerName}__text`;
	const imageSelector = `.${triggerName}__image`;
	const imageSelectorIMG = `.${triggerName}__image img`;

	ScrollTrigger.create({
		trigger: triggerSelector,
		start: 'top bottom',
		once: true,
		onEnter: () => {
			const homeIntroTitle = new SplitText(titleSelector, typeOpts.chars)
			const homeIntroLabel = new SplitText(textSelector, typeOpts.words)

			gsap.set(imageSelector, { clipPath: 'inset(10%)' })
			gsap.set(imageSelectorIMG, { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: textSelector,
					start: 'top top+=50%',
				},
				defaults: {
					ease: gOpts.ease
				},
				onComplete: () => {
					homeIntroLabel.revert()
					homeIntroTitle.revert()
					new SplitText(titleSelector, typeOpts.lines)
				}
			})
			tl
				.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .1, stagger: .02 })
				.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .1, stagger: .02 }, '<=.2')
				.to(imageSelector, { clipPath: 'inset(0%)', duration: 1, ease: 'expo.out' }, '<=.2')
				.to(imageSelectorIMG, { scale: 1, duration: 1, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=.2')
		}
	})
}


export function mainAnimations() {
	// createScrollTriggerAbout('about1');
	// createScrollTriggerAbout('about2');

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);

	window.addEventListener('resize', function () {
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		camera.aspect = newWidth / newHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(newWidth, newHeight);
	});

	function createCountingAnimation(selector, plus = false) {

		const targetElem = document.querySelector(selector);
		const targetValue = parseInt(targetElem.innerHTML);
		const startTime = performance.now();
		if (window.innerWidth > 992) {
			gsap.to({}, {
				duration: 2,
				scrollTrigger: {
					trigger: selector,
					start: 'bottom bottom',
					end: '70% 70%',
					once: true,
					onEnter: () => {
						let value = 0;
						const interval = setInterval(() => {
							value += targetValue / 100; // Змінюйте крок, який вам потрібен
							if (plus) {
								document.querySelector(selector).innerHTML = Math.round(value) + "+";
							} else {
								document.querySelector(selector).innerHTML = Math.round(value);
							}
							if (value >= targetValue) {
								clearInterval(interval);
							}
						}, 10);
					},
				},
			});
		} else {
			gsap.to({}, {
				duration: 2,
				scrollTrigger: {
					trigger: '.why__stats',
					start: 'top bottom',
					end: '20% 20%',
					once: true,
					//markers: true,
					onEnter: () => {
						let value = 0;
						const interval = setInterval(() => {
							value += targetValue / 100; // Змінюйте крок, який вам потрібен
							if (plus) {
								document.querySelector(selector).innerHTML = Math.round(value) + "+";
							} else {
								document.querySelector(selector).innerHTML = Math.round(value);
							}
							if (value >= targetValue) {
								clearInterval(interval);
							}
						}, 10);
					},
				},
			});
		}
	}

	createCountingAnimation('.num1', true);
	createCountingAnimation('.num2');
	createCountingAnimation('.num3');

	if (window.innerWidth > 992) {
		ScrollTrigger.create({
			trigger: '.why',
			start: 'top center',
			once: false,
			onEnter: () => {
				const homeIntroTitle = new SplitText('.why__title', typeOpts.chars)
				const homeIntroLabel = new SplitText('.why__text', typeOpts.words)
				const homeIntroLabelD = new SplitText('.why__text-div', typeOpts.words)

				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: '.why',
						start: 'top top+=50%',
					},
					defaults: {
						ease: gOpts.ease
					},
					onComplete: () => {
						new SplitText('.why__title', typeOpts.lines)
					}
				})
				tl
					.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .1, stagger: .01 }, '<=.05')
					.from(homeIntroLabelD.words, { yPercent: 60, autoAlpha: 0, duration: .1, stagger: .01 })
					.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .2, stagger: .01 })


			}
		})

	} else {
		ScrollTrigger.create({
			trigger: '.why',
			start: 'top bottom',
			once: false,
			onEnter: () => {
				const homeIntroTitle = new SplitText('.why__title', typeOpts.chars)
				const homeIntroLabel = new SplitText('.why__text', typeOpts.words)
				const homeIntroLabelD = new SplitText('.why__text-div', typeOpts.words)


				let tl = gsap.timeline({
					scrollTrigger: {
						trigger: '.why',
						start: 'top top+=50%',
					},
					defaults: {
						ease: gOpts.ease
					},
					onComplete: () => {
						new SplitText('.why__title', typeOpts.lines)
					}
				})
				tl
					.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .2, stagger: .02 }, '<=.1')
					.from(homeIntroLabelD.words, { yPercent: 60, autoAlpha: 0, duration: .2, stagger: .02 })
					.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .2, stagger: .02 })


			}
		})


	}

	let i = 0;
	const imagesImages = document.querySelectorAll(".images__item");
	const imagesWrapper = document.querySelector(".images__wrapper");
	const imagesActive = imagesImages[2];
	if (window.innerWidth > 992) {
		// Анімація для кожного зображення
		imagesImages.forEach((element, index) => {
			gsap.from(element, {
				scrollTrigger: {
					trigger: element,
					start: "top center", // Початок анімації при початку елементу
					end: "50% center", // Кінець анімації при кінці елементу
					scrub: true,
					//	markers: true, // Маркери для відлагодження (можна видалити у реальному використанні)
				},
				y: -10 * (index + 0.5), // Зсув по осі Y

			});
		});

		// Анімація для активного елемента
		gsap.from(imagesActive, {
			scrollTrigger: {
				trigger: imagesWrapper,
				start: "-50% center", // Початок анімації при початку контейнера
				end: "bottom center", // Кінець анімації при кінці контейнера
				scrub: true,
			},
			y: 10, // Зсув по осі Y

		});
	} else {
		// Анімація для кожного зображення
		imagesImages.forEach((element, index) => {
			gsap.from(element, {
				scrollTrigger: {
					trigger: element,
					start: "top center", // Початок анімації при початку елементу
					end: "50% center", // Кінець анімації при кінці елементу
					scrub: true,
					//	markers: true, // Маркери для відлагодження (можна видалити у реальному використанні)
				},
				y: -10 * (index + 0.5), // Зсув по осі Y

			});
		});

		// Анімація для активного елемента
		gsap.from(imagesActive, {
			scrollTrigger: {
				trigger: imagesWrapper,
				start: "-50% center", // Початок анімації при початку контейнера
				end: "bottom center", // Кінець анімації при кінці контейнера
				scrub: true,
			},
			y: 10, // Зсув по осі Y

		});
	}

}

export function productsAnimations() {
	createScrollTriggerAbout('about1');

	const imageSelector = document.querySelector('.products__image')
	const imageSelectorIMG = document.querySelector('.products__image img')
	document.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => {
			imageSelector.classList.remove('active')
		}, 500)
	})

	gsap.set(imageSelector, { clipPath: 'inset(10%)' })
	gsap.set(imageSelectorIMG, { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0, opacity: 0 })

	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: '.products',
			start: 'top top+=50%',
			onEnter: () => {
				imageSelector.classList.add('active')
			},
			once: true,
		},
		defaults: {
			ease: gOpts.ease
		},
	})
	tl
		.to(imageSelector, { clipPath: 'inset(0%)', duration: 1, ease: 'expo.out' }, '<=.2')
		.to(imageSelectorIMG, { scale: 1, duration: 1, autoAlpha: 1, opacity: 1, ease: 'expo.out', clearProps: 'transform' }, '<=.2')
}

export function mainAnimate() {
	gsap.from(".hero__title", {
		x: -200,
		opacity: 0,
		duration: 2,
		scrollTrigger: {
			trigger: ".hero__title",
			start: "top 80%",
			end: "top 80%",
			toggleActions: "play none none none",
			//markers: true
		}
	});

	gsap.from(".hero__text", {
		x: -200,
		opacity: 0,
		duration: 2,
		delay: 1,
		scrollTrigger: {
			trigger: ".hero__text",
			start: "top 80%",
			end: "top 80%",
			toggleActions: "play none none none",
			//markers: true
		}
	});
	gsap.from(".hero__button", {
		y: 100,
		opacity: 0,
		duration: 1,
		delay: 1.5,
		scrollTrigger: {
			trigger: ".hero__text",
			start: "top 80%",
			end: "top 80%",
			toggleActions: "play none none none",
			//markers: true
		}
	});

	gsap.from(".about__title", {
		x: 100,
		opacity: 0,
		duration: 1.5,
		scrollTrigger: {
			trigger: ".about__title",
			start: "top 80%",
			end: "top 80%",
			toggleActions: "play none none none",
			//markers: true
		}
	});

	gsap.from(".catalog__header", {
		x: 100,
		opacity: 0,
		duration: 1.5,
		scrollTrigger: {
			trigger: ".catalog__header",
			start: "top 80%",
			end: "top 80%",
			toggleActions: "play none none none",
			//markers: true
		}
	});

	const textElements = document.querySelectorAll(".text");

	let i = 0.5;

	textElements.forEach((element) => {
		i += 0.2;
		gsap.from(element, {
			y: 100 * 1,
			opacity: 0,
			duration: i,
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
				end: "top 80%",
				//markers: true
			}
		});
	});

	const catalogTitles = document.querySelectorAll(".catalog__title");

	catalogTitles.forEach((element) => {
		i += 0.2;
		gsap.from(element, {
			x: -100 * 1,
			opacity: 0,
			duration: i,
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
				end: "top 80%",
				//markers: true
			}
		});
	});

	const aboutImages = document.querySelectorAll(".about__image");

	aboutImages.forEach((element) => {
		i += 0.2;
		gsap.from(element, {
			//x: -100 * 1,
			opacity: 0,
			scale: 0.6,
			duration: 0.8,
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
				end: "top 80%",
				//markers: true
			}
		});
	});

	const catalogImages = document.querySelectorAll(".catalog__image");

	catalogImages.forEach((element) => {
		i += 0.2;
		gsap.from(element, {
			//x: -100 * 1,
			opacity: 0,
			scale: 0.6,
			duration: 0.8,
			scrollTrigger: {
				trigger: element,
				start: "top 80%",
				end: "top 80%",
				//markers: true
			}
		});
	});

	const imagesImages = document.querySelectorAll(".images__img");

	imagesImages.forEach((element) => {
		i += 0.7;
		gsap.from(element, {
			y: -100 * 1,
			opacity: 0,
			scale: 0.6,
			duration: 0.8,
			scrollTrigger: {
				trigger: element,
				start: "top top",
				end: "center center",
				markers: true
			}
		});
	});
}



export function mainSwiper() {
	const main = document.querySelector('.window__slider');
	const mainSlider = document.querySelector('.win__slider');
	const catalogItems = main.querySelectorAll('.catalog__item');
	const catalogWrapper = main.querySelector('.catalog__wrapper');
	const pagination = document.querySelector('.win__pagination');
	let prevSlide = 0;

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel, Pagination],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		pagination: {
			el: pagination,
			clickable: true,
		},
		mousewheel: {
			eventsTarget: '.window__slider',
			sensitivity: 5,
		},
	});
	mainSliderElement.mousewheel.disable();
	if (window.innerWidth > 992) {
		const scrollTriggerInstance = ScrollTrigger.create({
			trigger: mainSlider,
			start: 'top top',
			end: '5% top',
			onEnter: () => {
				mainSliderElement.mousewheel.enable();
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
			onLeaveBack: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
		});
	}

	mainSliderElement.on('scroll', function (event) {
		if (event.isEnd || event.isBeginning) {
			prevSlide += 1;
			if (prevSlide > 0) {
				setTimeout(() => {
					lenisS.start();
				}, 1000)
			}
		} else {
			prevSlide = 0;
			lenisS.stop();
			mainSliderElement.mousewheel.enable();
		}
	});

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
	});

	mainSliderElement.swiper = mainSliderElement;
	mainSliderElement.mousewheel = mainSliderElement.mousewheel || mainSliderElement;
}

export function doorSwiper() {
	const main = document.querySelector('.door__slider');
	const mainSlider = document.querySelector('.doo__slider');
	const catalogItems = main.querySelectorAll('.catalog__item');
	const catalogWrapper = main.querySelector('.catalog__wrapper');
	const pagination = document.querySelector('.door__pagination');
	let prevSlide = 0;

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel, Pagination],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		mousewheel: {
			eventsTarget: '.door__slider',
			sensitivity: 5,
		},
		pagination: {
			el: pagination,
			clickable: true,
		},
	});
	mainSliderElement.mousewheel.disable();
	if (window.innerWidth > 992) {
		const scrollTriggerInstance = ScrollTrigger.create({
			trigger: mainSlider,
			start: 'top top',
			end: '5% top',

			onEnter: () => {
				mainSliderElement.mousewheel.enable();
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
			onLeaveBack: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
		});
	}

	mainSliderElement.on('scroll', function (event) {
		if (event.isEnd || event.isBeginning) {
			prevSlide += 1;
			if (prevSlide > 0) {
				setTimeout(() => {
					lenisS.start();
				}, 1000)
			}
		} else {
			prevSlide = 0;
			lenisS.stop();
			mainSliderElement.mousewheel.enable();
		}
	});

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
	});

	mainSliderElement.swiper = mainSliderElement;
	mainSliderElement.mousewheel = mainSliderElement.mousewheel || mainSliderElement;
}

export function otherSwiper() {
	const main = document.querySelector('.other__slider');
	const mainSlider = document.querySelector('.ot__slider');
	const catalogItems = main.querySelectorAll('.catalog__item');
	const catalogWrapper = main.querySelector('.catalog__wrapper');
	const pagination = document.querySelector('.other__pagination');
	let prevSlide = 0;

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel, Pagination],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		mousewheel: {
			eventsTarget: '.other__slider',
			sensitivity: 5,
		},
		pagination: {
			el: pagination,
			clickable: true,
		},
	});
	mainSliderElement.mousewheel.disable();
	if (window.innerWidth > 992) {
		const scrollTriggerInstance = ScrollTrigger.create({
			trigger: main,
			start: 'top top',
			end: '5% top',
			onEnter: () => {
				mainSliderElement.mousewheel.enable();
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
			onLeaveBack: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
		});
	}

	mainSliderElement.on('scroll', function (event) {
		if (event.isEnd) {
			prevSlide += 1;
			if (prevSlide > 0) {
				setTimeout(() => {
					lenisS.start();
				}, 1000)
			}
		} else {
			prevSlide = 0;
			lenisS.stop();
			mainSliderElement.mousewheel.enable();
		}

		if (event.isBeginning) {
			prevSlide += 1;
			if (prevSlide > 0) {
				setTimeout(() => {
					lenisS.start();
				}, 1000)
			}
		} else {
			prevSlide = 0;
			lenisS.stop();
			mainSliderElement.mousewheel.enable();
		}
	});

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
	});

	mainSliderElement.swiper = mainSliderElement;
	mainSliderElement.mousewheel = mainSliderElement.mousewheel || mainSliderElement;
}

export function doorSwiperCom() {
	const main = document.querySelector('.door__slider');
	const mainSlider = document.querySelector('.doo__slider');
	const catalogItems = main.querySelectorAll('.catalog__item');
	const catalogWrapper = main.querySelector('.catalog__wrapper');
	const pagination = document.querySelector('.door__pagination');
	let prevSlide = 0;

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel, Pagination],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		mousewheel: {
			eventsTarget: '.door__slider',
			sensitivity: 5,
		},
		pagination: {
			el: pagination,
			clickable: true,
		},
	});
	mainSliderElement.mousewheel.disable();
	if (window.innerWidth > 992) {
		const scrollTriggerInstance = ScrollTrigger.create({
			trigger: mainSlider,
			start: 'top top',
			end: '5% top',
			onEnter: () => {
				mainSliderElement.mousewheel.enable();
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
			onLeaveBack: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
				mainSliderElement.slideTo(0);
			},
		});
	}

	mainSliderElement.on('scroll', function (event) {
		if (event.isEnd || event.isBeginning) {
			prevSlide += 1;
			if (prevSlide > 0) {
				setTimeout(() => {
					lenisS.start();
				}, 1000)
			}
		} else {
			prevSlide = 0;
			lenisS.stop();
			mainSliderElement.mousewheel.enable();
		}
	});

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
	});

	mainSliderElement.swiper = mainSliderElement;
	mainSliderElement.mousewheel = mainSliderElement.mousewheel || mainSliderElement;
}