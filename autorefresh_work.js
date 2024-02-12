// ==UserScript==
// @name        ukrgasbank.com
// @namespace   Violentmonkey Scripts
// @match       https://hd.ukrgasbank.com/maximo/*
// @grant       none
// @version     1.0
// ==/UserScript==

const name_zayavka = 'mbaf55d';
const time_refresh = 750;

(function () {
      let value = localStorage.getItem("refresherator");
      checkLocalStore()
      window.addEventListener('load', build)
      function build(){
        if(value === "start"){
          if(checkZayavka){
             var interval = setInterval(checkElement, time_refresh);
          }else{
            document.addEventListener('DOMContentLoad', checkZayavka)
          }
        }
      }
})();

function checkZayavka() {
  if (document.getElementById('m43f6b5e4_hyperlink_0-lb')) {
      document.getElementById('m43f6b5e4_hyperlink_0-lb').dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window
      }));
  } else if(document.getElementById('mb4bffc9f_hyperlink_0-lb')) {
      document.getElementById('mb4bffc9f_hyperlink_0-lb').dispatchEvent(new MouseEvent('mouseup', {
      bubbles: true,
      cancelable: true,
      view: window
      }));
  }else{
      return true
  }
}

function checkElement() {
    let zayavkaElements = document.querySelectorAll('td[headers="' + name_zayavka + '-content_0"]');
    let refreshArray = document.getElementById(name_zayavka + '-content_reflink')
    let colorElement = document.getElementById(name_zayavka + '-hb')

    // Перевірка, чи знайдено елементи
    if (zayavkaElements.length > 1) {
        clearInterval(interval); // Зупиняємо інтервал
        let new_zayavka = zayavkaElements[1].firstElementChild;
        zayavkaElements[1].parentElement.style.backgroundColor = "#77008040";
        document.getElementById('psuedoForm').style.backgroundColor = 'red';
        new_zayavka.click();
    } else {
        if (refreshArray) {
            refreshArray.click(); // Натискання на елемент refreshArray
            const newColor = getRandomColor();
            colorElement.style.backgroundColor = newColor;
            colorElement.style.borderRadius = "10px";
        } else {
            console.log('Елементи не знайдено та не знайдений елемент refreshArray');
        }
    }
}

function checkLocalStore() {
    document.addEventListener("keydown", function (event) {
        // Перевірка натискання NumpadSubtract
        let value = localStorage.getItem("refresherator");
        if (event.code === "NumpadSubtract") {
            if (value === "start") {
                localStorage.removeItem('refresherator');
                clearInterval(interval)
                console.log('clearInterval')
            }
            else {
                localStorage.setItem('refresherator', 'start');
                var interval = setInterval(checkElement, time_refresh);
            }
        }
    });
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


//текст із заявки
// var textElement = document.querySelectorAll('td[headers="mdbef32ea-content_0"]')[2].firstElementChild.firstElementChild;

// // Отримуємо всі тексти з дочірніх елементів
// var textNodes = Array.from(textElement.childNodes)
//   .filter(node => node.nodeType === Node.TEXT_NODE)
//   .map(node => node.textContent.trim())
//   .join('');

// console.log(textNodes);
