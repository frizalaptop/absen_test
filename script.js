const postURL =
  "https://script.google.com/macros/s/AKfycbzWji4Lnqm7wJ8SHQx2IJSHLLu3P7f9-HnHXVoq4cgExlDGddB-aI8qyn6xJcld9BHIIA/exec";
const deleteURL =
  "https://script.google.com/macros/s/AKfycbw8bkuwh1gGNUBZzd37xssp04QqmNa0GCNhe1hqPt_jq0cLq43EMBkEyuGvgBkJg-pM4w/exec";

const form = document.forms["myform"];
const postBtn = document.querySelector("#postData");
const deleteBtn = document.querySelector("#deleteData");
const tableBody = document.querySelector("tbody");

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const precences = await generatePrecences();
    generateTable(precences);
  } catch (error) {
    alert("Belum ada data");
  }
});

async function generatePrecences() {
  const response = await fetch(postURL, {
    method: "POST",
    body: new FormData(form),
  });

  const data = await response.json();
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
