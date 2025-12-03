
function draw(){
  let bookings = JSON.parse(localStorage.getItem("bookings") || "[]");
  let tbody = document.querySelector("#tbl tbody");
  tbody.innerHTML = "";

  bookings.forEach(b=>{
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${b.seat}</td><td>${b.name}</td><td>${b.phone}</td>
                    <td>${b.line}</td><td>${b.date}</td><td>${b.time}</td>`;
    tbody.appendChild(tr);
  });
}

function exportCSV(){
  let rows = [["Seat","Name","Phone","Line","Date","Time"]];
  let data = JSON.parse(localStorage.getItem("bookings") || "[]");
  data.forEach(b=>rows.push([b.seat,b.name,b.phone,b.line,b.date,b.time]));

  let csv = rows.map(r => r.join(",")).join("\n");
  let blob = new Blob([csv], {type:"text/csv"});
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url; a.download = "bookings.csv";
  a.click();
}

draw();
