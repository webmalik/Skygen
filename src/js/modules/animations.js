//import $ from "jquery";
import gsap from 'gsap';
import * as THREE from 'three';

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { TextPlugin } from "gsap/TextPlugin.js";
// import { Observer } from "gsap/Observer.js";
// import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";


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
				.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 })
				.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.2')
				.to(imageSelector, { clipPath: 'inset(0%)', duration: 2, ease: 'expo.out' }, '<=.4')
				.to(imageSelectorIMG, { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0.2')
		}
	})
}


export function mainAnimations() {
	createScrollTriggerAbout('about1');
	createScrollTriggerAbout('about2');

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

				// gsap.set('.why__image', { clipPath: 'inset(10%)' })
				// gsap.set('.why__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

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
					// .to('.why__image', { clipPath: 'inset(0%)', duration: 1, ease: 'expo.out' }, '<=.4')
					// .to('.why__image img', { scale: 1, duration: 1.4, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0')
					.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 })

				// if (window.innerWidth > 991) {
				// 	requestAnimationFrame(() => {
				// 		const tlScrub = gsap.timeline({
				// 			scrollTrigger: {
				// 				trigger: '.why',
				// 				start: 'top bottom',
				// 				end: 'bottom top',
				// 				scrub: true,
				// 			}
				// 		})
				// 		tlScrub
				// 			.fromTo('.why__image img', { bottom: '-20%' }, { bottom: '0%', ease: 'none' })
				// 	})
				// }
			}
		})
		//12.01

		// ScrollTrigger.create({
		// 	trigger: '.install',
		// 	start: 'top bottom',
		// 	once: false,
		// 	onEnter: () => {
		// 		const homeIntroTitle = new SplitText('.install__title', typeOpts.chars)
		// 		const homeIntroLabel = new SplitText('.install__text .text', typeOpts.words)

		// 		gsap.set('.install__image', { clipPath: 'inset(10%)' })
		// 		gsap.set('.install__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

		// 		let tl = gsap.timeline({
		// 			scrollTrigger: {
		// 				trigger: '.install',
		// 				start: 'top top+=50%',
		// 			},
		// 			defaults: {
		// 				ease: gOpts.ease
		// 			},
		// 			onComplete: () => {
		// 				homeIntroLabel.revert()
		// 				homeIntroTitle.revert()
		// 				new SplitText('.install__title div', typeOpts.lines)
		// 			}
		// 		})
		// 		tl
		// 			.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 })
		// 			.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.4')
		// 			.to('.install__image', { clipPath: 'inset(0%)', duration: 2, ease: 'expo.out' }, '<=.4')
		// 			.to('.install__image img', { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0')

		// 		if (window.innerWidth > 991) {
		// 			requestAnimationFrame(() => {
		// 				const tlScrub = gsap.timeline({
		// 					scrollTrigger: {
		// 						trigger: '.install',
		// 						start: 'top bottom',
		// 						end: 'bottom top',
		// 						scrub: true,
		// 					}
		// 				})
		// 				tlScrub
		// 					.fromTo('.install__image img', { bottom: '-20%' }, { bottom: '0%', ease: 'none' })
		// 			})
		// 		}
		// 	}
		// })

		// ScrollTrigger.create({
		// 	trigger: '.education',
		// 	start: 'top bottom',
		// 	once: false,
		// 	onEnter: () => {
		// 		const homeIntroTitle = new SplitText('.education__title', typeOpts.chars)
		// 		const homeIntroTitle2 = new SplitText('.education__header', typeOpts.chars)
		// 		//const homeIntroTitle3 = new SplitText('.education__link', typeOpts.chars)

		// 		gsap.set('.education__image', { clipPath: 'inset(10%)' })
		// 		gsap.set('.education__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

		// 		let tl = gsap.timeline({
		// 			scrollTrigger: {
		// 				trigger: '.education__title',
		// 				start: 'top top+=50%',
		// 			},
		// 			defaults: {
		// 				ease: gOpts.ease
		// 			},
		// 			onComplete: () => {
		// 				new SplitText('.education__title div', typeOpts.lines)
		// 				//new SplitText('.education__link div', typeOpts.lines)
		// 			}
		// 		})
		// 		tl
		// 			.to('.education__image', { clipPath: 'inset(0%)', duration: 2, ease: 'expo.out' }, '<=.4')
		// 			.to('.education__image img', { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0')
		// 			.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.1')
		// 			.from(homeIntroTitle2.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.2')
		// 		//.from(homeIntroTitle3.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.3')

		// 		if (window.innerWidth > 991) {
		// 			requestAnimationFrame(() => {
		// 				const tlScrub = gsap.timeline({
		// 					scrollTrigger: {
		// 						trigger: '.education',
		// 						start: 'top bottom',
		// 						end: 'bottom top',
		// 						scrub: true,
		// 					}
		// 				})
		// 				tlScrub
		// 					.fromTo('.education__image img', { bottom: '-20%' }, { bottom: '0%', ease: 'none' })
		// 			})
		// 		}
		// 	}
		// })
	} else {
		ScrollTrigger.create({
			trigger: '.why',
			start: 'top bottom',
			once: false,
			onEnter: () => {
				const homeIntroTitle = new SplitText('.why__title', typeOpts.chars)
				const homeIntroLabel = new SplitText('.why__text', typeOpts.words)
				const homeIntroLabelD = new SplitText('.why__text-div', typeOpts.words)

				// gsap.set('.why__image', { clipPath: 'inset(10%)', maxHeight: 0 })
				// gsap.set('.why__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

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
					.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.1')
					.from(homeIntroLabelD.words, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 })
					// .to('.why__image', { clipPath: 'inset(0%)', duration: 1, maxHeight: 400, ease: 'expo.out' }, '<=.4')
					// .to('.why__image img', { scale: 1, duration: 1.4, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0')
					.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 })

				// if (window.innerWidth > 991) {
				// 	requestAnimationFrame(() => {
				// 		const tlScrub = gsap.timeline({
				// 			scrollTrigger: {
				// 				trigger: '.why',
				// 				start: 'top bottom',
				// 				end: 'bottom top',
				// 				scrub: true,
				// 			}
				// 		})
				// 		tlScrub
				// 			.fromTo('.why__image img', { bottom: '-20%' }, { bottom: '0%', ease: 'none' })
				// 	})
				// }
			}
		})

		// ScrollTrigger.create({
		// 	trigger: '.install',
		// 	start: 'top bottom',
		// 	once: false,
		// 	onEnter: () => {
		// 		const homeIntroTitle = new SplitText('.install__title', typeOpts.chars)
		// 		const homeIntroLabel = new SplitText('.install__text .text', typeOpts.words)

		// 		gsap.set('.install__image', { clipPath: 'inset(10%)' })
		// 		gsap.set('.install__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

		// 		let tl = gsap.timeline({
		// 			scrollTrigger: {
		// 				trigger: '.install',
		// 				start: 'top top+=50%',
		// 			},
		// 			defaults: {
		// 				ease: gOpts.ease
		// 			},
		// 			onComplete: () => {
		// 				homeIntroLabel.revert()
		// 				homeIntroTitle.revert()
		// 				new SplitText('.install__title div', typeOpts.lines)
		// 			}
		// 		})
		// 		tl
		// 			.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .8, stagger: .02 })
		// 			.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .8, stagger: .02 }, '<=.8')
		// 			.to('.install__image', { clipPath: 'inset(0%)', duration: 4, ease: 'expo.out' }, '<=.8')
		// 			.to('.install__image img', { scale: 1, duration: 4, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0')

		// 		if (window.innerWidth > 991) {
		// 			requestAnimationFrame(() => {
		// 				const tlScrub = gsap.timeline({
		// 					scrollTrigger: {
		// 						trigger: '.install',
		// 						start: 'top bottom',
		// 						end: 'bottom top',
		// 						scrub: true,
		// 					}
		// 				})
		// 				tlScrub
		// 					.fromTo('.install__image img', { bottom: '-20%' }, { bottom: '0%', ease: 'none' })
		// 			})
		// 		}
		// 	}
		// })
	}

	let i = 0;
	const imagesImages = document.querySelectorAll(".images__item");
	const imagesWrapper = document.querySelector(".images__wrapper");
	const imagesActive = imagesImages[2];
	console.log(imagesActive)
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

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
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
				mainSliderElement.slideTo(0)
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
			},
		});
	}



	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
		if (activeIndex === mainSliderElement.slides.length - 1) {
			setTimeout(() => {
				lenisS.start();
			}, 1000)
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

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		mousewheel: {
			eventsTarget: '.door__slider',
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
				mainSliderElement.slideTo(0)
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
			},
		});
	}

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
		if (activeIndex === mainSliderElement.slides.length - 1) {
			setTimeout(() => {
				lenisS.start();
			}, 1000)
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

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		mousewheel: {
			eventsTarget: '.other__slider',
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
				mainSliderElement.slideTo(0)
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
			},
		});
	}

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
		if (activeIndex === mainSliderElement.slides.length - 1) {
			setTimeout(() => {
				lenisS.start();
			}, 1000)
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

	const mainSliderElement = new Swiper(mainSlider, {
		modules: [Mousewheel],
		speed: 1000,
		spaceBetween: 10,
		slidesPerView: 1,
		centeredSlides: true,
		mousewheel: {
			eventsTarget: '.door__slider',
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
				mainSliderElement.slideTo(0)
				lenisS.stop();
			},
			onLeave: () => {
				mainSliderElement.mousewheel.disable();
				lenisS.start();
			},
		});
	}

	mainSliderElement.on('slideChange', function () {
		const activeIndex = mainSliderElement.activeIndex;
		catalogItems.forEach((item) => {
			item.classList.add('noactive');
		})
		catalogItems[activeIndex].classList.remove('noactive');
		if (window.innerWidth < 992) {
			gsap.to(catalogWrapper, { xPercent: activeIndex * -100, duration: 0.9 })
		}
		if (activeIndex === mainSliderElement.slides.length - 1) {
			setTimeout(() => {
				lenisS.start();
			}, 1000)
		}
	});

	mainSliderElement.swiper = mainSliderElement;
	mainSliderElement.mousewheel = mainSliderElement.mousewheel || mainSliderElement;
}




