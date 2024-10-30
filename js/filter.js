import { settings } from "./settings.js";

export const filter = {
  init() {
    document.body.classList.add("js");
    this.cards = document.querySelectorAll(`.${settings.cardClass}`);
    this.searchInput = document.getElementById(settings.searchID);
    this.definitionTermes = document.querySelectorAll("dt");
    this.filterSelect = document.getElementById(settings.filterID);
    this.filterForm = document.getElementById(settings.filterFormSelector);
    this.initDataList();
    this.initSelection();

    this.filterForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
    this.searchInput.addEventListener("input", () => {
      this.filterCards();
    });
    this.filterSelect.addEventListener("input", () => {
      this.filterCards();
    });
  },
  filterCards: function () {
    this.showAllCards();
    this.removeAllMarks();
    const searchValue = this.searchInput.value;
    const filter = this.filterSelect.value;
    this.cards.forEach((card) => {
      if (filter !== "all" && card.dataset.cat !== filter) {
        card.classList.add(settings.cardHideClass);
      } else {
        const dt = card.querySelector("dt");
        if (
          searchValue.trim().length > 0 &&
          dt.innerText
            .trim()
            .toLowerCase()
            .includes(searchValue.trim().toLowerCase())
        ) {
          dt.innerHTML = dt.innerHTML.replace(
            new RegExp(
              `(>[^<>]*)(${this.escapeRegExp(searchValue)})([^<>]*<)`,
              "gi",
            ),
            "$1<mark>$2</mark>$3",
          );
        } else if (searchValue.trim().length > 0) {
          card.classList.add(settings.cardHideClass);
        }
      }
    });
  },
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  },
  showAllCards() {
    this.cards.forEach((card) => {
      card.classList.remove(settings.cardHideClass);
    });
  },
  removeAllMarks() {
    this.cards.forEach((card) => {
      this.removeMarks(card);
    });
  },
  removeMarks: function (card) {
    const currentDefinitionTerm = card.querySelector("dt");
    currentDefinitionTerm.innerHTML =
      currentDefinitionTerm.innerHTML.replaceAll("<mark>", "");
    currentDefinitionTerm.innerHTML =
      currentDefinitionTerm.innerHTML.replaceAll("</mark>", "");
  },
  initDataList() {
    let dataList = '<datalist id="data-termes">';
    this.cards.forEach((card) => {
      dataList += `<option value="${
        card.querySelector("dt").innerText
      }"></option>`;
    });
    dataList += "</datalist>";
    document.body.insertAdjacentHTML("beforeend", dataList);
    this.searchInput.setAttribute("list", "data-termes");
  },
  initSelection() {
    let options = [];
    this.cards.forEach((terme) => {
      const newCat = terme.dataset.cat.trim();
      if (newCat.length > 0) {
        if (!options.includes(newCat)) {
          options.push(newCat);
          this.filterSelect.insertAdjacentHTML(
            "beforeend",
            ` <option value="${newCat}">${newCat}</option>`,
          );
        }
      }
    });
  },
};
