const postURL =
  "https://script.google.com/macros/s/AKfycbxtbjEktnYKbOOHlktiwJYrPpRCqvbcdkaQr_6obEhe8LpFkMLSInc2ATZ99AYrVGxFOg/exec";
const deleteURL =
  "https://script.google.com/macros/s/AKfycbw8bkuwh1gGNUBZzd37xssp04QqmNa0GCNhe1hqPt_jq0cLq43EMBkEyuGvgBkJg-pM4w/exec";

const form = document.forms["myform"];
const postBtn = document.querySelector("#postData");
const deleteBtn = document.querySelector("#deleteData");
const tableBody = document.querySelector("tbody");

document.addEventListener("DOMContentLoaded", async () => {
  setInterval(updateClock, 1000);
  generateDate();

  try {
    const precences = await generatePrecences();
    createHeadTable(precences.date);
    createRowTable(precences.result);
    createValueTable(precences.result, precences.date);
  } catch (error) {
    alert("Belum ada data");
  }
});

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  const timeString = hours + ":" + minutes + ":" + seconds;

  document.getElementById("clock").innerText = timeString;
}

function generateDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const month = monthNames[currentDate.getMonth()];
  const day = String(currentDate.getDate()).padStart(2, "0");

  const formattedDate = `${day} - ${month} - ${year}`;

  document.getElementById("date").innerHTML = formattedDate;
}

async function generatePrecences() {
  const response = await fetch(postURL, {
    method: "POST",
    body: new FormData(form),
  });

  const data = await response.json();
  return { result: data.result, date: data.date };
}

function createHeadTable(date) {
  const tableHead = document.getElementById("row-header");
  tableHead.innerHTML = "<th>NIP</th><th>NAMA</th>";
  let count = 1;
  while (count <= date) {
    const th = document.createElement("th");
    th.innerText = count;
    tableHead.appendChild(th);
    count++;
  }
}

function createRowTable(precences, date) {
  const tableRows = precences.reduce((accumulator, current) => {
    return accumulator + `<tr class="values"></tr>`;
  }, "");

  tableBody.innerHTML = tableRows;
}

function createValueTable(precences, date) {
  const tr = document.querySelectorAll(".values");
  tr.forEach((tRow, index) => {
    const precence = precences[index].splice(0, date + 2);
    const tableColumn = precence.reduce(
      (accumulator, current, currentIndex) => {
        return accumulator + `<td>${precence[currentIndex]}</td>`;
      },
      ""
    );

    tRow.innerHTML = tableColumn;
  });
}

function clearTable() {
  tableBody.innerHTML = "";
  console.log("empty");
}

postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const precences = await generatePrecences();
    createHeadTable(precences.date);
    createRowTable(precences.result);
    createValueTable(precences.result, precences.date);
  } catch (error) {
    alert("Belum ada data");
  } finally {
    form.querySelector('[name="ID"]').value = "";
  }
});

// deleteBtn.addEventListener("click", async (e) => {
//   e.preventDefault();
//   await fetch(deleteURL, {
//     method: "POST",
//     // body: new FormData(form),
//   });

//   clearTable();
// });
