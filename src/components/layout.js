import React, { useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.div `
`

const Header = styled.div `
	display: flex;
  width: 100%;
	border-bottom: solid 0.5px black;
  padding: 10px 30px;
`

const SideBar = styled.div `
	position: fixed;
	display: flex;
	flex-direction: column;
	top: 50%;
	padding: 30px 20px;
	background-color: #E9A368;
`

const Container = styled.div `
	position: relative;
	width: 600px;
	height: 100%;
	min-height: 100%;
	margin: 0 auto;
`

export default function layout({children}) {

	return (
		<Wrapper>
			<Header>
				<Link to="/"><h3>IAN'S BLOG</h3></Link>
			</Header>
			<SideBar>
				<h5>Projects</h5>
				<h5>Blog</h5>
			</SideBar>
			<Container>
				{children}
			</Container>
		</Wrapper>
	)
}