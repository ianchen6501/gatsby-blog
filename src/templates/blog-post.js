import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import Layout from "../components/layout"

const Container = styled.div `
	position: relative;
	width: 70%;
	border: solid 0px;
	margin: 30px auto;
`

const Title = styled.h3 `
	margin-bottom: 30px;
`

const TopButton = styled.button `
	position: fixed;
	display: inline-block;
	width: 50px;
	height: 50px;
	right: 30px;
	bottom: 30px;
	border-radius: 50px;
	border: none;
	text-align: center;
	font-size:10px;
	outline: none;

	&:active {
		border: none;
	}
`


export default function Post({data}) {
	const post = data.markdownRemark
	const [show, setShow] = useState(false)

	useEffect(() => {
		window.onscroll = () => {
			console.log(window.scrollY)
			if(window.scrollY > 500) {
				setShow(true)
			} else {
				setShow(false)
			}
		}
	})

	function goTop() {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
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