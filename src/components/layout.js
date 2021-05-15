import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"

const Wrapper = styled.div `
	position: relative;
	height: 100%;
`

const Header = styled.div `
	position: absolute;
	display: flex;
	justify-content: space-between;
	height: 50px;
  width: 100%;
  padding-bottom: 10px;	
	z-index: 2;
`

const Clock = styled.span `
	display: inline-block;
	height: 100%;
	line-height: 50px;
	margin-right: 30px;
	border-bottom: 2px solid black;
`

const HeaderTitle = styled.span `
	display: inline-block;
	height: 100%;
	line-height: 50px;
	margin-left: 80px;
	border-bottom: 2px solid black;
`

const SideBar = styled.div `
	position: fixed;
	display: flex;
	flex-direction: column;
	justify-content: center;
	height: 80px;
	width: 10px;
	border-right: 2px solid black;
	background-color: transparent;
	z-index: 1;
	transition: 1s width, 1s border-right, 1s background-color;

	&:hover {
		width: 130px;
		background-color: gray;
		border-right: none;
	}

	&:nth-child(2) {
		top: 100px;
	}
	
	&:nth-child(3) {
		top: 200px;
	}
`

const SidebarLink = styled.h5 `
	margin-left: 30px;
`

const Footer = styled.footer `
	position: relative;
	width: 80%;
	height: 30px;
	margin: 0 auto;
	border-top: 2px solid black;
`

const Container = styled.div `
	position: relative;
	height: calc(100% - 30px);
	width: 100%;
	padding-top: 50px;
`

const BlogContainer = styled.div `
	padding-top: 50px;
`

const Marquee = styled.marquee `
	height: 100%;
`

export default function Layout({children}) {
	const path = useLocation().pathname
	const [showSidebar, setShowSidebar] = useState({1: false, 2:false})
	const [time, setTime] = useState(null)

	useEffect(() => {
		setTimeout(() => {
			const date = new Date()
			const hour = date.getHours()
			const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
			const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds()
			const currentTime = `${hour}:${minutes}:${seconds}`
			setTime(currentTime)
		}, 1000)
	}, [time])

	function handleSidebarOnMouseOver(index, state) {
		const newState = Object.assign(showSidebar)
		newState[index] = state
		setShowSidebar(newState)
	}

	return (
		<Wrapper>
			<Header>
				<Link to="/"><HeaderTitle>IAN'S BLOG</HeaderTitle></Link>
				<Clock>{time}</Clock>
			</Header>
			<SideBar onMouseOver={() => handleSidebarOnMouseOver(1, true)} onMouseLeave={() => handleSidebarOnMouseOver(1, false)}>
				{showSidebar[1] && (
					<><Link to="/projects"><SidebarLink>Projects</SidebarLink></Link></>
				)}
			</SideBar>
			<SideBar onMouseOver={() => handleSidebarOnMouseOver(2, true)} onMouseLeave={() => handleSidebarOnMouseOver(2, false)}>
				{showSidebar[2] && (
					<><Link to="/blogs"><SidebarLink>Blog</SidebarLink></Link></>
				)}
			</SideBar>
			{(path === "/" || path === "/blogs" || path === "/projects") ? <Container>{children}</Container> : <BlogContainer>{children}</BlogContainer>}
			<Footer>
				<Marquee direction="left" height="30" scrollamount="5">勤洗手，多漱口。口罩戴好，我們一起守護台灣。</Marquee>
			</Footer>
		</Wrapper>
	)
}