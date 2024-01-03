//import $ from "jquery";
import gsap from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
// import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
// import { Observer } from "gsap/Observer.js";
// import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";

import { SplitText } from "./SplitText.js";

let typeOpts = {
	lines: { type: 'lines', linesClass: 'g-lines' },
	words: { type: 'words,lines', linesClass: 'g-lines' },
	chars: { type: 'chars,words,lines', linesClass: 'g-lines' }
};
let gOpts = {
	ease: 'power2.easeOut'
};

let lenis;

gsap.registerPlugin(ScrollTrigger, SplitText);

export function mainNewTest() {

	ScrollTrigger.create({
		trigger: '.about',
		start: 'top bottom',
		once: false,
		onEnter: () => {
			const homeIntroTitle = new SplitText('.about__title', typeOpts.chars)
			const homeIntroLabel = new SplitText('.about__text', typeOpts.words)

			gsap.set('.about__image', { clipPath: 'inset(10%)' })
			gsap.set('.about__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 })

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: '.about',
					start: 'top top+=50%',
				},
				defaults: {
					ease: gOpts.ease
				},
				onComplete: () => {
					homeIntroLabel.revert()
					homeIntroTitle.revert()
					new SplitText('.about__title', typeOpts.lines)
				}
			})
			tl
				.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 })
				.from(homeIntroTitle.chars, { yPercent: 60, autoAlpha: 0, duration: .4, stagger: .02 }, '<=.2')
				.to('.about__image', { clipPath: 'inset(0%)', duration: 2, ease: 'expo.out' }, '<=.4')
				.to('.about__image img', { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0')

			if ($(window).width() > 991) {
				requestAnimationFrame(() => {
					const tlScrub = gsap.timeline({
						scrollTrigger: {
							trigger: '.about',
							start: 'top bottom',
							end: 'bottom top',
							scrub: true,
						}
					})
					tlScrub
						.fromTo('.about__image img', { bottom: '-20%' }, { bottom: '0%', ease: 'none' })
				})
			}
		}
	})
	// const homeIntroLabel = new SplitText('.about__title', typeOpts.words)
	// const homeIntroTitle = new SplitText('.about__text', typeOpts.chars)

	// gsap.from(".about", {
	// 	scrollTrigger: {
	// 		trigger: ".about",
	// 		start: "top 80%",
	// 		end: "top 80%",
	// 		//markers: true
	// 	},
	// 	onComplete: () => {
	// 		gsap.set('.about__image', { clipPath: 'inset(10%)' });
	// 		gsap.set('.about__image img', { scale: 1.4, top: 'auto', bottom: '-20%', height: '120%', autoAlpha: 0 });

	// 		gsap.to('.about__image', { clipPath: 'inset(0%)', duration: 2, ease: 'expo.out' }, '<=.4');
	// 		gsap.to('.about__image img', { scale: 1, duration: 2, autoAlpha: 1, ease: 'expo.out', clearProps: 'transform' }, '<=0');

	// 		// Анімація для розбитого тексту
	// 		gsap.from(homeIntroLabel.words, { yPercent: 60, autoAlpha: 0, duration: 0.5, stagger: .02 }, '<=.2');
	// 		gsap.from(homeIntroTitle.chars, { yPercent: 30, autoAlpha: 0, duration: .2, stagger: .01 }, '<=.2');
	// 	}
	// });
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

	// gsap.from(".header", {
	// 	y: -200,
	// 	opacity: 0,
	// 	duration: 1.5,
	// 	delay: 0.9,
	// 	scrollTrigger: {
	// 		trigger: ".header",
	// 		start: "top 80%",
	// 		end: "top 80%",
	// 		toggleActions: "play none none none",
	// 		//markers: true
	// 	}
	// });

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
				start: "top 80%",
				end: "top 80%",
				//markers: true
			}
		});
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

