import { settings } from "./settings.js";

export const letterNav = {
  mainNav: document.querySelector(settings.mainNav),
  menuItems: document.querySelectorAll(settings.mainNavSelector),
  removeUnnecessaryItemsFromNav: function () {
    this.menuItems.forEach((letter) => {
      if (
        document.getElementById(letter.textContent.trim().toLowerCase()) ===
          null &&
        document.getElementById(letter.textContent.trim().toUpperCase()) ===
          null
      ) {
        letter.remove();
      }
    });
  },
  makeNavSticky: function () {
    const navTop = this.mainNav.offsetTop-this.mainNav.offsetHeight;
    window.addEventListener("scroll", () => {
      if (window.scrollY >= navTop) {
        document.querySelector(settings.mainNav).classList.add("main-nav--sticky");
      } else {
        document.querySelector(settings.mainNav).classList.remove("main-nav--sticky");
      }
    });
  },
  init() {
    this.removeUnnecessaryItemsFromNav();
    this.makeNavSticky();
  },
};
