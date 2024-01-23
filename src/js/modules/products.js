import Swiper from "swiper";
import { Navigation, Pagination, Autoplay, Mousewheel } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function productsInit() {
	if (window.innerWidth > 992) {
		lazyLoad()
		productsNav()
		productTabs()
	} else {
		lazyLoad()
		productsNav()
		productMobileSort()
		productMobileContent()
	}
}

export function productsNav() {
	const items = document.querySelectorAll('.products__item')
	const lists = document.querySelectorAll('.products__list')

	resetHeight(lists)

	lists[0].style.maxHeight = lists[0].scrollHeight + 'px'
	items[0].classList.add('active')
	items[0].nextElementSibling.classList.add('active')


	items.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault()
			const list = item.nextElementSibling
			list.classList.toggle('active')
			lists.forEach((otherList) => {
				if (list !== otherList) {
					otherList.classList.remove('active')
					otherList.style.maxHeight = '0px'

					if (window.innerWidth < 992) {
						const buttons = document.querySelectorAll(".products__link")
						const contents = document.querySelectorAll(".products__content")

						buttons.forEach((button) => {
							button.classList.remove('active')
						})
						contents.forEach((content) => {
							content.classList.remove('active')
							content.style.maxHeight = '0px'
						})
					}
				}
			})
			items.forEach((it) => {
				it.classList.remove('active')
			})

			resetHeight(lists);

			item.classList.toggle('active')
			list.style.maxHeight = list.scrollHeight + 'px'
			if (window.innerWidth < 992) {
				setTimeout(() => {
					list.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'nearest',
					});
				}, 500)
			}
		})
	})
}

export function productTabs() {
	document.addEventListener("DOMContentLoaded", function () {
		const tabButtons = document.querySelectorAll(".products__link");
		const tabContents = document.querySelectorAll(".products__content");

		tabButtons.forEach(function (button) {
			button.addEventListener("click", function (e) {
				e.preventDefault();
				const tabId = this.getAttribute("data-content");
				showTab(tabId);
				setTimeout(() => {
					productsSlider();
				}, 50)
			});
		});

		function showImage(content) {
			const image = content.querySelector('.products__image-item')
			const wrapper = document.querySelector('.products__image')

			wrapper.classList.remove('active')

			setTimeout(() => {
				wrapper.innerHTML = image.innerHTML
				if (image) {
					image.style.display = "none"
				}
				wrapper.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
					inline: 'nearest',
				});
				setTimeout(() => {
					wrapper.classList.add('active')
				}, 150)
			}, 300)


		}

		function showTab(tabId) {
			tabContents.forEach(function (content) {
				if (content.getAttribute("data-content") === tabId) {
					content.style.opacity = 0;
					content.style.display = "block";
					content.classList.add('active');
					showImage(content);
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
				if (button.getAttribute("data-content") === tabId) {
					button.classList.add("active");
				} else {
					button.classList.remove("active");
				}
			});

		}

		showTab(tabButtons[0].getAttribute("data-content"));
	});
}

export function productMobileSort() {
	const buttons = document.querySelectorAll(".products__link")
	const contents = document.querySelectorAll(".products__content")
	const image = document.querySelector('.products__image')

	image.remove();

	const svgString = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M22 7L12 17L2 7" stroke="black" stroke-width="2"/></svg>'
	const parser = new DOMParser()

	buttons.forEach((link) => {

		const svgElement = parser.parseFromString(svgString, 'image/svg+xml').documentElement
		link.appendChild(svgElement)

		const dataLink = link.getAttribute('data-content')
		contents.forEach((content) => {
			const dataContent = content.getAttribute('data-content')
			const image = content.querySelector('.products__image-item')
			image.classList.add('products__image')
			content.style.maxHeight = '0px';

			if (dataLink == dataContent) {
				link.insertAdjacentElement('afterend', content)
			}
		})
	})

	const aboutImage = document.querySelector(".about__image")
	const aboutInner = document.querySelector(".about__inner")

	aboutInner.insertAdjacentElement('beforeend', aboutImage)
}

