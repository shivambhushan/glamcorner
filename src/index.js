const numArr = [...Array(100).keys()].map((x) => ++x);

let numMap = [];

for (let num = 1; num <= numArr.length; num++) {
  let str = "";
  if (num % 2 === 0) {
    str = "even";
  } else {
    str = "odd";
  }

  if (num % 3 === 0) {
    str += ", multiple-of-three";
  }

  numMap[num] = { Number: num, Attribute: str };
}

function exportCSV(arrayHeader, arrayData, delimiter, fileName) {
  let header = arrayHeader.join(delimiter) + "\n";
  let csv = header;
  arrayData.forEach((obj) => {
    let row = [];
    for (Number in obj) {
      if (obj.hasOwnProperty(Number)) {
        row.push(obj[Number]);
      }
    }
    csv +=
      row
        .map((string) => (string === null ? "" : `\"${string}\"`))
        .join(delimiter) + "\n";
  });

  let csvData = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  let csvUrl = URL.createObjectURL(csvData);

  let hiddenElement = document.createElement("a");
  hiddenElement.href = csvUrl;
  hiddenElement.target = "_blank";
  hiddenElement.download = fileName + ".csv";
  hiddenElement.click();
}

exportCSV(["Number", "Attribute"], numMap, ",", "file-test");
