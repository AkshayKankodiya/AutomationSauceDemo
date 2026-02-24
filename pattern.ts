// pattern.ts

// for (let i = 5; i >= 1; i--) {
//   let row: string = "";

//   for (let j = 1; j <= i; j++) {
//     row += "*";
//   }

//   console.log(row);
// }

function printReverseStarPattern(rows: number): void {
  for (let i = rows; i >= 1; i--) {
    let row: string = "";

    for (let j = 1; j <= i; j++) {
      row += "*";
    }

    console.log(row);
  }
}

// Call the function
printReverseStarPattern(5);
