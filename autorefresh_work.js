// ==UserScript==
// @name        ukrgasbank.com
// @namespace   Violentmonkey Scripts
// @match       https://hd.ukrgasbank.com/maximo/*
// @grant       none
// @version     1.0
// ==/UserScript==


(function () {
    'use strict';
    let timeInterval;//const_interval
    let time = 750;
    let text = '\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t\tОрганізаціявіддаленого робочогомісця (РМ)\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t'
    let mouseUp = new MouseEvent('mouseup', {
        bubbles: true,
        cancelable: true,
        view: window
    });
    let classname = 'mbaf55d';


    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('load', main);


    function main() {
        const autoClickerStatus = localStorage.getItem('HD_autoClicker');
        if (autoClickerStatus == 'work') {
            console.log('HD_autoClicker work');
            timeInterval = setInterval(work, time);
        } else {
            clearInterval(timeInterval);
            console.log('HD_autoClicker nowork');
        }
    }

    function work() {
        if (document.querySelector('[data-appid="activity"]')) {
            clickMyZayavka();
        }
        if (document.querySelector('[data-appid="startcntr"]')) {
            perevirka();
        }
    }

    function clickMyZayavka() {
        const woElement = document.querySelector('[id="m43f6b5e4_hyperlink_0-lb"]');
        const incElement = document.querySelector('[id="mb4bffc9f_hyperlink_0-lb"]');

        if (woElement) {
            woElement.parentElement.style.backgroundColor = '#77008040';
            woElement.dispatchEvent(mouseUp);
            clearInterval(timeInterval);
            console.log('wo');
        }

        if (incElement) {
            incElement.parentElement.style.backgroundColor = '#77008040';
            incElement.dispatchEvent(mouseUp);
            clearInterval(timeInterval);
            console.log('inc');
        }
    }

    function perevirka() {
        const elements = document.querySelectorAll(`[headers="${classname}-content_0"]`);

        if (elements.length > 1 && elements[2].textContent === text) {
            console.log('HD_autoClicker nowork');
            clearInterval(timeInterval);
        } else {
            clickZayavka();
        }
    }

    function clickZayavka() {
        const zayavkaElements = document.querySelectorAll(`[headers="${classname}-content_0"]`);
        const refLinkElement = document.getElementById(`${classname}-content_reflink`);

        if (zayavkaElements.length > 1) {
            const zayavkaPreview = zayavkaElements[1];
            document.getElementById('psuedoForm').style.backgroundColor = 'red';
            zayavkaPreview.parentElement.style.backgroundColor = "#77008040";
            zayavkaPreview.firstElementChild.click();
            clearInterval(timeInterval);
            console.log('click');
        } else if (refLinkElement && zayavkaElements.length <= 1) {
            const color_refresh = document.getElementById(`${classname}-hb`);
            color_refresh.style.backgroundColor = getRandomColor();
            color_refresh.style.borderRadius = "10px";
            refLinkElement.click();
            console.log('refresh');
        } else {
            console.log('No Work');
        }
    }

    function handleKeyPress(event) {
        if (event.code === 'NumpadSubtract') {
            const autoClickerStatus = localStorage.getItem('HD_autoClicker');
            if (autoClickerStatus === 'work') {
                localStorage.removeItem('HD_autoClicker');
                clearInterval(timeInterval);
                console.log('remove HD_autoClicker');
            } else {
                localStorage.setItem("HD_autoClicker", "work");
                timeInterval = setInterval(work, time);
                console.log('add HD_autoClicker');
            }
        }



    }


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


})();


