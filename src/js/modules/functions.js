import $ from "jquery";
import gsap from 'gsap';

import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import { Observer } from "gsap/Observer.js";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin.js";



gsap.registerPlugin(ScrollTrigger);

export function burgerMenu() {
	const burger = document.querySelector('.header__burger div');
	const box = document.querySelector('.header__box');
	const body = document.body;

	burger.addEventListener('click', () => {
		burger.classList.toggle('open');
		box.classList.toggle('active');
		body.classList.toggle('lock');
	});

	const header = document.querySelector('.header');
	const drop = document.querySelectorAll('.dropdown');

	drop.forEach((d) => {
		d.addEventListener('mouseover', () => {
			header.classList.add('drop');
		})
		d.addEventListener('mouseleave', () => {
			header.classList.remove('drop');
		})
	})

}

export function accordion(mode = true) {
	const accordionTriggers = document.querySelectorAll('.accordion-trigger');

	if (accordionTriggers) {
		// Додати обробник подій для кожного заголовку
		accordionTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				if (mode) {
					// Закрити всі аккордеони, крім того, який був клікнутий
					accordionTriggers.forEach(otherTrigger => {
						if (otherTrigger !== trigger) {
							otherTrigger.classList.remove('active');
							const otherContent = otherTrigger.nextElementSibling;
							let parentContainer = otherTrigger.parentNode.parentNode;
							otherContent.classList.remove('active');
						}
					});
				}

				trigger.classList.toggle('active');

				const content = trigger.nextElementSibling;
				const wrapper = trigger.parentNode;

				const img = wrapper.nextElementSibling;
				if (content) {
					content.classList.toggle('active');
				}
				if (img) {
					img.classList.toggle('active');
				}
			});
		});
	}
}

export function accordionMobile(mode = true) {
	const accordionTriggers = document.querySelectorAll('.accordion-trigger-mobile');
	if (window.innerWidth < 767) {
		accordionTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {
				if (mode) {
					// Закрити всі аккордеони, крім того, який був клікнутий
					accordionTriggers.forEach(otherTrigger => {
						if (otherTrigger !== trigger) {
							otherTrigger.classList.remove('active');
							const otherContent = otherTrigger.nextElementSibling;
							let parentContainer = otherTrigger.parentNode.parentNode;
							otherContent.classList.remove('active');
						}
					});
				}

				trigger.classList.toggle('active');

				const content = trigger.nextElementSibling;

				content.classList.toggle('active');
			});
		});
	}
}

export function tabs(container) {
	if (container) {
		document.addEventListener("DOMContentLoaded", function () {
			const tabButtons = container.querySelectorAll(".tab__button");
			const tabContents = container.querySelectorAll(".tab__content");

			tabButtons.forEach(function (button) {
				button.addEventListener("click", function (e) {
					e.preventDefault();
					const tabId = this.getAttribute("data-tab");
					showTab(tabId);
				});
			});

			function showTab(tabId) {
				tabContents.forEach(function (content) {
					if (content.getAttribute("data-tab") === tabId) {
						content.style.opacity = 0;
						content.style.display = "flex";
						content.classList.add('active');
						setTimeout(function () {
							content.style.opacity = 1;
						}, 50);
					} else {
						content.style.opacity = 0;
						content.style.display = "none";
						setTimeout(function () {
							content.classList.remove('active');
							content.style.opacity = 0;
						}, 50);
					}
				});
				tabButtons.forEach(function (button) {
					if (button.getAttribute("data-tab") === tabId) {
						button.classList.add("active");
					} else {
						button.classList.remove("active");
					}
				});

			}

			showTab(tabButtons[0].getAttribute("data-tab"));
		});
	}
}

export function copy() {
	const copyButtons = document.querySelectorAll('.copy__link');
	const popupMessage = document.getElementById('popupMessage');

	if (!copyButtons || !popupMessage) {
		console.error('Required elements not found.');
		return;
	}

	copyButtons.forEach((copyButton) => {
		copyButton.addEventListener('click', async (e) => {
			e.preventDefault();
			try {
				await navigator.clipboard.writeText(copyButton.textContent);
				popupMessage.textContent = 'Copied to clipboard!';
				popupMessage.style.opacity = '1';
				setTimeout(() => {
					popupMessage.style.opacity = '0';
				}, 1500);
			} catch (err) {
				popupMessage.textContent = 'Unable to copy. Please try again.';
				popupMessage.style.opacity = '1';
				setTimeout(() => {
					popupMessage.style.opacity = '0';
				}, 1500);
				console.error('Failed to copy: ', err);
			}
		});
	});
}