export function mainSlider(mainSlider) {

	const catalogContainer = mainSlider.querySelector('.catalog__container');
	const catalogImage = mainSlider.querySelectorAll('.catalog__image img');
	const catalogImageC = mainSlider.querySelector('.catalog__image');
	const catalogItems = mainSlider.querySelectorAll('.catalog__item');


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
			return elementOffsetTop + 3000;
		},
		scrub: 1,
		pin: true,
		onUpdate: () => {

			const currentXPercent = gsap.getProperty(catalogImageC, 'xPercent');

			const percentScrolled = -currentXPercent;

			const totalWidth = catalogImageC.offsetWidth + gap * (catalogImage.length - 1);

			const positionInPixels = (percentScrolled / 100) * totalWidth;

			const i = Math.floor(positionInPixels / (catalogImageC.offsetWidth + gap));

			const currentItem = catalogItems[i];

			let normalizedPercentScrolled = ((percentScrolled % totalWidth) / totalWidth) * (100 * slides);
			normalizedPercentScrolled = normalizedPercentScrolled - (gapPersent * slides) - gapPersent;
			console.log(normalizedPercentScrolled)

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
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

	tl2.fromTo(doorImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (doorImage.length - 1) + gapPersent });

	ScrollTrigger.create({
		animation: tl2,
		trigger: doorContainer,
		start: 'top top',
		end: () => {
			return doorOffsetTop + 4500;
		},
		scrub: 1,
		pin: true,
		onUpdate: () => {

			const currentXPercent = gsap.getProperty(doorImageC, 'xPercent');

			const percentScrolled = -currentXPercent;

			const totalWidth = doorImageC.offsetWidth + gap * (doorImage.length - 1);

			const positionInPixels = (percentScrolled / 100) * totalWidth;

			i = Math.floor(positionInPixels / (doorImageC.offsetWidth + gap));
			console.log(i)

			const currentItem = doorItems[i];

			let normalizedPercentScrolled = percentScrolled / slides;
			//let normalizedPercentScrolled = (((percentScrolled % totalWidth) + totalWidth) % totalWidth) / totalWidth * 100;

			console.log(percentScrolled)

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
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
			return otherOffsetTop + 6000;
		},
		scrub: 1,
		pin: true,
		onUpdate: () => {

			const currentXPercent = gsap.getProperty(otherImageC, 'xPercent');

			const percentScrolled = -currentXPercent;

			const totalWidth = otherImageC.offsetWidth + gap * (otherImage.length - 1);

			const positionInPixels = (percentScrolled / 100) * totalWidth;

			i = Math.floor(positionInPixels / (otherImageC.offsetWidth / 1.5));
			console.log(i)

			const currentItem = otherItems[i];

			let normalizedPercentScrolled = percentScrolled / slides;

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
			}

			otherItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function mainSliderMobile(mainSlider) {

	const catalogContainer = mainSlider.querySelector('.catalog__container');
	const catalogImage = mainSlider.querySelectorAll('.catalog__image img');
	const catalogImageC = mainSlider.querySelector('.catalog__image');
	const catalogItems = mainSlider.querySelectorAll('.catalog__item');
	const catalogWrapper = mainSlider.querySelector('.catalog__wrapper');


	let gap = calculateGap();
	let gapAll = gap * catalogImage.length;

	let gapPersent = gap / catalogImageC.offsetWidth * 100;

	let allWidth = 0

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
		start: 'center center',
		end: () => {
			return elementOffsetTop + 3000;
		},
		scrub: 1,
		pin: true,
		onUpdate: () => {

			const currentXPercent = gsap.getProperty(catalogImageC, 'xPercent');

			const percentScrolled = -currentXPercent;

			const totalWidth = catalogImageC.offsetWidth + gap * (catalogImage.length - 1);

			const positionInPixels = (percentScrolled / 100) * totalWidth;

			const i = Math.floor(positionInPixels / (catalogImageC.offsetWidth + gap));

			const currentItem = catalogItems[i];

			if (currentItem) {
				currentItem.classList.remove('noactive');
				let currentLine = currentItem.querySelector('.catalog__active-line');
				currentLine.style.width = normalizedPercentScrolled + '%';
			}

			catalogItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');

					if (window.innerWidth < 992) {

					}
				}
			});
		},
	});
}

export function doorSliderMobile(doorSlider) {

	const doorContainer = doorSlider.querySelector('.door__container');
	const doorImage = doorSlider.querySelectorAll('.door__image img');
	const doorImageC = doorSlider.querySelector('.door__image');
	const doorItems = doorSlider.querySelectorAll('.door__item');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * doorImage.length;

	let gapPersent = gap / doorImageC.offsetWidth * 100;

	let allWidth = 0

	doorImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	const doorOffsetTop = getElementOffsetTop(doorContainer);

	allWidth = allWidth + gapAll

	const tl2 = gsap.timeline();

	tl2.fromTo(doorImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (doorImage.length - 1) + gapPersent });

	ScrollTrigger.create({
		animation: tl2,
		trigger: doorContainer,
		start: 'top top',
		end: () => {
			return doorOffsetTop + 4500;
		},
		scrub: 1,
		pin: true,
		onUpdate: () => {

			const currentXPercent = gsap.getProperty(doorImageC, 'xPercent');

			const percentScrolled = -currentXPercent;

			const totalWidth = doorImageC.offsetWidth + gap * (doorImage.length - 1);

			const positionInPixels = (percentScrolled / 100) * totalWidth;

			i = Math.floor(positionInPixels / (doorImageC.offsetWidth + gap));
			console.log(i)

			const currentItem = doorItems[i];

			if (currentItem) {
				currentItem.classList.remove('noactive');
			}

			doorItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}

export function otherSliderMobile(otherSlider) {

	const otherContainer = otherSlider.querySelector('.other__container');
	const otherImage = otherSlider.querySelectorAll('.other__image img');
	const otherImageC = otherSlider.querySelector('.other__image');
	const otherItems = otherSlider.querySelectorAll('.other__item');

	let i = 0;
	let gap = calculateGap();
	let gapAll = gap * otherImage.length;

	let gapPersent = gap / otherImageC.offsetWidth * 100;

	let allWidth = 0

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
			return otherOffsetTop + 6000;
		},
		scrub: 1,
		pin: true,
		onUpdate: () => {

			const currentXPercent = gsap.getProperty(otherImageC, 'xPercent');

			const percentScrolled = -currentXPercent;

			const totalWidth = otherImageC.offsetWidth + gap * (otherImage.length - 1);

			const positionInPixels = (percentScrolled / 100) * totalWidth;

			i = Math.floor(positionInPixels / (otherImageC.offsetWidth / 1.5));
			console.log(i)

			const currentItem = otherItems[i];

			if (currentItem) {
				currentItem.classList.remove('noactive');
			}

			otherItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}