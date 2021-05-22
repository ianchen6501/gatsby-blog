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
            <h3 className={indexStyles.title}>獨立設計人</h3>
            <p className={indexStyles.paragraph}>Web design 網頁設計規劃<br/>Architecture 建築設計規劃<br/>Interior Design 室內設計規劃<br/></p>
          </div>
          <div className={indexStyles.devideLine} />
          {/* <BackgroundImg src={imgsArray[imgIndex]}></BackgroundImg> */}
          {/* TODO: 改為 js 產出 */}
          <div className="animationContainer">
              <div className="rec1"></div>
              <div className="rec2"></div>
              <div className="rec3"></div>
              <div className="rec4"></div>
              <div className="rec5"></div>
              <div className="rec6"></div>
              <div className="rec7"></div>
              <div className="rec8"></div>
              <div className="rec9"></div>
              <div className="rec10"></div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