/*
export function mainSlider(mainSlider) {

	const catalogContainer = mainSlider.querySelector('.catalog__container');
	const catalogImage = mainSlider.querySelectorAll('.catalog__image img');
	const catalogImageC = mainSlider.querySelector('.catalog__image');
	const catalogItems = mainSlider.querySelectorAll('.catalog__item');
	const catalogWrapper = mainSlider.querySelector('.catalog__wrapper');


	let gap = calculateGap();
	let gapAll = gap * catalogImage.length;

	let gapPersent = gap / catalogImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = catalogImage.length - 1;

	catalogImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const elementOffsetTop = getElementOffsetTop(catalogContainer);

	allWidth = allWidth + gapAll


	const tl = gsap.timeline();

	tl.fromTo(catalogImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (catalogImage.length - 1) + gapPersent });

	ScrollTrigger.create({
		animation: tl,
		trigger: catalogContainer,
		start: 'top -100px',
		end: () => {
			return elementOffsetTop + 3000;
		},
		scrub: 1,
		pin: true,
		//once: true,
		// onComplete: () => {
		// 	tl.progress(1);
		// 	tl.kill();
		// 	ScrollTrigger.pin = false;
		// 	console.log("ScrollTrigger.pin")
		// },
		// onComplete: (self) => {
		// 	self.scrollTrigger.kill(true);
		// },
		onUpdate: (self) => {

			// const currentXPercent = gsap.getProperty(catalogImageC, 'xPercent');

			// const percentScrolled = -currentXPercent;

			// const totalWidth = catalogImageC.offsetWidth + gap * (catalogImage.length - 1);

			// const positionInPixels = (percentScrolled / 100) * totalWidth;


			// console.log(i)
			//const i = Math.floor(positionInPixels / (catalogImageC.offsetWidth + gap));

			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}
			const currentItem = catalogItems[i];

			let progress = self.progress + 0.5

			let normalizedPercentScrolled = ((progress * (slides + 1)) * 100) % 100;


			if (normalizedPercentScrolled <= 50) {
				normalizedPercentScrolled = 50
			}

			if (normalizedPercentScrolled >= 100) {
				normalizedPercentScrolled = 100
			}
			//normalizedPercentScrolled = normalizedPercentScrolled

			console.log(normalizedPercentScrolled)

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(catalogWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			catalogItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function doorSlider(doorSlider) {

	const doorContainer = doorSlider.querySelector('.door__container');
	const doorImage = doorSlider.querySelectorAll('.door__image img');
	const doorImageC = doorSlider.querySelector('.door__image');
	const doorItems = doorSlider.querySelectorAll('.door__item');
	const doorWrapper = doorSlider.querySelector('.door__wrapper');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * doorImage.length;

	let gapPersent = gap / doorImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = doorImage.length - 1;

	doorImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const doorOffsetTop = getElementOffsetTop(doorContainer);

	allWidth = allWidth + gapAll

	const tl2 = gsap.timeline();

	tl2.fromTo(doorImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (doorImage.length - 1) + (gapPersent / doorImage.length) });

	ScrollTrigger.create({
		animation: tl2,
		trigger: doorContainer,
		start: 'top -100px',
		end: () => {
			return doorOffsetTop + 5000;
		},
		scrub: 1,
		pin: true,
		//once: true,
		onUpdate: (self) => {

			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}
			const currentItem = doorItems[i];

			let normalizedPercentScrolled = (((self.progress + 0.1) * (slides + 1)) * 100) % 100;
			if (normalizedPercentScrolled >= 100) {
				normalizedPercentScrolled = 100
			}
			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(doorWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			doorItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function doorSliderCom(doorSlider) {

	const doorContainer = doorSlider.querySelector('.door__container');
	const doorImage = doorSlider.querySelectorAll('.door__image img');
	const doorImageC = doorSlider.querySelector('.door__image');
	const doorItems = doorSlider.querySelectorAll('.door__item');
	const doorWrapper = doorSlider.querySelector('.door__wrapper');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * doorImage.length;

	let gapPersent = gap / doorImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = doorImage.length - 1;

	doorImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const doorOffsetTop = getElementOffsetTop(doorContainer);

	allWidth = allWidth + gapAll

	const tl2 = gsap.timeline();

	tl2.fromTo(doorImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (doorImage.length - 1) + (gapPersent / doorImage.length) });

	ScrollTrigger.create({
		animation: tl2,
		trigger: doorContainer,
		start: 'top -100px',
		end: () => {
			return doorOffsetTop + 2000;
		},
		scrub: 1,
		pin: true,
		//once: true,
		onUpdate: (self) => {

			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}
			const currentItem = doorItems[i];

			let normalizedPercentScrolled = (((self.progress + 0.1) * (slides + 1)) * 100) % 100;
			if (normalizedPercentScrolled >= 100) {
				normalizedPercentScrolled = 100
			}
			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(doorWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			doorItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function otherSlider(otherSlider) {

	const otherContainer = otherSlider.querySelector('.other__container');
	const otherImage = otherSlider.querySelectorAll('.other__image img');
	const otherImageC = otherSlider.querySelector('.other__image');
	const otherItems = otherSlider.querySelectorAll('.other__item');
	const otherWrapper = otherSlider.querySelector('.other__wrapper');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * otherImage.length;

	let gapPersent = gap / otherImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = otherImage.length - 1;

	otherImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const otherOffsetTop = getElementOffsetTop(otherContainer);

	allWidth = allWidth + gapAll

	const tl3 = gsap.timeline();

	tl3.fromTo(otherImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (otherImage.length - 1) + gapPersent });

	ScrollTrigger.create({
		animation: tl3,
		trigger: otherContainer,
		start: 'top -100px',
		end: () => {
			return otherOffsetTop + 8000;
		},
		scrub: 1,
		pin: true,
		onUpdate: (self) => {

			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}

			let normalizedPercentScrolled = (((self.progress + 0.1) * (slides + 1)) * 100) % 100;

			const currentItem = otherItems[i];

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(otherWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			otherItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function mainSliderM(mainSlider) {

	const catalogContainer = mainSlider.querySelector('.catalog__container');
	const catalogImage = mainSlider.querySelectorAll('.catalog__image img');
	const catalogImageC = mainSlider.querySelector('.catalog__image');
	const catalogItems = mainSlider.querySelectorAll('.catalog__item');
	const catalogWrapper = mainSlider.querySelector('.catalog__wrapper');


	let gap = calculateGap();
	let gapAll = gap * catalogImage.length;

	let gapPersent = gap / catalogImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = catalogImage.length - 1;

	catalogImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const elementOffsetTop = getElementOffsetTop(catalogContainer);

	allWidth = allWidth + gapAll


	const tl = gsap.timeline();

	tl.fromTo(catalogImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (catalogImage.length - 1) + gapPersent });

	ScrollTrigger.create({
		animation: tl,
		trigger: catalogContainer,
		start: 'top top',
		end: () => {
			return elementOffsetTop + 13000;
		},
		scrub: 5,
		pin: true,
		//once: true,
		// onComplete: () => {
		// 	tl.progress(1);
		// 	tl.kill();
		// 	ScrollTrigger.pin = false;
		// 	console.log("ScrollTrigger.pin")
		// },
		// onComplete: (self) => {
		// 	self.scrollTrigger.kill(true);
		// },
		onUpdate: (self) => {

			// const currentXPercent = gsap.getProperty(catalogImageC, 'xPercent');

			// const percentScrolled = -currentXPercent;

			// const totalWidth = catalogImageC.offsetWidth + gap * (catalogImage.length - 1);

			// const positionInPixels = (percentScrolled / 100) * totalWidth;


			// console.log(i)
			//const i = Math.floor(positionInPixels / (catalogImageC.offsetWidth + gap));

			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}
			const currentItem = catalogItems[i];

			let normalizedPercentScrolled = (((self.progress + 0.5) * (slides + 1)) * 100) % 100;
			if (normalizedPercentScrolled >= 100) {
				normalizedPercentScrolled = 100
			}
			//console.log(normalizedPercentScrolled)

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(catalogWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			catalogItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function doorSliderM(doorSlider) {

	const doorContainer = doorSlider.querySelector('.door__container');
	const doorImage = doorSlider.querySelectorAll('.door__image img');
	const doorImageC = doorSlider.querySelector('.door__image');
	const doorItems = doorSlider.querySelectorAll('.door__item');
	const doorWrapper = doorSlider.querySelector('.door__wrapper');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * doorImage.length;

	let gapPersent = gap / doorImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = doorImage.length - 1;

	doorImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const doorOffsetTop = getElementOffsetTop(doorContainer);

	allWidth = allWidth + gapAll

	const tl2 = gsap.timeline();

	tl2.fromTo(doorImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (doorImage.length - 1) + (gapPersent / doorImage.length) });

	ScrollTrigger.create({
		animation: tl2,
		trigger: doorContainer,
		start: 'top top',
		end: () => {
			return doorOffsetTop + 20000;
		},
		scrub: 5,
		pin: true,
		//once: true,
		onUpdate: (self) => {


			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}
			const currentItem = doorItems[i];

			let normalizedPercentScrolled = (((self.progress + 0.1) * (slides + 1)) * 100) % 100;
			if (normalizedPercentScrolled >= 100) {
				normalizedPercentScrolled = 100
			}
			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(doorWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			doorItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function doorSliderMCom(doorSlider) {

	const doorContainer = doorSlider.querySelector('.door__container');
	const doorImage = doorSlider.querySelectorAll('.door__image img');
	const doorImageC = doorSlider.querySelector('.door__image');
	const doorItems = doorSlider.querySelectorAll('.door__item');
	const doorWrapper = doorSlider.querySelector('.door__wrapper');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * doorImage.length;

	let gapPersent = gap / doorImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = doorImage.length - 1;

	doorImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const doorOffsetTop = getElementOffsetTop(doorContainer);

	allWidth = allWidth + gapAll

	const tl2 = gsap.timeline();

	tl2.fromTo(doorImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (doorImage.length - 1) + (gapPersent / doorImage.length) });

	ScrollTrigger.create({
		animation: tl2,
		trigger: doorContainer,
		start: 'top top',
		end: () => {
			return doorOffsetTop + 4000;
		},
		scrub: 5,
		pin: true,
		//once: true,
		onUpdate: (self) => {


			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}
			const currentItem = doorItems[i];

			let normalizedPercentScrolled = (((self.progress + 0.1) * (slides + 1)) * 100) % 100;
			if (normalizedPercentScrolled >= 100) {
				normalizedPercentScrolled = 100
			}
			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(doorWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			doorItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function otherSliderM(otherSlider) {

	const otherContainer = otherSlider.querySelector('.other__container');
	const otherImage = otherSlider.querySelectorAll('.other__image img');
	const otherImageC = otherSlider.querySelector('.other__image');
	const otherItems = otherSlider.querySelectorAll('.other__item');
	const otherWrapper = otherSlider.querySelector('.other__wrapper');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * otherImage.length;

	let gapPersent = gap / otherImageC.offsetWidth * 100;

	let allWidth = 0

	let slides = otherImage.length - 1;

	otherImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const otherOffsetTop = getElementOffsetTop(otherContainer);

	allWidth = allWidth + gapAll

	const tl3 = gsap.timeline();

	tl3.fromTo(otherImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (otherImage.length - 1) + gapPersent });

	ScrollTrigger.create({
		animation: tl3,
		trigger: otherContainer,
		start: 'top top',
		end: () => {
			return otherOffsetTop + 28000;
		},
		scrub: 5,
		pin: true,
		onUpdate: (self) => {

			let i = Math.floor((self.progress + 0.1) * (slides + 1));
			if (i >= slides + 1) {
				i = slides + 1
			}

			let normalizedPercentScrolled = (((self.progress + 0.1) * (slides + 1)) * 100) % 100;
			const currentItem = otherItems[i];

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
				if (window.innerWidth < 992) {
					gsap.to(otherWrapper, { xPercent: -i * 100, duration: 1 })
				}
			}

			otherItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

function calculateGap() {
	const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
	const calculatedValue = 20 + 10.08 * ((vw - 393) / 920);
	return calculatedValue;
}

function getElementOffsetTop(element) {
	let offsetTop = 0;

	while (element) {
		offsetTop += element.offsetTop;
		element = element.offsetParent;
	}

	return offsetTop;
}
*/