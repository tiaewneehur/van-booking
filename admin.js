
const STORAGE_KEY = "vanBookingsByDate";

function getAll() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
}

function loadTable() {
  const all = getAll();
  const tbody = document.getElementById("rows");
  tbody.innerHTML = "";

  Object.keys(all).forEach((date) => {
    all[date].forEach((b) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${date}</td>
        <td>${b.seat}</td>
        <td>${b.name}</td>
        <td>${b.phone}</td>
        <td>${b.line}</td>
        <td>${b.time}</td>
      `;
      tbody.appendChild(tr);
    });
  });
}

document.addEventListener("DOMContentLoaded", loadTable);
