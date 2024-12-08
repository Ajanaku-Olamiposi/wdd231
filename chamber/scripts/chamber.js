document.addEventListener('DOMContentLoaded', (event) => {
  // Update current year and last modified date
  const currentyear = document.querySelector("#currentyear");
  const today = new Date();
  currentyear.innerHTML = `${today.getFullYear()}`;
  const lastModified = document.querySelector("#lastmodified");
  const date = new Date(document.lastModified);
  lastModified.innerHTML = `Last Modified: <span>${new Intl.DateTimeFormat("en-US").format(date)}</span>`;

  // Toggle navigation menu
  const hamButton = document.querySelector('#menu');
  const navigation = document.querySelector('.nav');
  if (hamButton && navigation) {
    hamButton.addEventListener('click', () => {
      navigation.classList.toggle('open');
      hamButton.classList.toggle('open');
    });
  }

  // Toggle grid and list views
  const gridbutton = document.querySelector("#grid");
  const listbutton = document.querySelector("#list");
  const display = document.querySelector("article");
  if (gridbutton && listbutton && display) {
    gridbutton.addEventListener("click", () => {
      display.classList.add("grid");
      display.classList.remove("list");
    });
    listbutton.addEventListener("click", () => {
      display.classList.add("list");
      display.classList.remove("grid");
    });
  }

  // Fetch and display members data
  async function getMembersData() {
    try {
      const response = await fetch('./members.json');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('Fetched data:', data); // Debugging log
      if (gridbutton) {
        displayMembers(data);
      } else {
        const filteredData = data.filter(member => member.membershipLevel < 3);
        console.log('Filtered data:', filteredData); // Debugging log
        const selectedMembers = [];
        while (selectedMembers.length < 3 && filteredData.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredData.length);
          selectedMembers.push(filteredData.splice(randomIndex, 1)[0]);
        }
        console.log('Selected members:', selectedMembers); // Debugging log
        displayMembers(selectedMembers); // Display the selected members
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  }

  const cards = document.querySelector('#cards');
  const displayMembers = (data) => {
    data.forEach((member) => {
      let card = document.createElement('section');
      let name = document.createElement('h2');
      let address = document.createElement('p');
      let phone = document.createElement('p');
      let website = document.createElement('a');
      let img = document.createElement('img');

      name.textContent = member.name;
      address.textContent = member.address;
      phone.textContent = member.phone;
      website.textContent = member.website;
      website.href = member.website;
      website.target = '_blank';
      img.setAttribute('src', member.image);
      img.setAttribute('alt', `Company logo`);
      img.setAttribute('loading', 'lazy');
      img.setAttribute('width', '40');
      img.setAttribute('height', '40');

      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(address);
      card.appendChild(phone);
      card.appendChild(website);

      cards.appendChild(card);
    });
  }

  getMembersData();

  // Fetch and display weather data
  const currentWeather = document.querySelector('#currentWeather');
  const weatherForecast = document.querySelector('#weatherForecast');
  const img = document.querySelector('#icon');

  const myKey = '6337ea04471fc12230ef37ba26af6eab';
  const myLat = '7.380078';
  const myLong = '3.900920';

  const myURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

  async function apiFetch() {
    try {
      const response = await fetch(myURL);
      if (response.ok) {
        const data = await response.json();
        console.log(data); // testing only
        displayResults(data); // uncomment when ready
      } else {
        throw Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
  }
  apiFetch();

  function displayResults(data) {
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    const sunriseTime = new Date(data.current.sunrise * 1000);
    const sunsetTime = new Date(data.current.sunset * 1000);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    currentWeather.innerHTML = `<strong>${data.current.temp}</strong>F<br>
                        ${capitalizeFirstLetter(data.current.weather[0].description)}<br>
                        High: ${data.daily[0].temp.max}F<br>
                        Low: ${data.daily[0].temp.min}F<br>
                        Humidity: ${data.current.humidity}<br>
                        Sunrise: ${sunriseTime.toLocaleTimeString('en-US', options)}<br>
                        Sunset: ${sunsetTime.toLocaleTimeString('en-US', options)}`;
    weatherForecast.innerHTML = `Today: ${data.daily[0].temp.day}F<br><br>
                        Tomorrow: ${data.daily[1].temp.day}F<br><br>
                        Next Tomorrow: ${data.daily[2].temp.day}F<br><br>`;
    const icon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
    img.setAttribute('src', icon);
    img.setAttribute('alt', 'Weather Icon');
    console.log('hello');
  }
});
