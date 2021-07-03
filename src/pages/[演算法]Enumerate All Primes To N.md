---
title: "[演算法]Enumerate All Primes To N"
date: "2020-07-03"
---

### 題目

給定一個 integer > 0，然後列舉所有的質數並用一個 array 回傳。
例如:

```js
input: 10,
output: [2,3,5,7]
```

### 自己的思路

首先先搞清楚質數的定義就是，除了 1 和 integer 本身外沒有其他的因數。
所以這題我是先把確認質數的 function 寫出來。

```js
function isPrime(integer) {
  let factor = [1]
  for (let i = 2; i <= integer; i++) {
    if (integer % i === 0) {
      factor.push(i)
    }
  }
  if (factor.length === 2) {
    return integer
  }
  return
}
```

然後再針對 input 的值做遍歷。

```js
let primes = []
for (let i = 2; i < n; i++) {
  if (isPrime(i)) {
    primes.push(i)
  }
}
return primes
```

完整的 code 如下

```js
const enumeratePrimes = n => {
  //1
  if (n === 1) return []
  //isPrime
  function isPrime(integer) {
    let factor = [1]
    for (let i = 2; i <= integer; i++) {
      if (integer % i === 0) {
        factor.push(i)
      }
    }
    if (factor.length === 2) {
      return integer
    }
    return
  }
  //traverse 1 to n
  let primes = []
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) {
      primes.push(i)
    }
  }
  return primes
}
```

因為我用了兩個 for loop 而且都是直接 interate n 次，所以時間複雜度應該是 O(n^2)

### 課程的思路

課程的解法反而是**反面列舉**，先把會是非質數的部分列出來並剔除以後，就知道哪些是質數了。
所以步驟如下:

1. 建立一個 length 為 n 的陣列，然後把值都設為 true，預設為都是質數，代表 0~n-1 都是質數
2. 因為我們都知道 0、1 兩個數非質數先剔除掉
3. 接下來遍歷 2~n-1 的數，找出他們的倍數，必定就會是非質數，等到剔除完就只剩質數了，再把質數 push 到 output array  
   如下圖，舉 n = 10 為例子，先把 2 的倍數刪掉(4、6、8、10)，緊接著是 3 的倍數(9)，剩下來的遍歷因為都不符合條件，就完成演算
   ![](https://i.imgur.com/s3dcOXn.png)
4. 剩下我們只需要回傳 output array 就是答案了

```js
const enumeratePrimes = n => {
  //n=1
  if (n <= 1) {
    return []
  }

  const output = []
  //Declare a Boolean Array for storing if a number is prime or not
  const isPrime = Array(n).fill(true)

  // Since 0 and 1 are not prime we declare them false explicitly
  isPrime[0] = false
  isPrime[1] = false
  //check all possible not prime number and mark them false
  for (let i = 0; i < n; i++) {
    // Only check if isPrime[i]==true
    if (isPrime[i]) {
      // Mark all the factor of (i) as Not Prime
      for (let j = i + i; j < n; j += i) {
        isPrime[j] = false
      }
      //Accumulating all the prime numbers in out ans list
      output.push(i)
    }
  }

  return output
}
```

### 心得

- 我覺得這題用反面列舉的方式，很突破我自己線性思考的方式，因為之前都習慣是找出題目要的，但其實只要剔除題目不要的就會是答案，所以下次做題前可以先評估正面或反面列舉的難易度再決定方法。
- 課程用的 array method 先把陣列用 boolean 填滿來代表 isPrime，可以建立一個決定是否演算的機制，可以學起來。

### reference

[Enumerate All Primes To N](https://backtobackswe.com/platform/content/enumerate-all-primes-to-n)
