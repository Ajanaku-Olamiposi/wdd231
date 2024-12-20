console.log('Script loaded');

const currentyear = document.querySelector("#currentyear");
const today = new Date();
currentyear.innerHTML = `${today.getFullYear()}`;
const lastModified = document.querySelector("#lastmodified");
const date = new Date(document.lastModified);
lastModified.innerHTML = `Last Modified: <span>${new Intl.DateTimeFormat("en-US").format(date)}</span>`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');
hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});

const selectElement = document.getElementById('product');
if (selectElement) {
  const products = [
    { id: 'fc-1888', price: '$10' },
    { id: 'fc-2050', price: '$20' },
    { id: 'fs-1987', price: '$30' },
    { id: 'ac-2000', price: '$40' },
    { id: 'jj-1969', price: '$50' }
  ];

  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;
    option.textContent = product.price;
    selectElement.appendChild(option);
  });
}

const showInfo = document.querySelector('#results');
if (showInfo) {
  console.log('Results element found');
  const currentUrl = window.location.href;
  console.log('Current URL:', currentUrl);
  const everything = currentUrl.split('?');
  console.log('URL split:', everything);

  if (everything.length > 1) {
    let formData = everything[1].split('&');
    console.log('Form data:', formData);

    function show(cup) {
      let result = '';
      formData.forEach(element => {
        if (element.startsWith(cup)) {
          result = decodeURIComponent(element.split('=')[1]);
          console.log(`Found ${cup}:`, result);
        }
      });
      return result;
    }

    showInfo.innerHTML = `<p>First name: ${show('username')}<br>
                          Last name: ${show('lastName')}<br>
                          Email: ${show('email')}<br>
                          Mobile number: ${show('phone')}<br>
                          Business name: ${show('organization')}<br>
                          Submission Date: ${show('timestamp')}<br>
                         </p>`;
  } else {
    console.log('No query parameters found in the URL');
  }
} else {
  console.log('Results element not found');
}
