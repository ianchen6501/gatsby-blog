import React from "react"
import Layout from "../components/layout"
import * as indexStyles from "../styles/index.module.css"
import "../styles/index-animation.scss"

export default function Home() {
  return (
    <Layout>
      <div className={indexStyles.Wrapper}>
        <div className={indexStyles.introContainer}>
          <div className={indexStyles.introText}>
            <h3 className={indexStyles.title}>Hi, it's Ian.</h3>
            <p className={indexStyles.paragraph}>
              An Web designer / Architect / Interior Designer
            </p>
            <h3 className={indexStyles.title}>Related Links</h3>
            <div className={indexStyles.urls}>
              <a target="popup" href="https://github.com/ianchen6501">
                <span>github</span>
              </a>
              <a target="popup" href="https://codepen.io/ianchen6501">
                <span>codepen</span>
              </a>
            </div>
            <div className="animationContainer">
              {new Array(8).fill(0).map((item, index) => {
                return <div key={index} className={`rec${index + 1}`}></div>
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
