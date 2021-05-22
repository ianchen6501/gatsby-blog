import React from 'react'
// import styled from "styled-components"
// import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as indexStyles from "../styles/index.module.css"

export default function Home() {

  return (
    <Layout>
      <div className={indexStyles.Wrapper}>
        <div className={indexStyles.introContainer}>
          <div className={indexStyles.IntroText}>
            <h3 className={indexStyles.title}>獨立設計人</h3>
            <p className={indexStyles.paragraph}>Web design 網頁設計規劃<br/>Architecture 建築設計規劃<br/>Interior Design 室內設計規劃<br/></p>
          </div>
          <div className={indexStyles.devideLine} />
          {/* <BackgroundImg src={imgsArray[imgIndex]}></BackgroundImg> */}
          <div className={indexStyles.animation}></div>
        </div>
      </div>

    </Layout>
  )
}