export function modal() {
	const open = document.querySelectorAll('.open__modal');
	const modal = document.querySelectorAll('.modal');
	let dataModal, window;

	if (modal) {
		open.forEach(function (el) {
			el.addEventListener('click', () => {
				dataModal = el.getAttribute('data-modal');

				modal.forEach(function (mod) {
					if (mod.classList.contains('active')) {
						mod.classList.remove('active');
					}
				});

				modal.forEach(function (mod) {
					if (mod.getAttribute('data-modal') === dataModal) {
						window = mod;
						setTimeout(() => {
							window.classList.remove('close__modal--animations');
							window.classList.add('active');
						}, 1200);

					}
				});
			});

			el.addEventListener('click', () => {
				let close = window.querySelector('.modal__close');
				let wrapper = window.querySelector('.modal__wrapper');
				window.classList.remove('close__modal--animations');
				window.classList.add('active');

				window.addEventListener('click', (e) => {
					if (e.target != wrapper && !wrapper.contains(e.target)) {
						window.classList.add('close__modal--animations');
						window.classList.remove('active');
					}
				});
				close.addEventListener('click', () => {
					window.classList.add('close__modal--animations');
					window.classList.remove('active');
				});

			});
		});
	}
}

export function sticky() {
	window.addEventListener('scroll', function () {
		$('header').toggleClass('sticky', window.scrollY > 0);
	});
}

export function pageNav() {
	const headerLinks = $('.header__link');

	headerLinks.each(function () {
		$(this).on('click', function (event) {
			event.preventDefault();

			const targetId = $(this).attr('href');
			const targetElement = $(`${targetId}:first`);
			const targetOffset = targetElement.offset().top - 100;
			$('html, body').animate({
				scrollTop: targetOffset
			}, 800);
		});
	});

	function activateMenuItem() {
		const scrollPosition = $(window).scrollTop();

		headerLinks.each(function () {
			const section = $(`${$(this).attr('href')}:first`);
			if (
				section.offset().top <= scrollPosition + 105 &&
				section.offset().top + section.outerHeight() > scrollPosition + 105
			) {
				headerLinks.removeClass('active');
				headerLinks.parent().removeClass('active');
				$(this).addClass('active');
				$(this).parent().addClass('active');
			}
		});
	}

	$(window).on('scroll', activateMenuItem);
}

export function inputPassword() {
	const inputs = document.querySelectorAll('.input__password')
	let index = true;
	if (inputs) {
		inputs.forEach(wrapper => {
			let svg = wrapper.querySelector('svg')
			let input = wrapper.querySelector('input')
			svg.addEventListener('click', () => {
				if (index) {
					input.type = "text"
					index = false
				} else {
					input.type = "password"
					index = true
				}
				wrapper.classList.toggle('active')
			})
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

	gsap.from(".header", {
		y: -500,
		opacity: 0,
		duration: 2,
		delay: 0.9,
		scrollTrigger: {
			trigger: ".header",
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
				start: "top 80%",
				end: "top 80%",
				//markers: true
			}
		});
	});
}

export function mainGSlider() {
	// Вибираємо елементи
	const catalogContainer = document.querySelector('.catalog__container');
	const catalogImage = document.querySelectorAll('.catalog__image img');
	const catalogImageC = document.querySelectorAll('.catalog__image');
	const catalogItems = document.querySelectorAll('.catalog__item');

	const tl = gsap.timeline();

	let j = 0; // Починаємо з 0
	let i = 0; // Починаємо з 0

	catalogImage.forEach(img => {
		j += 1;
	});

	tl.fromTo(catalogImageC, { xPercent: 0 }, { xPercent: -103 * j });

	let scrollPos = 0;

	ScrollTrigger.create({
		animation: tl,
		trigger: catalogContainer,
		start: 'top top',
		end: () => catalogContainer.offsetWidth * j * 1.3,
		scrub: 1,
		pin: true,
		onEnter: (self) => {
			scrollPos = self.scroll();
		},
		onUpdate: (self) => {
			const scrollPosition = self.scroll() - scrollPos;

			console.log(scrollPosition);

			i = Math.floor(scrollPosition / catalogContainer.offsetWidth);
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