const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.innerHTML = `${today.getFullYear()}`;
const lastModified = document.querySelector("#lastmodified");
const date = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span>${new Intl.DateTimeFormat("en-US",).format(date)}</span>`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.nav');
hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});

const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");


gridbutton.addEventListener("click", () => {
	display.classList.add("grid");
	display.classList.remove("list");
});
listbutton.addEventListener("click", showList); 
function showList() {
	display.classList.add("list");
	display.classList.remove("grid");
}

async function getMembersData() {
  try {
    const response = await fetch('./members.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    displayMembers(data);
  } 
  catch (error) {
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
    img.setAttribute('alt', `Company logo`)
    img.setAttribute('loading', 'lazy');
    img.setAttribute('width', '36');
    img.setAttribute('height','40')
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    cards.appendChild(card);
  });
}
getMembersData();


