
const seats = [3,6,9,2,5,8,1,4,7];
let selected = null;

function loadSeats(){
  let grid = document.getElementById("seatGrid");
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  grid.innerHTML = "";

  seats.forEach(n => {
    let div = document.createElement("div");
    div.className = "seat " + (bookings.some(b => b.seat == n) ? "booked" : "");
    div.textContent = n;
    div.dataset.seat = n;

    if (!div.classList.contains("booked")) {
      div.onclick = () => selectSeat(div);
    }

    grid.appendChild(div);
  });
}

function selectSeat(el){
  document.querySelectorAll(".seat").forEach(s => s.classList.remove("selected"));
  el.classList.add("selected");
  selected = el.dataset.seat;

  document.getElementById("selectedSeat").textContent = selected;
  document.getElementById("formBox").classList.remove("hidden");
}

function submitBooking(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let line = document.getElementById("line").value;
  let date = document.getElementById("date").value;

  if(!name || !phone || !line || !date){
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  let booking = { seat: selected, name, phone, line, date, time: new Date().toLocaleString() };

  // Store local
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  bookings.push(booking);
  localStorage.setItem("bookings", JSON.stringify(bookings));

  alert("จองสำเร็จ!");
  location.reload();
}

loadSeats();
