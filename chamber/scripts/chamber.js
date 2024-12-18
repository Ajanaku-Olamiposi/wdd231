document.addEventListener('DOMContentLoaded', (event) => {
  // Update current year and last modified date
  const currentyear = document.querySelector("#currentyear");
  const today = new Date();
  currentyear.innerHTML = `${today.getFullYear()}`;
  
  const lastModifiedElements = document.querySelectorAll('.lastmodified');
  const date = new Date(document.lastModified);
  lastModifiedElements.forEach(element => {
    element.innerHTML = `Last Modified: <span>${new Intl.DateTimeFormat("en-US").format(date)}</span>`;
  });

  // Set timestamp on form submission
  const form = document.querySelector('.form');
  if (form) {
      form.addEventListener('submit', () => {
          const timestamp = document.querySelector('#timestamp');
          const date = new Date();
          const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          timestamp.value = formattedDate;
      });
  }
  


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
  const cards = document.querySelector('#cards');
  if (cards) {
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
  }

  // Fetch and display weather data
  const currentWeather = document.querySelector('#currentWeather');
  const weatherForecast = document.querySelector('#weatherForecast');
  const img = document.querySelector('#icon');

  const myKey = '6337ea04471fc12230ef37ba26af6eab';
  const myLat = '7.380078';
  const myLong = '3.900920';

  const myURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

  if (currentWeather) {
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
      currentWeather.innerHTML = `<strong>${data.current.temp}&deg</strong>F<br>
                          ${capitalizeFirstLetter(data.current.weather[0].description)}<br>
                          High: ${data.daily[0].temp.max}&degF<br>
                          Low: ${data.daily[0].temp.min}&degF<br>
                          Humidity: ${data.current.humidity}<br>
                          Sunrise: ${sunriseTime.toLocaleTimeString('en-US', options)}<br>
                          Sunset: ${sunsetTime.toLocaleTimeString('en-US', options)}`;
      weatherForecast.innerHTML = `Today: ${data.daily[0].temp.day}&degF<br><br>
                          Tomorrow: ${data.daily[1].temp.day}&degF<br><br>
                          Next Tomorrow: ${data.daily[2].temp.day}&degF<br><br>`;
      const icon = `https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;
      img.setAttribute('src', icon);
      img.setAttribute('alt', `Weather Icon`);
      console.log('hello');
    }
  }

  // Membership level display
  const levels = [
    {
      'name': 'Non Profit Membership Level',
      'description': 'This membership level is for non-profit organizations and has no fee. Benefits include access to special events and training sessions.'
    },
    {
      'name': 'Bronze Membership Level',
      'description': 'The Bronze Membership Level offers basic benefits such as access to special events and training sessions at a lower cost.'
    },
    {
      'name': 'Silver Membership Level',
      'description': 'The Silver Membership Level includes additional benefits like advertising opportunities (e.g., spotlight positions on the home page) and event discounts.'
    },
    {
      'name': 'Gold Membership Level',
      'description': 'The Gold Membership Level provides the highest benefits, including exclusive events, comprehensive training, premium advertising opportunities, and significant event discounts.'
    }
  ]
  let level = document.querySelector('#level');
  if (level) {
    function displayLevels(levels) {
      levels.forEach(level1 => {
        let membership = document.createElement('p');
        membership.textContent = level1.name;
        let openButton = document.createElement('button');
        openButton.textContent = 'Learn More';
        let level2 = document.createElement('section')
        level2.appendChild(membership);
        level2.appendChild(openButton);
    
        let dialog = document.createElement('dialog');
        let message = document.createElement('p');
        let closeButton = document.createElement('button');
        closeButton.textContent = 'Close';
        message.textContent = level1.description;
        dialog.appendChild(message);
        dialog.appendChild(closeButton);
    
        openButton.addEventListener('click', () => {
          dialog.showModal();
        });
        closeButton.addEventListener('click', () => {
          dialog.close();
        });
    
        level2.appendChild(dialog);
        level.appendChild(level2);
      });
    }
    displayLevels(levels);
  }

  // Thank you page
  const thanks = document.querySelector('.thanks');
  if (thanks) {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    const everything = currentUrl.split('?');
    console.log(everything);
    let formData = everything[1].split('&');
  
    function show(cup) {
      let result = '';
      formData.forEach(element => {
        if (element.startsWith(cup)) {
          result = element.split('=')[1].replace('%40', '@').replace('%2B', '+').replaceAll('%2F','/');
        }
      });
      return result;
    }

    const showInfo = document.querySelector('#results');
    showInfo.innerHTML = `<p>First name: ${show('firstName')}<br>
                          Last name: ${show('lastName')}<br>
                          Email: ${show('email')}<br>
                          Mobile number: ${show('phone')}<br>
                          Business name: ${show('organization')}<br>
                          Submission Date: ${show('timestamp')}<br>
                         </p>`;
  }
});
// Discover page
// Function to format the date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString(undefined, options);
}

// Check if there's a stored visit date
const lastVisit = localStorage.getItem('lastVisit');
const info = document.getElementById('info');
const currentDate = new Date();

if (lastVisit) {
  const lastVisitDate = new Date(lastVisit);
  const timeDifference = currentDate - lastVisitDate;
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  if (daysDifference < 1) {
    info.textContent = "Back so soon! Awesome!";
  } else if (daysDifference === 1) {
    info.textContent = "You last visited 1 day ago.";
  } else {
    info.textContent = `You last visited ${daysDifference} days ago.`;
  }
} else {
  info.textContent = "Welcome! Let us know if you have any questions.";
}

// Store the current date
localStorage.setItem('lastVisit', currentDate);







