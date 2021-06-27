const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const createPaginatedPages = require('gatsby-paginate')

exports.onCreateNode = ({ node }) => {
  console.log(`Node created of type "${node.internal.type}"`)
}

//create node for blog
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) { //create node for .md file 
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions: { createPage } }) => {
  return new Promise((resolve, reject) => {
    graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              date
              title
            }
            excerpt
          }
        }
      }
    }
    `).then(result => {
      console.log("[DEBUG: result.data.allMarkdownRemark.edges]", result.data.allMarkdownRemark.edges)
      createPaginatedPages({
        edges: result.data.allMarkdownRemark.edges,
        createPage: createPage,
        pageTemplate: 'src/templates/blogs_template.js',
        pageLength: 7, // This is optional and defaults to 10 if not used
        pathPrefix: 'blog-list', // This is optional and defaults to an empty string if not used
        context: {}, // This is optional and defaults to an empty object if not used
      })
      result.data.allMarkdownRemark.edges.map(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve('./src/templates/post.js'),
          context: {
            slug: node.fields.slug,
          },
        })
      })
      resolve()
    })
  })
}