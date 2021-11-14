---
title: "[筆記]認識 this 和 call、apply、bind"
date: "2021-05-02"
category: "notes"
---

# 認識 this 及相關的 JavaScript method (call、apply、bind)

在 JavaScript 中 this 常會因不同情況下代表不同的值，同時也想了解 call、apply 和 bind 的使用方法，所以做這個筆記。

### 在物件導向時

在物件導向(OOP)的環境中，this 會指向該類別(class)本身。

```js
class flower {
  constructor(name) {
    this.name = name
  }
  callName() {
    console.log(this.name)
  }
}

var sun_flower = new flower("sun_flower")
sun_flower.callName() //"sun_flower"
```

### 用物件的方式呼叫

在 JavaScript 裡面 this 會因為 call 的方式不同會有不一樣的值，如果是用物件(object)的方式呼叫，會指向物件本身。

```js
var obj = {
  myTeam: "arsenal",
  callMyTeam: function () {
    console.log(this.myTeam)
  },
}
obj.callMyTeam() //"arsenal"
```

但要注意如果我們用函式的方法呼叫 this，會指向全域環境。

```js
var myTeam = "chelsea"
var obj = {
  myTeam: "arsenal",
  callMyTeam: function () {
    console.log(this.myTeam)
  },
}
const callMyTeam = obj.callMyTeam //注意這邊賦值了一個新的函式
callMyTeam() //"chelsea"
```

### 用函式的方法來 call this

在非物件或物件導向的情況下，如果我們用一般函式的方法來 call this，this 會指向全域環境，所以依據全域環境(runtime)會回傳不同的值。
假若是瀏覽器會回傳 `window`，Node.js 則會回傳`global`

```javascript=
function test() {
	function inner() {
		console.log(this)
	}
	inner()
}
test()
```

上面的情況是在非"嚴格模式"的狀況下，但假設我們今天在"嚴格模式"下執行函式 call this，this 的值會變成 undefined。

```javascript=
'use strict';
function test() {
	function inner() {
		console.log(this)
	}
	inner()
}
test() //undefined
```

### 箭頭函式(arrow function)

用 arrow function 跟在一般 function 裡面 call this 會有不一樣的行為(可以當作一個特例)，在 arrow function 裡面會回傳 this 原本建立作用域(scope)的賦值，沒有賦值就會回傳 undefined，而不是像一般 function 會回傳 runtime 環境或 undefined。

例如下面的範例，this 的 scope 是 obj 這個物件，所以 this.myTeam 就會回傳 obj 裡面的 MyTeam value。

```js
this.myTeam = "arsenal"

const obj = {
  callMyTeam: () => {
    console.log(this.myTeam)
  },
}

obj.callMyTeam() //"arsenal"
```

在拿另外一個例子來說，在 class 裡面的 scope 就是 class 本身。

```javascript=
class test {
  run() {
    console.log('run this:', this)
    setTimeout(() => {
      console.log(this)
    },180)
  }
}

const t = new test()
t.run() //run this: test {}, test{}
```

### this 在 DOM 監聽裡面的回傳值

在瀏覽器 DOM 物件中 call this 會回傳正在執行的物件。

```javascript=
document.querySelector('#obj').addEventListener('click', () => {
  consol.log(this) //'obj'
})
```

### 知道了 this 在各個情況下所代表的值後，可以在繼續了解如何運用不同的 JavaScript method 來操作 this 囉。

### 先來談談 call、apply

call 和 apply 其實很相像，參數我們可以傳入 this 和其他參數，會回傳一個函式運算的結果，我們先來看看兩個的語法，

1. call : `fun.call(thisArg, arg1, arg2, ...)`
2. apply : `fun.apply(thisArg, [argsArray])`

可以看到兩個傳入的第一個參數都是 this 的值，差別在於後面的參數一個是傳入以`,`分開的不同參數，另一個則是陣列。

我們先來看看如何用 call 或 apply 來指定 this 的值

```js
function stringnify() {
  return this.toString()
}

console.log(stringnify.call(1)) //"1"
```

如果要指定其他參數會變成如下列例子。

```javascript=
'use strict';
function test(a, b, c) {
  console.log(this)
	console.log(a ,b ,c)
}
test.call(123, 1, 2, 3) //回傳 123(this 的值) 1 2 3(其他參數)
test.apply(123, [1, 2, 3]) //回傳 123(this 的值) 1 2 3(其他參數)
```

### 接著再來看看 bind 的用法

function 可以用 bind 來綁定 this 的值，並且會建立一個新的函式，當該函式被呼叫的時候會取用 this 的值。bind 綁定後的函式就可以直接用ㄧ般 call function 的方式來使用。但注意的是之後 variable 的 this 值就不能再改變了。

我們先來看看 bind 的基本用法。

```js
globalThis.name = "kevin"

var obj = {
  name: "michael",
  getName: function () {
    console.log(this.name)
  },
}

obj.getName() //"michael","this 會指向 obj

var retrieveName = obj.getName
const boudToName = retrieveName.bind(obj)
retrieveName() //"kevin"，this 會指向全域環境
boudToName() //"michael","this 會指向 obj
```

### 在學過各種 this 代表的值及不同 method 之後，來做個小練習複習一下吧。

```javascript=
'use strict'

function log() {
  console.log(this);
}
//call, apply
var a = { a: 1, log: log };
var b = { a: 2, log: log };

log(); //嚴格模式 -> undefined
a.log(); //{a:1, log: log}
b.log.apply(a) //{a:1, log: log}
b.log.call(a) //{a:1, log: log}


//接著我們回顧一下 this 的不同 call 法會回傳什麼東西
const obj = {
  num: 1,
  test : function() {
    console.log(this)
  }
}


obj.test() // obj
const c = obj.test
c() //嚴格模式，undefined

//如果今天想要有一個函式可以綁定 obj 跟 obj.test ，我們可以用 bind()
const d = obj.test.bind(obj)
d() //obj

//但假如今天已經用 bind 綁定 this 的話，後面就算用 call 也無法更改了
d.call('123') //obj
```

###### tags: `week16` `物件導向` `OOP` `this`
