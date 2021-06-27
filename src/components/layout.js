import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import styled from "styled-components";
import "../styles/layout.scss"
import { WaveLoading } from 'react-loadingg';

const SideBar = styled.div`
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

export default function Layout({children}) {
	const [showSidebar, setShowSidebar] = useState({1: false, 2:false})
	const [time, setTime] = useState(null)

	// Clock
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

	// sidebar
	function handleSidebarOnMouseOver(index, state) {
		const newState = Object.assign(showSidebar)
		newState[index] = state
		setShowSidebar(newState)
	}

	if(!time) {
		return <WaveLoading color="black"/>
	}

	if(time) {
		return (
			<div className="Wrapper">
				{/* header */}
				<div className="Header">
					<Link to="/"><span className="HeaderTitle">IAN'S BLOG</span></Link>
					<span className="Clock">{time}</span>
				</div>
				{/* sidebar */}
				<SideBar onMouseOver={() => handleSidebarOnMouseOver(1, true)} onMouseLeave={() => handleSidebarOnMouseOver(1, false)}>
					{showSidebar[1] && (
						<><Link to="/projects"><h5 className="SidebarLink">Projects</h5></Link></>
					)}
				</SideBar>
				<SideBar onMouseOver={() => handleSidebarOnMouseOver(2, true)} onMouseLeave={() => handleSidebarOnMouseOver(2, false)}>
					{showSidebar[2] && (
						<><Link to="/blog-list"><h5 className="SidebarLink">Blog</h5></Link></>
					)}
				</SideBar>
				{/* container */}
				{/* {(path === "/" || path === "/blogs" || path === "/projects") ? 
					<div className="Container">{children}</div> : <div className="BlogContainer">{children}</div>
				} */}
				{children}
				{/* footer */}
				<footer className="footer">
					<marquee className="Marquee" direction="left" height="30" scrollamount="5">勤洗手，多漱口。口罩戴好，我們一起守護台灣。</marquee>
				</footer>
			</div>
		)
	}
}