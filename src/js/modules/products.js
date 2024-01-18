export function productsInit() {
	if (window.innerWidth > 992) {
		productsNav()
		productTabs()
	} else {
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
				setTimeout(() => {
					wrapper.classList.add('active')
				}, 50)
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

function resetHeight(lists) {
	lists.forEach((list) => {
		list.style.maxHeight = '0px'
	})
}