import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Header = styled.div `
	display: flex;
	justify-content: space-between;
  width: 100%;
	border-bottom: solid 0.5px black;
  padding: 10px 30px;
`

const Layout = styled.div `
	position: relative;
	width: 600px;
	min-height: 100%;
	margin: 0 auto;
`

export default function layout({children}) {
	return (
		<>
			<Header>
				<h3>IAN'S BLOG</h3>
				<Link to="/"><h3>HOME</h3></Link>
			</Header>
			<Layout>

				{children}
			</Layout>
		</>
	)
}