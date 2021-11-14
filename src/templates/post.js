import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"
import Link from "gatsby-link"

// const NavLink = props => {
//   if (!props.test) {
//     return <Link to={props.url}>{props.text}</Link>
//   } else {
//     return <span>{props.text}</span>
//   }
// }

const Container = styled.div`
  position: relative;
  display: block;
  width: 70%;
  border: solid 0px;
  margin: 0 auto;
  padding-top: 50px;
`

const Title = styled.h3`
  margin: 30px 0px;
`

const TopButton = styled.button`
  position: fixed;
  display: inline-block;
  width: 50px;
  height: 50px;
  right: 30px;
  bottom: 30px;
  border-radius: 50px;
  border: none;
  text-align: center;
  font-size: 10px;
  outline: none;

  &:active {
    border: none;
  }
`

export default function Post({ data }) {
  const post = data.markdownRemark
  const [show, setShow] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY > 500) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
  })

  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <Layout>
      <Container>
        <Title>{post.frontmatter.title}</Title>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
        {show && <TopButton onClick={() => goTop()}>Top</TopButton>}
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
      }
    }
  }
`
