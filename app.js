
const SEATS = [3, 6, 9, 2, 5, 8, 1, 4, 7];
const STORAGE_KEY = "vanBookingsByDate";

function getAll() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function getByDate(date) {
  const all = getAll();
  return all[date] || [];
}

function save(date, booking) {
  const all = getAll();
  if (!all[date]) all[date] = [];
  all[date].push(booking);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
}

function renderSeats() {
  const date = document.getElementById("globalDate").value;
  const grid = document.getElementById("seatGrid");
  const form = document.getElementById("formBox");

  grid.innerHTML = "";
  form.classList.add("hidden");
  selectedSeat = null;

  if (!date) {
    grid.innerHTML = "<p>กรุณาเลือกวันที่ก่อน</p>";
    return;
  }

  const bookings = getByDate(date);

  SEATS.forEach((seat) => {
    const isBooked = bookings.some((b) => String(b.seat) === String(seat));
    const div = document.createElement("div");
    div.className = "seat" + (isBooked ? " booked" : "");
    div.textContent = seat;
    div.dataset.seat = seat;

    if (!isBooked) {
      div.addEventListener("click", () => selectSeat(div));
    }

    grid.appendChild(div);
  });
}

let selectedSeat = null;

function selectSeat(el) {
  document.querySelectorAll(".seat").forEach((s) => s.classList.remove("selected"));
  el.classList.add("selected");
  selectedSeat = el.dataset.seat;

  const date = document.getElementById("globalDate").value;
  document.getElementById("selectedSeat").textContent = selectedSeat;
  document.getElementById("showDate").textContent = date;

  document.getElementById("formBox").classList.remove("hidden");
}

function submitBooking() {
  const date = document.getElementById("globalDate").value;
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const line = document.getElementById("line").value.trim();

  if (!date || !selectedSeat || !name || !phone || !line) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const exist = getByDate(date);
  if (exist.some((b) => String(b.seat) === String(selectedSeat))) {
    alert("ที่นั่งนี้ถูกจองแล้วในวันนี้");
    renderSeats();
    return;
  }

  save(date, {
    seat: selectedSeat,
    name,
    phone,
    line,
    time: new Date().toLocaleString(),
  });

  alert("จองสำเร็จ!");

  document.getElementById("formBox").classList.add("hidden");
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("line").value = "";

  renderSeats();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("globalDate").addEventListener("change", renderSeats);
  document.getElementById("submitBtn").addEventListener("click", submitBooking);
  renderSeats();
});
