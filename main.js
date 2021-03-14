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
  isLoading = !isLoading;
  if (!isLoading) {
    spinner.classList.add("spinner__close");
  } else {
    spinner.classList.remove("spinner__close");
  }
};

const itemCreator = () => {
  resultList.forEach(
    ({ preview, title, artist: { picture_xl, name }, album: { cover_xl } }) => {
      resultContainer.innerHTML += `
        <div style="background: url(${cover_xl});" data-id="" class="item">
        <div><p>${title}</p></div>
      </div>
        `;
      // <audio src="${preview}"></audio>
    }
  );
};

const searchResult = debounce((value) => {
  console.log("inside", value);
  loadingSpinnerHandler();
  fetch(`https://api.lyrics.ovh/suggest/${value.trim()}`)
    .then((res) => res.json())
    .then(({ data }) => {
      resultList = data;
      loadingSpinnerHandler();
      itemCreator();
    });
}, 5000);
input.addEventListener("input", ({ target: { value } }) => {
  if (value.trim()) searchResult(value);
});

// trigger.addEventListener("click", () => {});
