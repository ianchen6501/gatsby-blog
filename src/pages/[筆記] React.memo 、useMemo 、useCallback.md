---
title: "[筆記] React.memo 、useMemo 、useCallback"
date: "2020-5-1"
---

### re-render 時機及效能優化

1. state 改變
2. prop 改變

> 在 React lifecycle 裡面，如果因為事件造成 state / prop 改變，React 會根據更新的狀態來重新渲染畫面。但其實並非在每次需要重新渲染的時候都重新運算某些前後狀態相同的 component，React 提供了不同工具來協助判斷是否需要 re-render，來達到效能優化的目的。

### React.memo

- 使用方式
  `React.memo(myComponent)`
- 作用
  React.memo 會根據傳入的物件重新封裝並創建一個新物件。並且這個新的物件在每次 re-render 前會依據該物件傳入的 prop 有沒有更新來判斷是否需要 re-render(如範例一)。  
  另外要注意因為 React.memo 是利用 shallowly comparison 的方式，如果 prop 的值屬於 primitive 型態會比較其 value ，但如果是 Object(immutable)，則會比較其記憶體位置，而因為在每一次 re-render 時 component 都會指向不同的記憶體位置，造成 React.memo 失效。  
  解決的方式是透過傳入 React.memo 的第二個參數(一個判斷新舊 props 是否會渲染相同結果的函式)，如果結果相同 `return true`，反之 `return false`(如範例二)。
- 範例一
下面的範例有兩個物件，一個會在每次 re-render 時累進渲染次數(useRef 會在該頁面 reload 前記憶最新的值)。
另外一個物件則被 React.memo 包住，因為傳入的 prop 固定是 string 且沒有變動，所以渲染次數就會固定不變。
<iframe height="265" style="width: 100%;" scrolling="no" title="React.memo demo" src="https://codepen.io/ianchen6501/embed/vYyxzzr?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ianchen6501/pen/vYyxzzr'>React.memo demo</a> by ianchen6501
  (<a href='https://codepen.io/ianchen6501'>@ianchen6501</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>
- 範例二
這邊我們把傳入的 prop 改為一個 Object，如同上面所說為了告訴 React 是否需要 re-render，我們需要傳入第二個參數來判斷新舊 prop 是否會造成渲染結果改變。
<iframe height="265" style="width: 100%;" scrolling="no" title="React.memo demo2" src="https://codepen.io/ianchen6501/embed/abBJQgO?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ianchen6501/pen/abBJQgO'>React.memo demo2</a> by ianchen6501
  (<a href='https://codepen.io/ianchen6501'>@ianchen6501</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### useMemo

- 使用方式
  `const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b])`
  第一個參數傳入要記住的運算函式，第二個參數傳入 dependency array。
- 作用
  useMemo 的應用場域在於元件內如果有一個複雜的運算函式，為了避免在每一次 re-render 都重新運算，可以用 useMemo 來記住這個函式的運算結果，並在下一次 re-render 階段透過判斷 dependency array 是否有變化來判斷是否重新運算函式，如果 dependency array 不變就回傳上一次的運算結果。
- 範例
類似上面的範例，這次改用 useMemo 記憶 complexCalulation 的回傳結果，dependency array 傳入空陣列，所以在每一次 re-render 時因為 dependency array 未改變，會傳入原本的運算結果。
<iframe height="265" style="width: 100%;" scrolling="no" title="React.useMemo demo" src="https://codepen.io/ianchen6501/embed/eYBWWNB?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ianchen6501/pen/eYBWWNB'>React.useMemo demo</a> by ianchen6501
  (<a href='https://codepen.io/ianchen6501'>@ianchen6501</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### useCallback

使用方式:
將要記住記憶體位置的 function 用 `useCallback` 包住並傳入 dependency array 當作第二個參數。

```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b)
}, [a, b])
```

- 作用:
  因為每一次 re-render 時 function 都會分配到一個新的記憶體位址，useCallback
  可以記憶住該 function 的記憶體位置，避免每一次子元件 re-render 時都因為 function 的記憶體位置改變導致子元件重新渲染。
- 使用時機:
  通常都是在 function 被當作 prop 傳入子元件時，為了避免耗時的重新渲染，所以在父元件就會用 useCallback 來包住 function 並且傳入 dependency array 來判斷是否重新創建 function，並且同時搭配 React.memo 包住子元件，來讓在 function 不變時，子元件可以避免重新渲染。
- 範例:
將 React.memo 及 useMemo 搭配使用，讓子元件避免 re-render。
<iframe height="265" style="width: 100%;" scrolling="no" title="React.useCallback demo" src="https://codepen.io/ianchen6501/embed/RwoVVdX?height=265&theme-id=light&default-tab=js,result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/ianchen6501/pen/RwoVVdX'>React.useCallback demo</a> by ianchen6501
  (<a href='https://codepen.io/ianchen6501'>@ianchen6501</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### 小結

| 函式              | 對象                | 作用                                                                   |
| ----------------- | ------------------- | ---------------------------------------------------------------------- |
| React.memo        | React component     | 為了避免 prop 未改變，卻造成無意義的重新渲染時。                       |
| React.useMemo     | function 的運算結果 | 透過保存耗時的運算結果，在 dependency array 未改變時引用前次的運算結果 |
| React.useCallback | function            | 透過記憶 function 的記憶體位置，來避免子物件的重新渲染                 |

### 參考資料

[React 性能優化那件大事，使用 memo、useCallback、useMemo](https://medium.com/手寫筆記/react-optimize-performance-using-memo-usecallback-usememo-a76b6b272df3)
