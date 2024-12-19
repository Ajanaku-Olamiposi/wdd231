const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.innerHTML = `${today.getFullYear()}`;
const lastModified = document.querySelector("#lastmodified");
const date = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span>${new Intl.DateTimeFormat("en-US",).format(date)}</span>`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});

const products = [
  {
    id: 'fc-1888',
    price: '$10'
  },
  {
    id: 'fc-2050',
    price: '$20'
  },
  {
    id: 'fs-1987',
    price: '$30'
  },
  {
    id: 'ac-2000',
   price: '$40'
  },
  {
    id: 'jj-1969',
   price: '$50'
  }
];

const selectElement = document.getElementById('product');

    products.forEach(product => {
      const option = document.createElement('option');
      option.value = product.id;
      option.textContent = product.price;
      selectElement.appendChild(option);
 });



 