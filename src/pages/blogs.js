import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"

const Wrapper = styled.div `
  position: relative;
  height: calc(100% - 30px);
  width: 80%;
  margin: 0 auto;
  padding-top: 50px;
`

const PostsContainer = styled.div `
  padding-top: 50px;
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

export default function Home({data}) {
  return (
    <Layout>
      <Wrapper>
        <PostsContainer>
          {data.allMarkdownRemark.edges.map(({node}, index) => {
            return (
              <PostContainer key={index}>
                <div>
                  <Link to={node.fields.slug}><PostTitle>{node.frontmatter.title}</PostTitle></Link>
                  <PostDate>{node.frontmatter.date}</PostDate>
                </div>
                <P>{node.excerpt}</P>
              </PostContainer>
            )
          })}
        </PostsContainer>
      </Wrapper>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
