import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"
import { Link } from "gatsby"

const PostsContainer = styled.div `
  padding-top: 50px;
`

const PostTitle = styled.h4 `
  margin-right: 20px;
`

export default function Home({data}) {
  return (
    <Layout>
      <PostsContainer>
        {data.allMarkdownRemark.edges.map(({node}, index) => {
          return (
            <div key={index}>
              <Link to={node.fields.slug}><PostTitle>{node.frontmatter.title}</PostTitle></Link>
              <h5>{node.frontmatter.date}</h5>
              <p>{node.excerpt}</p>
            </div>
          )
        })}
      </PostsContainer>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {order: ASC, fields: frontmatter___date}) {
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
