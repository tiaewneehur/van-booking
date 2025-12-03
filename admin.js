
// admin.js – อ่านข้อมูลจาก localStorage key เดียวกับหน้าเว็บจอง
const STORAGE_KEY = 'vanBookingsByDate';

function getAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function drawTable() {
  const tbody = document.querySelector('#tbl tbody');
  tbody.innerHTML = '';

  const all = getAll();
  const dates = Object.keys(all);

  if (dates.length === 0) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.colSpan = 6;
    td.textContent = 'ยังไม่มีข้อมูลการจองในเครื่องนี้';
    tr.appendChild(td);
    tbody.appendChild(tr);
    return;
  }

  dates.forEach(date => {
    all[date].forEach(b => {
      const tr = document.createElement('tr');
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

function exportCSV() {
  const all = getAll();
  const rows = [['Date', 'Seat', 'Name', 'Phone', 'Line', 'Time']];

  Object.keys(all).forEach(date => {
    all[date].forEach(b => {
      rows.push([date, b.seat, b.name, b.phone, b.line, b.time]);
    });
  });

  if (rows.length === 1) {
    alert('ยังไม่มีข้อมูลให้ Export');
    return;
  }

  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'bookings.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function clearAll() {
  if (!confirm('ลบข้อมูลการจองทั้งหมดในเครื่องนี้?')) return;
  localStorage.removeItem(STORAGE_KEY);
  drawTable();
}

document.addEventListener('DOMContentLoaded', drawTable);
