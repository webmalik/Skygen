import settings from '../../../gulp/config/settings.json';
import { copy } from "../modules/functions.js"
import { lenisS } from './functions.js';
export function isWebp() {
	function testWebP(callback) {

		var webP = new Image();
		webP.onload = webP.onerror = function () {
			callback(webP.height == 2);
		};
		webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
	}

	testWebP(function (support) {

		if (support == true) {
			document.querySelector('body').classList.add('webp');
		} else {
			document.querySelector('body').classList.add('no-webp');
		}
	});
}

export function project() {
	const header = document.querySelector('.webmalik__header')
	const navContainer = document.querySelector('.webmalik__nav')


	if (header) {
		header.textContent = "Проект: " + settings.projectName
		settings.menuItems.forEach(element => {
			const menuItem = document.createElement('a')
			menuItem.href = element.url
			menuItem.textContent = element.label
			menuItem.target = '_blank'
			navContainer.appendChild(menuItem)
		});

		copy()
	}
}

export function fixWP() {
	document.addEventListener('DOMContentLoaded', () => {

		// Fix menu

		const menu = document.querySelector('.header__menu');
		const childrens = document.querySelectorAll('.menu-item-has-children');
		const page = document.querySelector('.page');
		const commercial = document.querySelector('.commercial');
		const catalog = document.querySelector('.window-catalog');

		if (page || commercial || catalog) {
			let links = menu.querySelectorAll('a');

			links.forEach((link) => {

				if (link.textContent.trim().toUpperCase() === 'CATALOGS') {
					let modals = link.nextElementSibling.querySelectorAll('a');
					modals.forEach((m) => {
						m.classList.add('open__modal');
						const modalText = m.textContent.trim();
						const words = modalText.split(' ');
						const firstWord = words[0];
						m.setAttribute('data-modal', firstWord);
					})
				} else {
					if (page || commercial) {
						link.classList.add('header__link');
					}
				}
			})
		}

		if (childrens) {
			childrens.forEach((children) => {
				children.classList.add('dropdown');
				const firstChildLink = children.querySelector('a');
				if (firstChildLink) {
					firstChildLink.classList.remove('header__link');
				}
			})
		}

		const body = document.body;
		const out = document.querySelectorAll('.modal__content .wpcf7-response-output');
		const forms = document.querySelectorAll('.modal__content .wpcf7');

		forms.forEach((form) => {
			const svgElementDone = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			svgElementDone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			svgElementDone.setAttribute("width", "100");
			svgElementDone.setAttribute("height", "101");
			svgElementDone.setAttribute("viewBox", "0 0 100 101");
			svgElementDone.setAttribute("fill", "none");

			const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
			pathElement.setAttribute("d", "M34.2833 47.2583L50.0208 63L82 31.0208C75.4167 20.2292 63.5667 13 50 13C29.2875 13 12.5 29.7875 12.5 50.5C12.5 71.2125 29.2875 88 50 88C69.3 88 85.1792 73.4167 87.2542 54.6667");
			pathElement.setAttribute("stroke", "#0FB42A");
			pathElement.setAttribute("stroke-width", "4");
			pathElement.setAttribute("stroke-linecap", "round");
			pathElement.setAttribute("stroke-linejoin", "round");

			svgElementDone.appendChild(pathElement);

			const done = document.createElement('div');
			done.innerHTML = "All done!";

			const close = document.createElement('a');
			close.classList.add('modal__close2');
			close.innerHTML = "CLOSE";

			form.addEventListener('wpcf7mailsent', function (event) {
				let mod = form.querySelector('.modal__content .wpcf7-response-output');
				mod.style.display = "flex";
				setTimeout(() => {
					let windows = document.querySelectorAll('.modal');
					windows.forEach((window) => {
						const cl = window.querySelector('.modal__close');
						cl.addEventListener('click', () => {
							mod.style.display = "none";
						})
					})
					close.addEventListener('click', () => {
						windows.forEach((window) => {
							window.classList.remove('active');
							mod.style.display = "none";
						})
						if (window.innerWidth > 992) {
							body.classList.remove('lock');
						}
						lenisS.start();
					});

					mod.insertBefore(done, mod.firstChild);
					mod.insertBefore(svgElementDone, mod.firstChild);
					mod.appendChild(close);
				}, 200);
			}, false);

			form.addEventListener('wpcf7invalid', function (event) {
				let mod = form.querySelector('.modal__content .wpcf7-response-output');
				mod.style.display = "none";
			}, false);



			let rememberCheckboxes = document.querySelectorAll('.rem');

			forms.forEach((form) => {
				form.addEventListener('submit', function () {
					const formData = {};

					this.querySelectorAll('input, textarea').forEach((input) => {
						formData[input.name] = input.value;
					});

					const rememberCheckbox = form.nextElementSibling.querySelector('.rem');
					const rememberCheckboxState = rememberCheckbox.checked;

					if (rememberCheckboxState) {
						localStorage.removeItem('formData');
						localStorage.removeItem('rememberCheckboxState');
						localStorage.setItem('formData', JSON.stringify(formData));
						localStorage.setItem('rememberCheckboxState', JSON.stringify(rememberCheckboxState));
					} else {
						localStorage.removeItem('formData');
						localStorage.removeItem('rememberCheckboxState');
					}
					upl();
				});
			});

			function upl() {
				let savedFormData = localStorage.getItem('formData');
				let savedRememberState = localStorage.getItem('rememberCheckboxState');

				if (savedFormData) {
					forms.forEach((form) => {
						const formData = JSON.parse(savedFormData);

						form.querySelectorAll('input, textarea').forEach((input) => {
							input.value = formData[input.name];
						});
					});
				}

				if (savedRememberState) {
					const rememberCheckboxes = document.querySelectorAll('.rem');
					rememberCheckboxes.forEach((checkbox) => {
						checkbox.checked = JSON.parse(savedRememberState);
					});
				}
			}

			upl();

			rememberCheckboxes.forEach((checkbox) => {
				checkbox.addEventListener('change', function () {
					localStorage.setItem('rememberCheckboxState', JSON.stringify(this.checked));
				});
			});
		})
	})
}