export function productMobileContent() {
	const buttons = document.querySelectorAll(".products__link")
	const contents = document.querySelectorAll(".products__content")

	buttons.forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault()
			const content = link.nextElementSibling
			buttons.forEach((otherLink) => {
				if (otherLink !== link) {
					otherLink.classList.remove('active')
					contents.forEach((otherContent) => {
						if (otherContent !== content) {
							otherContent.classList.remove('active')
							otherContent.style.maxHeight = '0px';
							const otherImage = otherContent.querySelector('.products__image')
							otherImage.classList.remove('active')
						}
					})
				}
			});
			link.classList.toggle('active');

			if (content) {
				content.classList.toggle('active')
				const list = content.parentNode
				const image = content.querySelector('.products__image')
				if (content.style.maxHeight == '0px') {
					const maxList = content.scrollHeight + list.scrollHeight + 100
					list.style.maxHeight = maxList + 'px'
					content.style.maxHeight = content.scrollHeight + 'px';
					setTimeout(() => {
						link.scrollIntoView({
							behavior: 'smooth',
							block: 'start',
							inline: 'nearest',
						});
					}, 500)
					setTimeout(() => {
						productsSlider();
					}, 50)
					setTimeout(() => {
						productsSliderMobile();
					}, 50)

				} else {
					content.style.maxHeight = '0px';
				}

				setTimeout(() => {
					image.classList.add('active')
				}, 100)
			}
		})
	})
}

let mySwiper

export function createNavigation(slider) {

	const navigation = document.createElement('div')
	const btnNext = document.createElement('div')
	const btnPrev = document.createElement('div')

	navigation.classList.add('products__nav-slider')
	btnNext.classList.add('products__next')
	btnPrev.classList.add('products__prev')


	const svgNext = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M7 3.03906L17 13.0391L7 23.0391" stroke="black" stroke-width="2"></path></svg>';
	const svgPrev = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 3.03906L7 13.0391L17 23.0391" stroke="black" stroke-width="2"></path></svg>';
	const parser = new DOMParser()
	const svgN = parser.parseFromString(svgNext, 'image/svg+xml').documentElement
	const svgP = parser.parseFromString(svgPrev, 'image/svg+xml').documentElement
	btnPrev.appendChild(svgP)
	btnNext.appendChild(svgN)

	navigation.appendChild(btnPrev)
	navigation.appendChild(btnNext)

	slider.appendChild(navigation)

	return {
		btnNext: btnNext,
		btnPrev: btnPrev
	}
}

export function productsSlider() {
	const productsSliders = document.querySelectorAll('.products__slider')

	productsSliders.forEach(function (slider) {
		let navigationButtons
		let subtitle = slider.querySelector('.products__subtitle')

		const nav = slider.querySelector('.products__nav-slider')
		if (nav) {
			navigationButtons = {
				btnNext: nav.querySelector('.products__next'),
				btnPrev: nav.querySelector('.products__prev')
			}
		} else {
			navigationButtons = createNavigation(slider.parentNode)
		}

		mySwiper = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 30,
			observeParents: true,
			observer: true,
			observeSlideChildren: true,

			breakpoints: {
				992: {
					slidesPerView: 2,
				}
			},
			modules: [Navigation],
			navigation: {
				nextEl: navigationButtons.btnNext,
				prevEl: navigationButtons.btnPrev,
			}
		});
	});
}

export function productsSliderMobile() {
	const productsSliders = document.querySelectorAll('.products-mobile__slider')

	productsSliders.forEach((slider) => {
		const slides = slider.querySelectorAll('.products__content-image')
		const inner = slider.querySelector('.products__inner')
		if (inner) {
			inner.classList.remove('products__inner')
		}

		slides.forEach((slide) => {
			slide.classList.add('swiper-slide')
		})
	})

	productsSliders.forEach(function (slider) {
		let navigationButtons
		let subtitle = slider.querySelector('.products__subtitle')
		let subtitleAbsolute = slider.querySelector('.absolute__nav')
		const nav = slider.querySelector('.products__nav-slider')
		if (nav) {
			navigationButtons = {
				btnNext: nav.querySelector('.products__next'),
				btnPrev: nav.querySelector('.products__prev')
			}
		} else {
			navigationButtons = createNavigation(slider)
		}

		mySwiper = new Swiper(slider, {
			slidesPerView: 1,
			spaceBetween: 30,
			observeParents: true,
			observer: true,
			observeSlideChildren: true,

			breakpoints: {
				992: {
					slidesPerView: 2,
				}
			},
			modules: [Navigation],
			navigation: {
				nextEl: navigationButtons.btnNext,
				prevEl: navigationButtons.btnPrev,
			}
		});
	});
}

export function productsSliderUpdate() {
	const productsSliders = document.querySelectorAll('.products__slider')

	productsSliders.forEach(function (slider) {
		slider.updateSlides();
	});

}

function resetHeight(lists) {
	lists.forEach((list) => {
		list.style.maxHeight = '0px'
	})
}

export function lazyLoad() {
	document.addEventListener("DOMContentLoaded", function () {
		var images = document.querySelectorAll("img");
		images.forEach(function (img) {
			img.setAttribute("loading", "lazy");
		});
	});
}