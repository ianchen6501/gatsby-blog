---
title: "[演算法]Rotating a 2D Matrix"
date: "2020-5-24"
---

### 題目

給一個 square matrix (nxn) 將該 matrix 順時鐘轉 90 度後回傳。
例如:

- input

```js
;[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
```

- output

```js
;[
  [7, 4, 1],
  [8, 5, 2],
  [9, 6, 3],
]
```

### 自己的解法

這題其實想了一個禮拜 D，看了題目後沒頭緒就放著，後來想到說其實他就是轉 90 度，那我只要把轉九十度以後的順序依序放入三個空陣列就好。

```js
function rotate(array) {
  //建立新的 array
  let newArray = new Array()
  //依序放入空陣列
  for (let i = 0; i < array.length; i++) {
    newArray.push([])
  }
  //依序放入item
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      newArray[j].push(array[array.length - 1 - i][j])
    }
  }
  return newArray
}
```

### 課程的解法

課程的解法比較是用實際上把每個數字個別做 rotate，先把每個位置的 [indexX][indexy]給找出來，然後把位移後的位置置入準備放入的數字，做 n2 loop。

```js
const rotate = matrix => {
  const size = matrix.length - 1

  for (let layer = 0; layer < Math.floor(matrix.length / 2); layer++) {
    for (let i = layer; i < size - layer; i++) {
      const topFence = matrix[layer][i] // starts at top left of layer
      const rightFence = matrix[i][size - layer] // starts at top right of layer
      const bottomFence = matrix[size - layer][size - i] // starts at bottom right of layer
      const leftFence = matrix[size - i][layer] // starts at bottom left of layer

      // rotate 90 degrees clockwise element by element
      matrix[layer][i] = leftFence // set value walking top fence
      matrix[i][size - layer] = topFence // set value walking right fence
      matrix[size - layer][size - i] = rightFence // set value walking bottom fence
      matrix[size - i][layer] = bottomFence // set value walking left fence
    }
  }

  return matrix
}
```

### 心得

- 其實解法對我而言很不直觀，光是理解 code 的邏輯就花了不少力氣。不過我覺得自己的解法比較無法通用於各個題型，僅是針對這個問題的速解。而課程的解法示範了如何用演算法執行二維陣列的變形。
- 兩個解法的複雜度都是 O(n)。
