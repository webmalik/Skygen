import $ from "jquery";
import Headroom from 'headroom.js';
import gsap from 'gsap';

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Lenis from '@studio-freight/lenis';
export let lenisS

export function burgerMenu() {
	const burger = document.querySelector('.header__burger div');
	const links = document.querySelectorAll('.header__link');
	const links2 = document.querySelectorAll('.dropdown ul li a');
	const box = document.querySelector('.header');
	const body = document.body;

	if (window.innerWidth < 992) {

		links.forEach(link => {
			link.addEventListener('click', () => {
				burger.classList.toggle('open');
				box.classList.toggle('active');
				body.classList.toggle('lock');
				if (body.classList.contains('lock')) {
					lenisS.stop();
				} else {
					lenisS.start();
				}
			})
		})
		links2.forEach(link => {
			link.addEventListener('click', () => {
				console.log('b2');
				burger.classList.toggle('open');
				box.classList.toggle('active');
				body.classList.toggle('lock');
				if (body.classList.contains('lock')) {
					lenisS.stop();
				} else {
					lenisS.start();
				}
			})
		})
	}
	burger.addEventListener('click', () => {
		burger.classList.toggle('open');
		box.classList.toggle('active');
		body.classList.toggle('lock');
		if (body.classList.contains('lock')) {
			lenisS.stop();
		} else {
			lenisS.start();
		}
	});

	const header = document.querySelector('.header');
	const drop = document.querySelectorAll('.dropdown');

	const page = document.querySelector('.page');
	if (window.innerWidth > 1070) {
		drop.forEach((d) => {
			d.addEventListener('click', (e) => {
				if (page) {
					e.preventDefault();
				}
				if (d.classList.contains('active')) {
					drop.forEach((d) => {
						header.classList.remove('drop');
						d.classList.remove('active');
					})
				} else {
					drop.forEach((d) => {
						header.classList.remove('drop');
						d.classList.remove('active');
					})
					d.classList.add('active');
					header.classList.add('drop');
				}
			})
			document.addEventListener('click', (event) => {

				const isClickInsideHeader = header.contains(event.target);
				const isClickInsideDrop = Array.from(drop).some((d) => d.contains(event.target));

				if (!isClickInsideHeader && !isClickInsideDrop) {
					header.classList.remove('drop');
					drop.forEach((d) => {
						d.classList.remove('active');
					});
				}
			});
		})

	} else {
		drop.forEach((d) => {
			d.addEventListener('click', (e) => {
				if (page) {
					e.preventDefault();
				}
				d.classList.toggle('active');
			})
		})
	}

}

export function accordion(mode = true) {
	const accordionTriggers = document.querySelectorAll('.accordion-trigger');

	if (accordionTriggers) {

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
	const body = document.querySelector('html');

	open.forEach(function (el) {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			dataModal = el.getAttribute('data-modal');

			modal.forEach(function (mod) {
				if (mod.classList.contains('active')) {
					mod.classList.remove('active');
					body.classList.remove('lock');
					body.classList.remove('lenis-stopped');
					//lenisS.start();
				}
			});

			modal.forEach(function (mod) {
				if (mod.getAttribute('data-modal') === dataModal) {
					window = mod;
					window.classList.add('active');
					body.classList.add('lock');
					body.classList.add('lenis-stopped');
					//lenisS.stop();
				}
			});
		});

		el.addEventListener('click', () => {
			let close = window.querySelector('.modal__close');
			let close2 = window.querySelector('.modal__close2');
			let wrapper = window.querySelector('.modal__wrapper');
			//window.classList.remove('close__modal--animations');
			window.classList.add('active');
			if (window.innerWidth > 992) {
				body.classList.add('lock');
				body.classList.add('lenis-stopped');
			}
			//lenisS.stop();

			window.addEventListener('click', (e) => {
				if (e.target != wrapper && !wrapper.contains(e.target)) {
					//window.classList.add('close__modal--animations');
					window.classList.remove('active');
					if (window.innerWidth > 992) {
						body.classList.remove('lock');
						body.classList.remove('lenis-stopped');
					}
					//lenisS.start();
				}
			});
			close.addEventListener('click', () => {
				//window.classList.add('close__modal--animations');
				window.classList.remove('active');
				if (window.innerWidth > 992) {
					body.classList.remove('lock');
					body.classList.remove('lenis-stopped');
				}
				//lenisS.start();
			});
		});
	});

}

