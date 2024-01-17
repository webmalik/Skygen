export function productsInit() {
	if (window.innerWidth > 992) {
		productsNav()
		productTabs()
	} else {
		productsNav()
	}
}

export function productsNav() {
	const items = document.querySelectorAll('.products__item')

	items[0].classList.add('active')
	items[0].nextElementSibling.classList.add('active')

	items.forEach((item) => {
		item.addEventListener('click', (e) => {
			e.preventDefault()

			item.classList.toggle('active')
			const list = item.nextElementSibling

			list.classList.toggle('active')
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