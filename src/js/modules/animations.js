import $ from "jquery";
import gsap from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { Observer } from "gsap/Observer.js";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";

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

export function mainSlider(mainSlider) {

	// Вибираємо елементи
	const catalogContainer = mainSlider.querySelector('.catalog__container');
	const catalogImage = mainSlider.querySelectorAll('.catalog__image img');
	const catalogImageC = mainSlider.querySelector('.catalog__image');
	const catalogItems = mainSlider.querySelectorAll('.catalog__item');


	let gap = calculateGap();
	let gapAll = gap * catalogImage.length;

	let gapPersent = gap / catalogImageC.offsetWidth * 100;

	console.log(gapPersent)

	let allWidth = 0

	catalogImage.forEach((imageWidth) => {
		allWidth = allWidth + imageWidth.offsetWidth
	})

	allWidth = allWidth + gapAll


	const tl = gsap.timeline();

	tl.fromTo(catalogImageC, { xPercent: 0 }, { xPercent: (-100 - gapPersent) * (catalogImage.length - 1) + gapPersent });

	let scrollPos = 0;

	ScrollTrigger.create({
		animation: tl,
		trigger: catalogContainer,
		start: 'top top',
		end: () => allWidth,
		scrub: 1,
		pin: true,
		onUpdate: (self) => {

			// Отримати поточне значення xPercent
			const currentXPercent = gsap.getProperty(catalogImageC, 'xPercent');

			// Розрахувати відсоткову позицію відносно всього блока слайдера
			const percentScrolled = -currentXPercent;

			// Розрахувати загальну ширину блока з урахуванням проміжку
			const totalWidth = catalogImageC.offsetWidth + gap * (catalogImage.length - 1);

			// Розрахувати позицію в пікселях в межах всього блока
			const positionInPixels = (percentScrolled / 100) * totalWidth;

			// Розрахувати індекс від 0 до catalogImage.length - 1 з врахуванням gap
			const i = Math.floor(positionInPixels / (catalogImageC.offsetWidth + gap));
			console.log(i);

			const currentItem = catalogItems[i];

			if (currentItem) {
				currentItem.classList.remove('noactive');
			}

			catalogItems.forEach((item, index) => {
				if (index !== i) {
					item.classList.add('noactive');
				}
			});
		},
	});
}