export function modal_window() {
	const open = document.querySelectorAll('.open__window');
	const modal = document.querySelectorAll('.modal');
	let dataModal, window;
	const body = document.body;

	open.forEach(function (el) {
		el.addEventListener('click', (e) => {
			e.preventDefault();
			dataModal = el.getAttribute('data-modal');

			modal.forEach(function (mod) {
				if (mod.classList.contains('active')) {
					mod.classList.remove('active');
					body.classList.remove('lock');
					body.classList.remove('lenis-stopped');
					lenisS.start();
				}
			});

			modal.forEach(function (mod) {
				if (mod.getAttribute('data-modal') === dataModal) {
					window = mod;
					window.classList.add('active');
					body.classList.add('lock');
					body.classList.add('lenis-stopped');
					lenisS.stop();
				}
			});
		});

		el.addEventListener('click', () => {
			let close = window.querySelector('.modal__close');
			let close2 = window.querySelector('.modal__close2');
			let wrapper = window.querySelector('.modal__wrapper');
			//window.classList.remove('close__modal--animations');
			window.classList.add('active');
			if (window.innerWidth > 992) {
				body.classList.add('lock');
				body.classList.add('lenis-stopped');
			}
			lenisS.stop();

			window.addEventListener('click', (e) => {
				if (e.target != wrapper && !wrapper.contains(e.target)) {
					//window.classList.add('close__modal--animations');
					window.classList.remove('active');
					if (window.innerWidth > 992) {
						body.classList.remove('lock');
						body.classList.remove('lenis-stopped');
					}
					lenisS.start();
				}
			});
			close.addEventListener('click', () => {
				//window.classList.add('close__modal--animations');
				window.classList.remove('active');
				if (window.innerWidth > 992) {
					body.classList.remove('lock');
					body.classList.remove('lenis-stopped');
				}
				lenisS.start();
			});
		});
	});

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
			console.log('prev');

			const targetId = $(this).attr('href');
			let targetElement
			if (targetId == "#") {
				return;
			} else {
				targetElement = $(`${targetId}:first`);
			}
			const targetOffset = targetElement.offset().top;
			window.scrollTo({
				top: targetOffset - 100,
				behavior: 'smooth'
			});
			if (targetId == '#faq') {
				const header = document.querySelector('.faq__header');
				const wrapper = document.querySelector('.faq__wrapper');
				const question = document.querySelectorAll('.faq__question');
				const answer = document.querySelectorAll('.faq__answer');
				header.classList.toggle('active');
				wrapper.classList.toggle('active');
				question[0].classList.toggle('active');
				answer[0].classList.toggle('active');
			}

			lenisS.start();
		});
	});
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



export function lenisScroll() {
	const scrollableBlock = document.querySelector('.window__wrapper');
	if (window.innerWidth > 992) {
		lenisS = new Lenis({
			smoothTouch: true,
			duration: 0,
			autoResize: true,
		});
	} else {
		lenisS = new Lenis({
			smoothTouch: true,
			duration: 0,
			autoResize: true,
		});
	}



	function raf(time) {
		lenisS.raf(time);
		lenisS.resize();
		requestAnimationFrame(raf);
	}

	requestAnimationFrame(raf);

	if (scrollableBlock) {
		const scLen = new Lenis({
			content: scrollableBlock,
			smoothTouch: true,
			duration: 1.2,
			autoResize: true,
		})
	}

}

export function faq() {
	const accordionTriggers = document.querySelectorAll('.faq__header');

	if (accordionTriggers) {

		accordionTriggers.forEach(trigger => {
			trigger.addEventListener('click', () => {

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

export function fancy() {
	Fancybox.bind("[data-fancybox]", {

	});
}

export function backToTop() {
	const button = document.querySelector('.back-to-top');
	const custom = document.querySelector('.page');
	const commercial = document.querySelector('.commercial');
	if (custom) {
		document.addEventListener('scroll', () => {
			let count = lenisS.limit - lenisS.actualScroll;
			if (count < 1100) {
				button.classList.add('visible');
			} else {
				button.classList.remove('visible');
			}
		})
	}
	if (commercial) {
		document.addEventListener('scroll', () => {
			let count = lenisS.limit - lenisS.actualScroll;
			if (count < 1400) {
				button.classList.add('visible');
			} else {
				button.classList.remove('visible');
			}
		})
	}

	button.addEventListener('click', () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
		lenisS.start();
	})
}

export function headerFix() {
	document.addEventListener("DOMContentLoaded", function () {
		const box = document.querySelector('.header');
		let headroom = new Headroom(box);
		headroom.init();
	});
}