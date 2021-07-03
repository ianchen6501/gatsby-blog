---
title: "[演算法]Find Minimum Time Difference"
date: "2021-05-20"
---

### 題目

給定一個陣列裡面包含`"HH:MM"` 型式的 string，找出其中時間距離最短的兩個時間並回傳相隔的時間(以分鐘表示)。
input: ["00:03", "23:59", "12:03"]
output: 4

### 思路

一開始不太確定 string type 要怎麼計算時間差距，所以想到可否利用 Date() 來計算差距， Date 還很聰明的可以計算並回傳毫秒數。
一開始想利用 for loop 來對每個陣列 item 做計算，並利用 filter 來排除與 item 自身相同的值，這樣其實會讓演算法排除兩個同樣的時間的狀況導致我後來要另外寫一個 function 來考慮 edge case。

### 自己的解法

```js
const timeDifference = times => {
  function changeToDate(time) {
    const hour = parseInt(time.split(":")[0])
    const minute = parseInt(time.split(":")[1])
    return new Date(2021, 5, 18, hour, minute)
  }

  function changeToMinute(milisec) {
    return milisec / 60000
  }

  //找相同的
  let isSameTime = false
  function checkIsSametime(time) {
    let indices = []
    let idx = times.indexOf(time)
    while (idx !== -1) {
      indices.push(idx)
      idx = times.indexOf(time, idx + 1)
    }
    if (indices.length > 1) {
      isSameTime = true
    }
  }
  checkIsSametime(times[0])
  checkIsSametime(times[1])
  if (isSameTime) {
    return 0
  }

  //找不同的，取得差值
  let result = []
  times.forEach((time, index) => {
    const newArray = times.filter(item => item !== time)
    for (let i = 0; i < newArray.length; i++) {
      const timeA = changeToDate(time)
      const timeB = changeToDate(newArray[i])
      let distance = Math.abs(changeToMinute(timeA - timeB))
      //判斷是否時鐘反向距離比較短
      if (distance > (24 * 60) / 2) {
        distance = 24 * 60 - distance
      }
      if (result.length !== 0) {
        if (distance < result[0]) {
          result.pop()
          result.push(distance)
        }
      } else {
        result.push(distance)
      }
    }
  })
  return result
}
```

### 課程的解法

課程比較聰明，把時間換成時鐘面，並把一天內的每一分鐘分別由 1~1440 排序，並依序算出他們的間隔分鐘數。

```js
var timeDifference = function (times) {
  var min = 720 // max difference
  times.forEach((t, i) => {
    //換成分鐘數
    let [h, m] = t.split(":")
    times[i] = +h * 60 + +m
  })
  times.sort((a, b) => a - b) //昇冪排列
  for (let i = 1; i < times.length; i++) {
    //依序計算最小間隔
    let diff = times[i] - times[i - 1]
    diff = diff > 720 ? 1440 - diff : diff
    min = diff < min ? diff : min
  }
  let diff = times[times.length - 1] - times[0] //算最前和最後的時間間隔
  diff = diff > 720 ? 1440 - diff : diff
  min = diff < min ? diff : min
  return min
}
```

### 心得

- 學到了 sort() 的用法，除了可以直接排序陣列外(依轉換為字串後的 unicode 排序)，也可以傳入 function 決定排序方法。

```js
array.sort((a, b) => {
  a - b //昇冪排列，反過來變 b-a 就是降冪排列
})
```

- 一開始要先釐清輸入輸出的範圍，像我一開始解題就預設輸入的時間裡面不會有相同的值，就會產生錯的演算法。
