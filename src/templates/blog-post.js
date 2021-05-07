import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import Layout from "../components/layout"

const Title = styled.div`
	
`

export default function post({data}) {
	const post = data.markdownRemark

  return (
		<Layout>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
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