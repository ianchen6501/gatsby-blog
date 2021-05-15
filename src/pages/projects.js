import { graphql } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"
import dinfongImg from "../image/dinfong2.png"
import hittheroadImg from "../image/hittheroad3.png"

const Wrapper = styled.div `
  position: relative;
  height: 100%;
  width: 80%;
  float: right;
`

const Title = styled.h1 `
  margin: 30px 30px 30px 0px;
  font-size: 50px;
`

const SubTitle = styled.span `
  margin-left: 30px;
  font-size: 30px;
`

const ProjectsContainer = styled.div `
  position: relative;
  display: flex;
  padding: 30px 0px;
`

const ProjectContainer = styled.div `
  position: relative;
  margin-right: 30px;
  border: 1px solid black;
  cursor: pointer;
`

const ProjectImg = styled.div `
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  background: url(${props => props.$url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  transition: 1s filter;


  &:hover {
    filter: brightness(70%);
    -webkit-filter: brightness(70%);
  }

  &:hover::before {
    content: "Go";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 50px;
    font-weight: 900;
    color: white;
    z-index: 2;
  }
`

const ProjectContent = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0px;
`


export default function Home({data}) {

  return (
    <Layout>
      <Wrapper>
        <Title>
          Projects
          <SubTitle>近期的作品</SubTitle>
        </Title>
        <ProjectsContainer>
          <Link href={"https://df-design.com.tw"}>
            <ProjectContainer>
              <ProjectImg $url={dinfongImg}></ ProjectImg>
              <ProjectContent>企業形象網站 / 鼎峰設計</ProjectContent>
            </ProjectContainer>
          </Link>
          <Link href={"https://yunanpan.github.io/final-project/#/"}>
            <ProjectContainer>
              <ProjectImg $url={hittheroadImg}></ ProjectImg>
              <ProjectContent>旅遊規劃網站 / HITTHEROAD</ProjectContent>
            </ProjectContainer>
          </Link>
        </ProjectsContainer>
      </Wrapper>
    </Layout>
  )
}

