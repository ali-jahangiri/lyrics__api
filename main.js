const input = document.querySelector("input");
const trigger = document.querySelector("#searchBtn");
const resultContainer = document.querySelector("#resultContainer");
const spinner = document.querySelector(".loader");

function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}

let isLoading = false;
let resultList = [];

const loadingSpinnerHandler = () => {
  if (!isLoading) {
    spinner.classList.add("spinner__close");
  } else {
    spinner.classList.remove("spinner__close");
  }
};

const itemCreator = () => {};

const searchResult = debounce((value) => {
  isLoading = true;
  loadingSpinnerHandler();
  fetch(`https://api.lyrics.ovh/suggest/${value.trim()}`)
    .then((res) => res.json())
    .then(({ data }) => {
      isLoading = false;
      loadingSpinnerHandler();
      console.log(data);
    });
}, 500);
input.addEventListener("input", ({ target: { value } }) => {
  if (value.trim()) searchResult(value);
});

// trigger.addEventListener("click", () => {});
