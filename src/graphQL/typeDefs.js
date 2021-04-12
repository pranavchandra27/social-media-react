import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query GetPosts {
    getPosts {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
      likes {
        id
        username
        createdAt
      }
      likesCount
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($body: String!) {
    createPost(body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
      likes {
        id
        username
        createdAt
      }
      likesCount
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($postId: String!) {
    deletePost(postId: $postId)
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      commentsCount
      likes {
        id
        username
        createdAt
      }
      likesCount
    }
  }
`;
