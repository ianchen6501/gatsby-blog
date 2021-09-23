import React from 'react'
import Layout from "../components/layout"
import * as indexStyles from "../styles/index.module.css"
import "../styles/index-animation.scss"



export default function Home() {
  return (
    <Layout>
      <div className={indexStyles.Wrapper}>
        <div className={indexStyles.introContainer}>
          <div className={indexStyles.introText}>
            <h3 className={indexStyles.title}>Ian_義明 獨立設計人</h3>
            <p className={indexStyles.paragraph}>Web design 網頁設計規劃<br/>Architecture 建築設計規劃<br/>Interior Design 室內設計規劃<br/></p>
            <h3 className={indexStyles.title}>相關連結</h3>
            <div className={indexStyles.urls}>
              <a target="popup" href="https://github.com/ianchen6501"><span>github</span></a>
              <a target="popup" href="https://codepen.io/ianchen6501"><span>codepen</span></a>
            </div>
          </div>
          <div className={indexStyles.devideLine} />
          {/* <BackgroundImg src={imgsArray[imgIndex]}></BackgroundImg> */}
          <div className="animationContainer">
            {new Array(8).fill(0).map((item, index) => {return <div key={index} className={`rec${index+1}`}></div>})}
          </div>
        </div>
      </div>
    </Layout>
  )
}

