import { graphql } from "gatsby"
import React from "react"
import Link from "gatsby-link"
import styled from "styled-components"
import Layout from "../components/layout"

const Wrapper = styled.div`
  position: relative;
  min-height: 100%;
  width: 80%;
  margin: 0 auto;
  padding-top: 100px;
  padding-bottom: 60px;
`

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: gainsboro;

  &:last-child {
    margin-bottom: 30px;
  }
`

const PostTitle = styled.h4`
  margin-right: 20px;
`

const P = styled.p`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
const PostDate = styled.h5`
  float: right;
  color: white;
`

const PaginatorContainer = styled.div`
  position: absolute;
  width: 100%;
  bottom: 30px;
  text-align: center;
`

const PaginatorLink = styled.div`
  display: inline-block;
  font-size: 20px;
  padding: 0 10px 0 10px;

  ${prop => prop.$disalbe && `color: #aaaaaa`}
`

const FilterContainer = styled.div``

const Filter = styled.span`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
  cursor: pointer;
`

const FilterLink = styled.a`
  color: black;
  &:active,
  &:hover,
  &:visited {
    color: black;
  }
`

// pagination nav
const NavLink = props => {
  if (!props.test) {
    return (
      <a href={props.url}>
        <PaginatorLink $disalbe={false}>{props.text}</PaginatorLink>
      </a>
    )
  } else {
    return <PaginatorLink $disalbe={true}>{props.text}</PaginatorLink>
  }
}

const blogsPage = ({ pageContext, location }) => {
  const { group, index, first, last, pageCount } = pageContext
  let pathName = location.pathname
  const pagesArray = []
  const filtersMap = {
    all: "全部",
    algorythm: "演算法",
    notes: "筆記",
    implementation: "實作",
    thinkings: "心得",
  }

  let pathNameArray = pathName.split("/")
  pathNameArray = pathNameArray.filter(element => {
    if (element !== "") {
      return element
    }
  })

  if (Number(pathNameArray[pathNameArray.length - 1])) {
    pathNameArray.pop()
    pathName = `/${pathNameArray.join("/")}`
  }

  let baseUrlArray = JSON.parse(JSON.stringify(pathNameArray))
  baseUrlArray.pop()
  const baseUrl = `/${baseUrlArray.join("/")}`

  console.log(baseUrl)
  console.log(pathName)
  const previousUrl =
    index - 1 === 1 ? `${pathName}` : `${pathName}/${index - 1}`
  const nextUrl = `${pathName}/${index + 1}`

  for (let i = 1; i <= pageCount; i++) {
    pagesArray.push(i)
  }

  return (
    <Layout>
      <Wrapper>
        <FilterContainer>
          {Object.keys(filtersMap).map(filter => (
            <Filter>
              <FilterLink href={`${baseUrl}/${filter}`}>
                {filtersMap[filter]}
              </FilterLink>
            </Filter>
          ))}
        </FilterContainer>
        {group.map(({ node }) => (
          <PostContainer key={node.fields.slug}>
            <div>
              <Link to={node.fields.slug}>
                <PostTitle>{node.frontmatter.title}</PostTitle>
              </Link>
              <PostDate>{node.frontmatter.date}</PostDate>
            </div>
            <P>{node.excerpt}</P>
          </PostContainer>
        ))}
        <PaginatorContainer>
          <NavLink test={first} url={previousUrl} text="PREV" />
          {pagesArray.map(pageNumber => {
            return (
              <NavLink
                test={pageNumber === index ? true : false}
                text={pageNumber.toString()}
                url={
                  pageNumber === 1 ? `${pathName}` : `${pathName}/${pageNumber}`
                }
              />
            )
          })}
          <NavLink test={last} url={nextUrl} text="NEXT" />
        </PaginatorContainer>
      </Wrapper>
    </Layout>
  )
}
export default blogsPage