export function preloader() {
	const preloader = document.querySelector('.preloader');

	document.addEventListener('DOMContentLoaded', () => {
		setTimeout(() => {
			preloader.classList.add('hide');
		}, 500);
	})
}

export function catalogFiles() {
	const products = document.querySelector(".catalog-products");
	const aluminum = document.querySelector(".catalog-aluminum");
	const upvc = document.querySelector(".catalog-upvc");
	const steel = document.querySelector(".catalog-steel");
	const windows = document.querySelector(".catalog-windows");
	const doors = document.querySelector(".catalog-doors");

	const productsInputs = document.querySelectorAll(".file-products");
	const aluminumInputs = document.querySelectorAll(".file-aluminum");
	const upvcInputs = document.querySelectorAll(".file-upvc");
	const steelInputs = document.querySelectorAll(".file-steel");
	const windowsInputs = document.querySelectorAll(".file-windows");
	const doorsInputs = document.querySelectorAll(".file-doors");

	if (productsInputs) {
		productsInputs.forEach((item) => {
			item.value = products.value;
		});
	}
	if (aluminumInputs) {
		aluminumInputs.forEach((item) => {
			item.value = aluminum.value;
		});
	}
	if (upvcInputs) {
		upvcInputs.forEach((item) => {
			item.value = upvc.value;
		});
	}
	if (steelInputs) {
		steelInputs.forEach((item) => {
			item.value = steel.value;
		});
	}
	if (windowsInputs) {
		windowsInputs.forEach((item) => {
			item.value = windows.value;
		});
	}
	if (doorsInputs) {
		doorsInputs.forEach((item) => {
			item.value = doors.value;
		});
	}
}

export function fixP() {
	const footer = document.querySelector('.footer');
	let paragraphs;
	if (footer) {
		paragraphs = footer.getElementsByTagName('p');
	}
	if (paragraphs) {
		for (let i = 0; i < paragraphs.length; i++) {
			let paragraph = paragraphs[i];

			if (paragraph.innerHTML.trim() === '' && paragraph.attributes.length === 0) {
				paragraph.parentNode.removeChild(paragraph);
			}
		}
	}

	let svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");

	svgElement.setAttribute("width", "20");
	svgElement.setAttribute("height", "20");
	svgElement.setAttribute("viewBox", "0 0 20 20");

	svgElement.innerHTML = `
    <path d="M11.6678 14.1662V7.49952C11.6678 6.57786 10.9228 5.82952 10.0011 5.82619V5.82619C9.07448 5.82202 8.32031 6.57286 8.32031 7.49952V13.3329" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M5.83464 6.66699V14.2087" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.1667 6.66699V12.5003" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M11.6693 14.167V14.5837C11.6693 16.1945 10.3634 17.5003 8.7526 17.5003V17.5003C7.14177 17.5003 5.83594 16.1945 5.83594 14.5837V14.167" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    <path d="M14.1693 6.66667V6.66667C14.1693 4.36583 12.3034 2.5 10.0026 2.5V2.5C7.70177 2.5 5.83594 4.36583 5.83594 6.66667V6.66667" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
`;

	const fileButton = document.getElementById('mfcf7_zl_add_file');
	if (fileButton) {
		const parentContainer = fileButton.parentNode;
		parentContainer.style.display = "flex";
		parentContainer.style.alignItems = "center";
		parentContainer.style.gap = "10px";
		svgElement.style.minWidth = "20px";
		parentContainer.classList.add('fileClassSVG');
		fileButton.parentNode.insertBefore(svgElement, fileButton);
	}

}