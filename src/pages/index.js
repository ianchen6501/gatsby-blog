import React from 'react'
// import styled from "styled-components"
// import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import * as indexStyles from "../styles/index.module.css"

// const IntroContainer = styled.div `
//   position: relative;
//   display: flex;
//   padding-top: 30px;
//   height: 100%;
//   width: 80%;
//   float: right;
//   z-index: -1;
// `

// const IntroText = styled.div `
//   width: 40%;
// `

// const Title = styled.h3 `
//   margin-bottom: 30px;
//   font-weight: 800;
// `

// const Paragraph = styled.p `
//   line-height: 40px;
// `

// const DivideLine = styled.div `
//   height: 80%;
//   width: 2px;
//   margin: 0px 50px;
//   background-color: black;
// `

// const Animation = styled.div `
//   height: 80%;
//   width: calc(60% - 102px);
//   background-color: black;
// `

export default function Home() {
  // const [slide, setSlide] = useState(true)
  // const [imgIndex, setImageIndex] = useState(0)
  // const imgsArray = [img1, img2, img3]

  //輪播
  // useEffect(() => {
  //   function handleSetImageIndex() {
  //     console.log("act")
  //     setImageIndex(imgIndex+1 === imgsArray.length ?0 : imgIndex + 1)
  //   }
  //   function startSlide() {
  //     setTimeout(handleSetImageIndex, 3000)
  //   }
  //   function stopSlide() {
  //     clearTimeout(startSlide)
  //   }
  //   startSlide()
  //   return () => {
  //     stopSlide()
  //   }
  // }, [imgIndex])


  return (
    <Layout>
      <div className={indexStyles.introContainer}>
        <div className={indexStyles.IntroText}>
          <h3 className={indexStyles.title}>獨立設計人</h3>
          <p className={indexStyles.paragraph}>Web design 網頁設計規劃<br/>Architecture 建築設計規劃<br/>Interior Design 室內設計規劃<br/></p>
        </div>
        <div className={indexStyles.devideLine} />
        {/* <BackgroundImg src={imgsArray[imgIndex]}></BackgroundImg> */}
        <div className={indexStyles.animation}></div>
      </div>
    </Layout>
  )
}

