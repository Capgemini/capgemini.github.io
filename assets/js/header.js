'use strict';

// Open and close the mobile menu.
var menu = document.querySelector('.notepad-menu');
var menuTriggers = document.querySelectorAll('.notepad-mobile-menu-toggle');
for (var i = 0; i < menuTriggers.length; i++) {
    menuTriggers[i].addEventListener('click', function () {
        menu.classList.toggle('opened');
    });
}
