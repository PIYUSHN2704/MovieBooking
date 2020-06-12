const seat = document.querySelectorAll(".seat");
var seatCount = document.getElementById("count");
const movie = document.getElementById("movie");
const price = document.getElementById("price");
var count = 0;
var ticketPrice;
var bFlag = false;
var seatArray = [...seat];
var selectedIndex = [];
var selectedIndexOccupied = [];

function populateUI() {
  let movieIndex = localStorage.getItem("movieIndex");
  let moviePrice = localStorage.getItem("moviePrice");
  let selectedIndex = JSON.parse(localStorage.getItem("selectedSeat"));
  if (selectedIndex !== null) {
    seat.forEach((element, index) => {
      if (selectedIndex.indexOf(index) === -1) {
      } else {
        element.className = "seat selected";
      }
    });

    movie.selectedIndex = movieIndex;
    count = selectedIndex.length;
    seatCount.innerText = count;
    price.innerText = count * movie.value;
  }
}
populateUI();

function setMovieData(index, value) {
  localStorage.setItem("movieIndex", index);
  localStorage.setItem("moviePrice", value);
}

// seat.forEach((element, index) => {
//   if (element.className === "seat occupied") {
//     selectedIndexOccupied.push(index);
//   }
// });
// localStorage.setItem("occupiedSeat", JSON.stringify(selectedIndexOccupied));

// update count
function updateCount() {
  var finalPrice;
  if (!bFlag) {
    finalPrice = 10 * count;
  } else {
    finalPrice = ticketPrice * count;
  }
  seatCount.innerText = count;
  price.innerText = finalPrice;
  console.log(selectedIndex);
  localStorage.setItem("selectedSeat", JSON.stringify(selectedIndex));
}

//  Event Listners
seat.forEach((oItem, index) => {
  if (oItem.parentElement.parentElement.className !== "showcase") {
    oItem.addEventListener("click", (e) => {
      if (oItem.className === "seat") {
        oItem.className = "seat selected";
        selectedIndex.push(seatArray.indexOf(oItem));
        count++;
      } else if (oItem.className === "seat selected") {
        oItem.className = "seat";
        count--;
        selectedIndex.pop(seatArray.indexOf(oItem));
      }
      updateCount();
    });
  }
});

// Event Listner for selecting movie
movie.addEventListener("change", (e) => {
  bFlag = true;
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateCount();
});
