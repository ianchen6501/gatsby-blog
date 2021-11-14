---
title: "[演算法] The 3 sum problem"
date: "2021-06-09"
category: "algorythm"
---

### 題目

給定一個 array 包含不定數量的 integers，回傳三個 integers 一組的 array，這三個 integers 必須相加為 0，回傳的 arrays 不得重複。

例如:

```js
Input: [-3, -1, 1, 0, 2, 10, -2, 8]

Output: [
  [-3, 1, 2],
  [-2, 0, 2],
  [-1, 0, 1],
]
```

### 解題思路

這一題一開始整個卡在 three sum 這件事情，想說這樣不就要用到 O(n3) 的複雜度，太不合理了。

後來偷看了一下課程的說明，提示應該先解 two sum

```js
function twoSum(input) {
  //initially sort the array
  let array = input.sort((x, y) => {
    return x - y
  })
  let a = 0
  let b = array.length - 1
  let result = []
  //traverse array
  while (a < b) {
    //match case
    const sum = array[a] + array[b]
    if (sum === 0) {
      result.push([array[a], array[b]])
      //handle similar array[a] and array[b]
      while (array[a] === array[a + 1]) {
        a++
      }
      a++
      while (array[b] === array[b - 1]) {
        b--
      }
      b--
    } else if (sum < 0) {
      a++
    } else {
      b--
    }
  }
  return result
}
```

上面是 two sum 的解法，

1. 先把輸入的 array 排序成類似 `[-2, -1, 0, 1]` 這樣的狀態
2. 利用前後各一個 pointer，遍歷比對兩個 pointer 指到的數和是否等於 0 ，如果和 < 0 那表示左側的 pointer 應該向右移(數值變大)，乳果和 <0 那右側的的 pointer 應該向左移(數值變小)。
3. 當遍歷完所有數值後，就找到相加等於零的組合了。
   ![](https://i.imgur.com/sCf4o6k.png)
   回到題目本身，解決了 two sum 之後，只要把輸入的陣列每一個值分別做 two sum 的演算(相加等於該數值)，就可以把 three sum 要找的數值組合找出來。
   ![](https://i.imgur.com/RCq4LUO.png)

### 完整解法

```js
const threeSum = A => {
  //make an empty list to store the answer
  let reusult = []
  A.sort((a, b) => {
    return a - b
  })
  for (let i = 0; i < A.length; i++) {
    //pointer
    let j = i + 1
    let k = A.length - 1
    //traverse all the index less than the second index
    while (j < k) {
      const sum = A[i] + A[j] + A[k]
      if (sum === 0) {
        reusult.push([A[i], A[j], A[k]])
        //this will handle A[j] with simillar value
        while (A[j] === A[j + 1]) {
          j++
        }
        j++
        //this will handle A[k] with simillar value
        while (A[k] === A[k - 1]) {
          k--
        }
        k--
        //if sum < 0 make jth pointer should move right to increse sum
      } else if (sum < 0) {
        j++
        //if sum > 0 make jth pointer should move left to decrease sum
      } else {
        k--
      }
    }
    //this will handle A[i] with simillar value
    while (A[i] === A[i + 1]) {
      i++
    }
  }
  return reusult
}
```

### 補充

- 注意使用的 array 方法是會產生新的 array ，還是會改到原本的 array

  | 會改到原本的 array 的 method:  
  push()、pop()、shift()、sort()、splice()、reverse() 等

  | 會產生新的 array 的 method:
  join()、concat()、slice()、map()、filter()、reduce()、toString()、from()、of() 等

- .forEach 中斷問題
  ㄧ般在 for、while 等 loop 可以透過 `break` 來中斷(`continue` 跳過下一次 iteration)，但 `.forEach()` 如果用 `break` 會出現 `illegal breack statement` error，有兩種方法可以解決

1. 利用 try、catch

```js
try {
  var a = ["one", "two", "three"]
  a.forEach((item, index) => {
    if (item === "two") {
      throw "ending" //stop the try function
    } else {
      console.log(item)
    }
  })
} catch (e) {
  console.log(e)
  if (e === "ending") {
    console.log("結束")
  } else {
    console.log(e)
  }
}
```

2. 利用 `.some()` 或 `.every()` method

```js
//some method
const array = [1, 2, 3, 4, 5]
array.some(item => {
  if (item === 4) {
    return true //return true 的時候跳脫
  }
  console.log(item)
})
//1
//2
//3
```

```js
//every method
const array = [1, 2, 3, 4, 5]
array.find(item => {
  if (item > 4) {
    return false
  } else {
    console.log(item)
  }
})
```

### reference

(JavaScript Array 陣列操作方法大全 ( 含 ES6 ))[https://www.oxxostudio.tw/articles/201908/js-array.html]
(JS 中 arr.forEach()如何跳出迴圈)[https://www.itread01.com/content/1544746721.html]
