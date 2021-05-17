---
title: "[演算法-Add String]"
date: "2020-5-17"
---

### 題目

- 給兩個包含數字的 string ，回傳他們相加結果的 string。
  例如:

```js
input: "123", "45"
output: "168"
```

- 限制: 不可以把 string 轉換為 intiger

### 自己的解法

這題一開始只有想到或許可以使用位元運算，但具體實踐方法沒什麼頭緒，所以先去複習了 [位元運算子](位元運算子.md)，後來想到說既然可以透過拆解 string 為一個一個數字的方式，那透過不同數字的 charCode 應該可以拿到數值，用另一種方式取得 integer。

```js
const addStrings = (a, b) => {
  const length = a.length > b.length ? a.length : b.length
  let result = 0

  for (let i = 1; i <= length; i++) {
    const numA = a[a.length - i].charCodeAt()
      ? a[a.length - i].charCodeAt() - "0".charCodeAt()
      : 0
    const numB = b[b.length - i]
      ? b[b.length - i].charCodeAt() - "0".charCodeAt()
      : 0
    const numAdd = (numA + numB) * Math.pow(10, i - 1)
    result += numAdd
  }
  return result.toString()
}
```

但用這種方法會受到 max integer 的限制(-(2^53-1) < x < 2^53-1)。
例如輸入`1111111111111111111111111`、`1` 會得到 `1.1111111111111111e+24`

### 求助解答

這題偷看了解答，解答提供另一種思考方式，透過 pointer 及 carrier 來一次一次相加每一位數的，並且透過字串拼接的方式來組合成答案，因為 string 的最大長度理論上可以達到 2^53-1(約 9PB)，所以可以處理的數值比用 number 運算來的大多了。

```js
const addStrings = (a, b) => {
  let i = a.length - 1
  let j = b.length - 1
  let carry = 0
  let result = ""
  //針對每一個 digit 相加，並組合 string
  while (i >= 0 || j >= 0) {
    let sum = carry
    if (i >= 0) {
      var numA = a[i] - "0"
      sum += numA
      i--
    }
    if (j >= 0) {
      var numB = b[j] - "0"
      sum += numB
      j--
    }
    result += (sum % 10).toString()
    //更新 carry
    carry = parseInt(sum / 10)
  }
  //檢查是否有 leftover carry
  if (carry) {
    result += carry
  }
  return result.split("").reverse().join("")
}
addStrings("999", "1") //"1000"
```

### 心得

1. 還是有一些語法不太熟，如 reverse()、join() 這些 array method
2. 學到了 carrier 的技巧，可以帶一些要給下一次 loop 使用的參數。
3. 本題時間複雜度，O(n)。

### reference

[https://leetcode.com/problems/add-strings/](https://leetcode.com/problems/add-strings/)
