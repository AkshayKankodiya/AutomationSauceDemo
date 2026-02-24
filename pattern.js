// pattern.ts
// for (let i = 5; i >= 1; i--) {
//   let row: string = "";
//   for (let j = 1; j <= i; j++) {
//     row += "*";
//   }
//   console.log(row);
// }
function printReverseStarPattern(rows) {
    for (var i = rows; i >= 1; i--) {
        var row = "";
        for (var j = 1; j <= i; j++) {
            row += "*";
        }
        console.log(row);
    }
}
// Call the function
printReverseStarPattern(5);
