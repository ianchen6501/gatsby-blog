---
title: "[實作]JSONP 實作"
date: "2021-05-03"
---

### 為什麼需要 JSONP

要談 JSONP ，首要先了解假如今天我們用 AJAX、Fetch、XMLHTTPRequest 等方式對一個非同源的對象發出請求時，會建立一個跨來源請求(CORS)，而瀏覽器就會根據同源政策(same-origin Policy)，假若請求的對象非屬同源對象(相同 protocol / domain / port)，就會檢查回傳的內容是否有 CORS Header，如果沒有的話我們就無法檢視回傳的內容。
為了解決同源政策造成的傳輸問題，JSONP 就是因應而生的一個解決方式。

### JSONP 原理

如同前面所說，並不是每一種請求都會受到同源政策的限制，例如在瀏覽網頁的時候常會需要載入許多靜態檔案(如 img / css...)，這些透過 `<script src="...">` 發出請求的方式，就不會受到同源政策的限制，那我們就可以利用這個特性來傳輸資料。

### 實作 JSONP (利用 script tag)

首先我們利用動態產生的 script src 來發出一個跨域請求，同時帶上一個 callback query string，這個 callback function 必須在前端先建立好。

```js
  function getUser() { //動態產生 script header
    const script = document.createElement("script")
    script.src = "http://localhost:5003?callback=setUser" //請求對象
    document.body.appendChild(script)
  }
  function setUser(response) { //callback function
    ...
  }
```

JSONP 另外需要遠端伺服器搭配回傳一段 JSON 格式的資料，資料內容必須依據 query string 的內容來包裝，才可以在前端觸發 callback function。

```js
app.get("/", (req, res) => {
  const callback = req.query.callback
  const userData = {
    name: "小明",
  }
  res.send(`${callback}(${JSON.stringify(userData)})`) //這邊要用 JSON 傳送
  res.end()
})
```

這樣我們就簡易的建立了個 JSONP 的實例。

### reference

[跨來源資源共用（CORS）](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)
[CORS 完全手冊（二）：如何解決 CORS 問題？](https://blog.huli.tw/2021/02/19/cors-guide-2/)
