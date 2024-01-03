import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function aboutMobile() {
	const about = document.querySelector('.about__wrapper')
	const images = document.querySelectorAll('.about__image')
	const inners = document.querySelectorAll('.about__inner')

	const slider = document.createElement('div')
	slider.classList.add('about__slider')
	slider.classList.add('swiper')
	const pagination = document.createElement('div')
	pagination.classList.add('about__pagination')
	pagination.classList.add('pagination')

	about.appendChild(slider)

	const wrapper = document.createElement('div')
	wrapper.classList.add('swiper-wrapper')

	slider.appendChild(wrapper)
	slider.appendChild(pagination)

	let i = 0

	inners.forEach((inner) => {
		inner.appendChild(images[i])
		wrapper.appendChild(inner)
		inner.classList.add('swiper-slide')
		i++
	})

	const aboutSlider = new Swiper(slider, {
		loop: true,
		modules: [Pagination],
		spaceBetween: 10,
		slidesPerView: 1,
		pagination: {
			el: '.about__pagination',
			clickable: true,
		},
	})
}

export function benefitsMobile() {
	const container = document.querySelector('.benefits__container')
	const benefits = document.querySelector('.benefits__wrapper')
	const items = document.querySelectorAll('.benefits__item')


	const slider = document.createElement('div')
	slider.classList.add('benefits__slider')
	slider.classList.add('swiper')
	const pagination = document.createElement('div')
	pagination.classList.add('benefits__pagination')
	pagination.classList.add('pagination')

	container.appendChild(slider)

	benefits.classList.add('swiper-wrapper')

	slider.appendChild(benefits)
	slider.appendChild(pagination)


	items.forEach((item) => {
		item.classList.add('swiper-slide')
	})

	const benefitsSlider = new Swiper(slider, {
		loop: true,
		modules: [Pagination],
		spaceBetween: 10,
		slidesPerView: 1,
		pagination: {
			el: pagination,
			clickable: true,
		},
	})
}

export function imagesMobile() {
	const slider = document.querySelector('.images')
	const wrapper = document.querySelector('.images__wrapper')
	const items = document.querySelectorAll('.images__item')

	slider.classList.add('swiper')
	const pagination = document.createElement('div')
	pagination.classList.add('images__pagination')
	pagination.classList.add('pagination')

	wrapper.classList.add('swiper-wrapper')

	slider.appendChild(pagination)

	items.forEach((item) => {
		item.classList.add('swiper-slide')
	})

	const benefitsSlider = new Swiper(slider, {
		loop: true,
		modules: [Pagination],
		spaceBetween: 15,
		freeMode: {
			enabled: true,
		},
		centeredSlides: true,
		slidesPerView: 1.6,
		// pagination: {
		// 	el: pagination,
		// 	clickable: true,
		// },
	})
}
