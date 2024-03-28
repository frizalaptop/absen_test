const postURL =
  "https://script.google.com/macros/s/AKfycbxec1ZFA2i-mRxVmeS8BUM-SQ7dJzfaTWMKyBRvA_nbkEeyqT4pi6OB7YlrfzdszVxO6Q/exec";
const deleteURL =
  "https://script.google.com/macros/s/AKfycbw8bkuwh1gGNUBZzd37xssp04QqmNa0GCNhe1hqPt_jq0cLq43EMBkEyuGvgBkJg-pM4w/exec";

const form = document.forms["myform"];
const postBtn = document.querySelector("#postData");
const deleteBtn = document.querySelector("#deleteData");
const tableBody = document.querySelector("tbody");

document.addEventListener("DOMContentLoaded", async () => {
  setInterval(updateClock, 1000);

  try {
    const precences = await generatePrecences();
    generateTable(precences);
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

async function generatePrecences() {
  const response = await fetch(postURL, {
    method: "POST",
    body: new FormData(form),
  });

  const data = await response.json();
  console.log(data);
  return data.result;
}

function generateTable(precences) {
  const tableRows = precences.reduce((accumulator, current) => {
    return (
      accumulator + `<tr><td>${current[0]}</td><td>${current[1]}</td></tr>`
    );
  }, "");

  tableBody.innerHTML = tableRows;
}

function clearTable() {
  tableBody.innerHTML = "";
  console.log("empty");
}

postBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  try {
    const precences = await generatePrecences();
    generateTable(precences);
  } catch (error) {
    alert("Belum ada data");
  }
});

deleteBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch(deleteURL, {
    method: "POST",
    // body: new FormData(form),
  });

  clearTable();
});
