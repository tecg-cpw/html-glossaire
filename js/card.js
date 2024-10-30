import { settings } from "./settings.js";

export const card = {
  touchstartX: 0,
  touchendX: 0,
  minimumMove: 100,
  init() {
    this.hideKnowncardCheckbox = document.getElementById(
      settings.hideKnownCardCheckboxID,
    );
    this.swipeCheckbox = document.getElementById(settings.swipeCardCheckboxID);
    this.hideAllDefinitionsBtn = document.getElementById(
      settings.hideAllDefinitionsBtnID,
    );
    this.showAllDefinitionsBtn = document.getElementById(
      settings.showAllDefinitionsBtnID,
    );
    this.cards = document.querySelectorAll(`.${settings.cardClass}`);
    this.knownCardCheckboxes = document.querySelectorAll(
      settings.knownCardCheckboxSelector,
    );
    this.addEventListeners();
  },
  hiddeOrShowCard(card) {
    if (this.touchendX < this.touchstartX) {
      if (this.touchstartX - this.touchendX > this.minimumMove) {
        card.classList.add(settings.cardHideDefinitionClass);
      }
    } else if (this.touchendX > this.touchstartX) {
      if (this.touchendX - this.touchstartX > this.minimumMove) {
        card.classList.remove(settings.cardHideDefinitionClass);
      }
    }
  },
  addEventListeners: function () {
    this.cards.forEach((card) => {
      card.addEventListener("mousedown", (event) => {
        if (this.swipeCheckbox.checked) {
          this.touchstartX = event.clientX;
        }
      });
      card.addEventListener("touchstart", (event) => {
        if (this.swipeCheckbox.checked) {
          this.touchstartX = event.changedTouches[0].screenX;
        }
      });
      card.addEventListener("mouseup", (event) => {
        if (this.swipeCheckbox.checked) {
          this.touchendX = event.clientX;
          this.hiddeOrShowCard(event.currentTarget);
        }
      });
      card.addEventListener("touchend", (event) => {
        if (this.swipeCheckbox.checked) {
          this.touchendX = event.changedTouches[0].screenX;
          this.hiddeOrShowCard(event.currentTarget);
        }
      });
    });
    this.knownCardCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        if (this.hideKnowncardCheckbox.checked) {
          if (e.currentTarget.checked) {
            e.currentTarget
              .closest(`.${settings.cardClass}`)
              .classList.add(settings.knownClass);
          } else {
            e.currentTarget
              .closest(`.${settings.cardClass}`)
              .classList.remove(settings.knownClass);
          }
        }
      });
    });
    this.hideAllDefinitionsBtn.addEventListener("click", () => {
      this.cards.forEach((card) => {
        card.classList.add(settings.cardHideDefinitionClass);
      });
    });
    this.showAllDefinitionsBtn.addEventListener("click", () => {
      this.cards.forEach((card) => {
        card.classList.remove(settings.cardHideDefinitionClass);
      });
    });
    this.hideKnowncardCheckbox.addEventListener("change", () => {
      if (this.hideKnowncardCheckbox.checked) {
        document
          .querySelectorAll(
            `.${settings.cardClass}:not(${settings.cardHideClass})`,
          )
          .forEach((card) => {
            if (card.querySelector("dt input[type=checkbox]").checked) {
              card.classList.add(settings.knownClass);
            }
          });
      } else {
        document.querySelectorAll(`.${settings.cardClass}`).forEach((card) => {
          card.classList.remove(settings.knownClass);
        });
      }
    });
  },
};
