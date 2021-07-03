import React from 'react'
import Link from 'gatsby-link'
import styled from "styled-components"
import Layout from "../components/layout"

const Wrapper = styled.div `
  position: relative;
  height: calc(100% - 30px);
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
`

const PostContainer = styled.div `
  display: flex;
  flex-direction: column;
`

const PostTitle = styled.h4 `
  margin-right: 20px;
`

const P =  styled.p `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const PostDate = styled.h5 `
  float: right;
  color: gray;
`

const PaginatorContainer = styled.div `
  width: 100%;
  position: absolute;
  bottom: 0px;
  text-align: center;
`

const PaginatorLink = styled.div `
  display: inline-block;
  font-size: 20px;
  
  ${prop => prop.$disalbe && `color: #aaaaaa`}
`


// pagination nav
const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}><PaginatorLink $disalbe={false}>{props.text}</PaginatorLink></Link>
  } else {
    return <PaginatorLink $disalbe={true}>{props.text}</PaginatorLink>
  }
}

const blogsPage = ({ pageContext }) => {
  const { group, index, first, last } = pageContext
  const previousUrl = index - 1 === 1 ? '/blog-list' : (index - 1).toString()
  const nextUrl = (index + 1).toString()

  return (
    <Layout>
      <Wrapper>
        {group.map(({ node, index }) => (
          <PostContainer key={node.fields.slug}>
            <div>
              <Link to={node.fields.slug}><PostTitle>{node.frontmatter.title}</PostTitle></Link>
              <PostDate>{node.frontmatter.date}</PostDate>
            </div>
            <P>{node.excerpt}</P>
          </PostContainer>
        ))}
        <PaginatorContainer>
          <NavLink test={first} url={previousUrl} text="PREV" />
          <NavLink test={last} url={nextUrl} text="NEXT" />
        </PaginatorContainer>
      </Wrapper>
    </Layout>
  )
}
export default blogsPage