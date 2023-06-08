// const grid = [
//   [2, 5, 3, 4, 2, 5, 3, 4],
//   [4, 8, 1, 2, 4, 8, 1, 2],
//   [6, 2, 5, 1, 6, 2, 5, 1],
//   [1, 2, 4, 3, 1, 2, 4, 3],
//   [2, 5, 3, 4, 2, 5, 3, 4],
//   [4, 8, 1, 2, 4, 8, 1, 2],
//   [6, 2, 5, 1, 6, 2, 5, 1],
//   [1, 2, 4, 3, 1, 2, 4, 3],
// ];

// // get grid width and height - 2
// const gridWidth = grid[0]!.length - 2;
// const gridHeight = grid.length - 2;

// const scores = Array.from({ length: gridHeight }, () =>
//   Array.from({ length: gridWidth }, () => 0)
// );

// console.log(gridWidth, gridHeight);

// for (let x = 0; x < gridWidth; x++) {
//   for (let y = 0; y < gridHeight; y++) {
//     // we want to sum the 3x3 grid around the current cell
//     // current cell is at x + 1, y + 1
//     const sum =
//       grid[y]![x]! +
//       grid[y]![x + 1]! +
//       grid[y]![x + 2]! +
//       grid[y + 1]![x]! +
//       grid[y + 1]![x + 1]! +
//       grid[y + 1]![x + 2]! +
//       grid[y + 2]![x]! +
//       grid[y + 2]![x + 1]! +
//       grid[y + 2]![x + 2]!;

//     // store the sum in the scores array
//     scores[y]![x] = sum;
//   }
// }

// console.log(scores);

const generateGrid = (
  rows: number,
  cols: number,
  minScore: number,
  maxScore: number
) => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const score = Math.floor(
        Math.random() * (maxScore - minScore + 1) + minScore
      );
      row.push(score);
    }
    grid.push(row);
  }
  return grid;
};

// Generate a 10x10 grid of scores
const grid = generateGrid(300, 300, 1, 10);

console.log(grid);
