import React from "react";
import { Typography, Box } from "@material-ui/core";
import PostCard from "./PostCard";

const Posts = ({ error, posts }) => {
  return error ? (
    <p>{error.message}</p>
  ) : posts.length ? (
    posts.map((post) => <PostCard key={post.id} post={post} />)
  ) : (
    <Box textAlign="center">
      <Typography variant="h6">No Posts</Typography>
    </Box>
  );
};

export default Posts;
