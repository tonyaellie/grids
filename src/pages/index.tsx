import { type NextPage } from 'next';
import { useState } from 'react';

import { grid } from '../gird';

const range = 16;

const gridWidth = grid[0]!.length - 2;
const gridHeight = grid.length - 2;

const scores = Array.from({ length: gridHeight }, () =>
  Array.from({ length: gridWidth }, () => 0)
);

console.log(gridWidth, gridHeight);

for (let x = 0; x < gridWidth; x++) {
  for (let y = 0; y < gridHeight; y++) {
    // we want to sum the 3x3 grid around the current cell
    // current cell is at x + 1, y + 1
    const sum =
      grid[y]![x]! +
      grid[y]![x + 1]! +
      grid[y]![x + 2]! +
      grid[y + 1]![x]! +
      grid[y + 1]![x + 1]! +
      grid[y + 1]![x + 2]! +
      grid[y + 2]![x]! +
      grid[y + 2]![x + 1]! +
      grid[y + 2]![x + 2]!;

    // store the sum in the scores array
    scores[y]![x] = sum;
  }
}

const isEdge = (x: number, y: number) => {
  return x === 0 || y === 0 || x === gridWidth + 1 || y === gridHeight + 1;
};

const isNeighbourSelected = (
  x: number,
  y: number,
  selected: {
    x: number;
    y: number;
  }[]
) => {
  return selected.some((s) => {
    return (
      (s.x === x && (s.y === y + 1 || s.y === y - 1)) ||
      (s.y === y && (s.x === x + 1 || s.x === x - 1)) ||
      (s.x === x + 1 && (s.y === y + 1 || s.y === y - 1)) ||
      (s.x === x - 1 && (s.y === y + 1 || s.y === y - 1))
    );
  });
};

const isInRangeOfSelected = (
  x: number,
  y: number,
  selected: {
    x: number;
    y: number;
  }[]
) => {
  // check if cell is in range of any selected cell (use manhattan distance)
  return selected.some((s) => {
    return Math.abs(s.x - x) <= range && Math.abs(s.y - y) <= range;
  });
};

const Home: NextPage = () => {
  const [selected, setSelected] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);

  // display the grid
  return (
    <div
      className="flex flex-col"
      style={{
        width: `${gridWidth * 64}px`,
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        // calculate score
        // this is found by finding the sum of the grid but multiplying all selected cells and their neighbours by 0

        // first, multiply all selected cells and their neighbours by 0
        const newGrid = grid.map((row, y) =>
          row.map((col, x) => {
            selected.some((s) => s.x === x && s.y === y)
              ? (col = 0)
              : isNeighbourSelected(x, y, selected)
              ? (col = 0)
              : (col = col);
            return col;
          })
        );

        // then, calculate the score
        const score = newGrid.reduce((acc, row, y) => {
          return (
            acc +
            row.reduce((acc, col, x) => {
              return acc + col;
            }, 0)
          );
        }, 0);

        // if any cell is not selected or in range of a selected cell, alert the user
        if (
          grid.some((row, y) =>
            row.some((col, x) => {
              return (
                !selected.some((s) => s.x === x && s.y === y) &&
                !isInRangeOfSelected(x, y, selected)
              );
            })
          )
        ) {
          alert('All cells must be coloured.');
          return;
        }

        alert(score);
      }}
    >
      {grid.map((row, y) => (
        <div key={y} className="flex">
          {row.map((col, x) => (
            <div
              key={x}
              className={`h-16 w-16 select-none border ${
                isEdge(x, y) ? 'border-red-100' : 'cursor-pointer'
              } ${
                selected.some((s) => s.x === x && s.y === y)
                  ? 'bg-yellow-400'
                  : isNeighbourSelected(x, y, selected)
                  ? 'bg-white'
                  : isInRangeOfSelected(x, y, selected)
                  ? 'bg-black'
                  : 'bg-green-50'
              }`}
              onClick={() => {
                if (isEdge(x, y)) return;
                // if the cell is already selected, remove it from the selected array
                if (selected.some((s) => s.x === x && s.y === y)) {
                  setSelected((prev) =>
                    prev.filter((s) => s.x !== x || s.y !== y)
                  );
                  return;
                }
                // otherwise add it to the selected array
                setSelected((prev) => [...prev, { x, y }]);
              }}
            >
              {isEdge(x, y) ? col : `${col}\n${scores[x - 1]![y - 1]!}`}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Home;
