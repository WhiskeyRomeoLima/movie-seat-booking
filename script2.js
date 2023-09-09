
const container = document.querySelector(".container");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
const buttonSave = document.getElementById('buttonSave')
loadSeats()
function loadSeats() {

  for (let r = 1; r <= 8; r++) {
      const row = document.createElement('div')
      row.classList.add('row')

      container.appendChild(row)
      for ( let s = 1; s <= 8; s++) {
        const seat = document.createElement('div')
        seat.classList.add('seat')
        seat.innerHTML = `R${r}-S${s}`
        if (seat.innerHTML ==='R1-S3' || seat.innerHTML === 'R1-S4') {
          seat.classList.add('occupied')          
        }
        row.appendChild(seat)
      }
  }  
}

const rows = document.querySelectorAll('.row')
const seats = document.querySelectorAll(".row .seat");

//call populateUI() here
populateUI();

// declare ticketPrice here and set it to +movieSelct .value
let ticketPrice = +movieSelect.value;

//* Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//* Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  //looking for the indexes in seats where div.seat.selected's are found
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
 
  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
  
  setMovieData(movieSelect.selectedIndex, movieSelect.value);

}

//* Get data from localstorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })
  }

}

//* Movie select event
movieSelect.addEventListener("change", (e) => {
  console.log(e.target.selectedIndex)
  ticketPrice = e.target.value
  movieSelect.selectedIndex = e.target.selectedIndex
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount();
});

//* Seat click event
container.addEventListener("click", (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
  }
  updateSelectedCount() // updates the count, total, 
});

const confirmation = document.getElementById('comfirmation ')

buttonSave.addEventListener('click', e => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  let pendingSeats = document.getElementById('pendingSeats')
  const confirmation = document.getElementById('confirmation')
  if (confirmation.style.display = 'none') {
    confirmation.style.display = 'block'
  } else {
    confirmation.style.display = 'none'
  }

  selectedSeats.forEach(seat => {
    pendingSeats.innerText += ' ' + seat.innerHTML + ', ' 
    seat.classList.remove('selected')
    seat.classList.add('occupied')
  })
  buttonSave.disabled = true;
})

// Initial count and total -- executes on load
updateSelectedCount();
