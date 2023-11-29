/* Header Card: Time */
function getNewYorkTime() {
}

function updateTime() {
	getNewYorkTime();
	setInterval(getNewYorkTime, 1000);
}

updateTime();

/* Header Card: Menu */
const navLinks = document.querySelectorAll('.nav-link');
const navTitle = document.querySelector('.header-nav__title');

navLinks.forEach(el => {
	el.addEventListener('mouseenter', () => {
		navTitle.classList.add('header-nav__title-hover');
	});
	el.addEventListener('mouseleave', () => {
		navTitle.classList.remove('header-nav__title-hover');
	});
});

/* Header Card: Weather */
const defaultWeatherLocation = 'New York City';
const apiWeatherKey = 'ADD OPENWEATHER KEY HERE';
const apiWeather = `https://api.openweathermap.org/data/2.5/weather?q=${defaultWeatherLocation}&appid=${apiWeatherKey}&units=imperial`;

async function getWeatherData() {
}

async function getWeatherIcon(weatherData) {
}

getWeatherData();

/************* HEADER CARD: FLIGHT DATA **************/

/* Header Card: Flight Data */
const searchAirportBtn = document.getElementById('search-airport-btn');
const searchAirportInput = document.getElementById('search-airport-input');
const userGeolocationBtn = document.getElementById('search-location-btn');

const userSavedAirport = localStorage.getItem('location');
if (userSavedAirport) {
	getFlightData(userSavedAirport);
}

searchAirportBtn.addEventListener('click', function (event) {
	event.preventDefault();

	localStorage.setItem('location', `${searchAirportInput.value}`);
	getFlightData(searchAirportInput.value);
});

userGeolocationBtn.addEventListener('click', function (event) {
	event.preventDefault();

	navigator.geolocation.getCurrentPosition(function (position) {
		const lat = position.coords.latitude;
		const lon = position.coords.longitude;

		localStorage.setItem('location', `${lat}, ${lon}`);
		getFlightData(`${lat}, ${lon}`);
	});
});

async function getFlightData(userLocation) {
}

/* Destinations Section: Map Toggle */
const mapButtons = document.querySelectorAll('.toggle-map-btn');
const maps = document.querySelectorAll('.destination-map');
const destinationImages = document.querySelectorAll('.destination-img');

mapButtons.forEach((mapButton, index) => {
	mapButton.addEventListener('click', function () {
		maps[index].classList.toggle('destination-map__active');
		destinationImages[index].classList.toggle('destination-img__active');
	});
});

/* Render Neighborhood Section Content */
(async function () {
	const neighborhoodHeadings = document.querySelectorAll(
		'.neighborhood-card__heading'
	);
	const neighborhoodText = document.querySelectorAll(
		'.neighborhood-card__intro p'
	);
	const neighborhoodList = document.querySelectorAll(
		'.neighborhood-card__intro ul'
	);

	const response = await fetch('/content/neighborhood.json');
	const data = await response.json();

	neighborhoodHeadings.forEach((el, index) => {
		el.textContent = `${data[index].group}`;
	});

	neighborhoodText.forEach((el, index) => {
		el.textContent = `${data[index].description}`;
	});

	neighborhoodList.forEach((el, index) => {
		for (let i = 0; i < data[index].neighborhoods.length; i++) {
			const li = document.createElement('li');
			li.textContent = `${data[index].neighborhoods[i]}`;
			el.appendChild(li);
		}
	});
})();

/* Render Hotel Section Content */
(async function () {
	const hotelCards = document.querySelectorAll('.hotel-card-wrapper');
	const hotelHeadings = document.querySelectorAll('.hotel-card-wrapper h4');
	const hotelImages = document.querySelectorAll('.hotel-card img');
	const hotelBookings = document.querySelectorAll('.hotel-booking-btn');
	const hotelAddresses = document.querySelectorAll('.hotel-address');
	const hotelNumbers = document.querySelectorAll('.hotel-number');

	const response = await fetch('/content/hotels.json');
	const data = await response.json();

	hotelCards.forEach((card, index) => {
		const hotelButtons = card.querySelectorAll('.hotel-button');
		hotelButtons.forEach(button => {
			button.addEventListener('click', function (event) {
				event.preventDefault();

				hotelButtons.forEach(el => el.classList.remove('active-button'));
				button.classList.add('active-button');

				const target = button.getAttribute('data-target');

				hotelHeadings[index].textContent = `${data[target].name}`;
				hotelBookings[index].setAttribute('href', `${data[target].booking}`);
				hotelAddresses[index].textContent = `${data[target].address}`;
				hotelNumbers[index].textContent = `${data[target].contact}`;
				hotelImages[index].setAttribute('src', `${data[target].img}`);
				hotelImages[index].setAttribute('alt', `Image of ${data[target].name}`);
			});
		});
	});
})();

/* Simple Form Functionality */
// Note: No actual purpose other than being a decorative element
const headerFormBtn = document.getElementById('flight-form-btn');

headerFormBtn.addEventListener('click', function (event) {
	event.preventDefault();

	const target = document.getElementById('cta');
	target.scrollIntoView({ behavior: 'smooth' });
});

const ctaFormBtn = document.getElementById('cta-button');
const ctaFormWrapper = document.querySelector('.cta-form-wrapper');
const ctaFormEl = document.querySelector('cta-form');

ctaFormBtn.addEventListener('click', function (event) {
	event.preventDefault();

	ctaFormWrapper.innerHTML = `<strong>Thanks for your interest!</strong><br/>
	<br/> Unfortunately, we are not taking any reservations at this time.`;
});