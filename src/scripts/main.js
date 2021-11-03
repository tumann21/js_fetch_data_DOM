'use strict';

// write your code here
const url
  = 'https://mate-academy.github.io/phone-catalogue-static/api/phones.json';

let url1
  = 'https://mate-academy.github.io/'
   + 'phone-catalogue-static/api/phones/:phoneId.json';

const body = document.querySelector('body');
const ol = document.createElement('ol');

function getPhones() {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        setTimeout(() => Promise.reject(Error('error')), 5000);
      }

      return response.json();
    })
    .then(result => result.map(el => {
      getPhonesDetails(el.id);
    }))
    .catch(error => error);
}

url1 = url1.substring(0, url1.indexOf(':phoneId'));

function getPhonesDetails(id) {
  const listOfPhones = [];

  return fetch(`${url1}${id}.json`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(Error('error'));
      }

      return response.json();
    })
    .then(res => {
      listOfPhones.push(res.name);
      addingList(listOfPhones);
    })
    .catch(error => error);
}

getPhones();

function addingList(phones) {
  phones.forEach(element => {
    const li = document.createElement('li');

    li.append(element);
    ol.append(li);
  });

  body.append(ol);
}
