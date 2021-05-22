import React, { useEffect, useState } from "react"
import { Link } from "gatsby"
import { useLocation } from "@reach/router"
import "../styles/layout.scss"

export default function Layout({children}) {
	const path = useLocation().pathname
	console.log(path)
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
		<div className="Wrapper">
			{/* header */}
			<div className="Header">
				<Link to="/"><span className="HeaderTitle">IAN'S BLOG</span></Link>
				<span className="Clock">{time}</span>
			</div>
			{/* sidebar */}
			<div className="SideBar" onMouseOver={() => handleSidebarOnMouseOver(1, true)} onMouseLeave={() => handleSidebarOnMouseOver(1, false)}>
				{showSidebar[1] && (
					<><Link to="/projects"><h5 className="SidebarLink">Projects</h5></Link></>
				)}
			</div>
			<div className="SideBar" onMouseOver={() => handleSidebarOnMouseOver(2, true)} onMouseLeave={() => handleSidebarOnMouseOver(2, false)}>
				{showSidebar[2] && (
					<><Link to="/blogs"><h5 className="SidebarLink">Blog</h5></Link></>
				)}
			</div>
			{/* container */}
			{/* {(path === "/" || path === "/blogs" || path === "/projects") ? 
				<div className="Container">{children}</div> : <div className="BlogContainer">{children}</div>
			} */}
			{children}
			{/* footer */}
			<footer className="Footer">
				<marquee className="Marquee" direction="left" height="30" scrollamount="5">勤洗手，多漱口。口罩戴好，我們一起守護台灣。</marquee>
			</footer>
		</div>
	)
}