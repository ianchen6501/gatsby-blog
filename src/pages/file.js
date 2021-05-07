import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"

export default function file({data}) {
  return (
    <>
			<div>{data.allFile.edges[1].node.absolutePath}</div>
    </>
  )
}

export const query = graphql`
	query {
		allFile {
			edges {
				node {
					absolutePath
				}
			}
		}
	}
`