import { NextResponse } from "next/server";

const HASHNODE_API = "https://gql.hashnode.com/";

// Query to fetch posts by a user
const GET_USER_ARTICLES = `
  query GetUserArticles($host: String!) {
    publication(host: $host) {
      isTeam
      title
      posts(first: 10) {
        totalDocuments
        edges {
          node {
            id
            title
            brief
            slug
            coverImage {
              url
            }
            publishedAt
          }
        }
      }
    }
  }
`;

interface HashnodeEdge {
  node: {
    id: string;
    title: string;
    brief: string;
    slug: string;
    coverImage?: { url: string };
    publishedAt: string;
  };
}

export async function GET() {
  try {
    const host = "aiunderthehood.hashnode.dev"; // The user's hashnode hostname

    const response = await fetch(HASHNODE_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // process.env.HASHNODE_TOKEN is not strictly required for public posts, but available if they set it
        ...(process.env.HASHNODE_TOKEN && { Authorization: process.env.HASHNODE_TOKEN }),
      },
      body: JSON.stringify({
        query: GET_USER_ARTICLES,
        variables: { host },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("Hashnode API errors:", result.errors);
      return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
    }

    const posts = result.data?.publication?.posts?.edges?.map((edge: HashnodeEdge) => edge.node) || [];
    const totalBlogs = result.data?.publication?.posts?.totalDocuments || posts.length;

    return NextResponse.json({ posts, totalBlogs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Hashnode blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

