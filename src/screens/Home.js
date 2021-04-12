import React, { useCallback, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Container,
  CssBaseline,
  Box,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography,
  Divider,
} from "@material-ui/core";
import { PostAddOutlined, SendOutlined } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { useData } from "../provider";
import Posts from "../components/Post/Posts";
import { ADD_POST, GET_POSTS } from "../graphQL/typeDefs";

const useStyles = makeStyles((theme) => ({
  post: {
    width: "100%",
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  iconButton: {
    padding: 10,
  },
  dividerVertical: {
    height: 28,
    margin: 4,
  },
  dividerHorizontal: {
    margin: theme.spacing(4, 0),
  },
}));

const Home = () => {
  const {
    state: { user },
  } = useData();
  const classes = useStyles();
  const [greeting, setGreeting] = useState("");
  const [value, setValue] = useState("");
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [createPost] = useMutation(ADD_POST, {
    variables: { body: value },
    update() {
      setValue("");
      refetch();
    },
  });

  const greet = useCallback(
    (time) => {
      time >= 22
        ? setGreeting(`🌜Good Night, ${user.firstName}`)
        : time >= 16
        ? setGreeting(`🌥 Good Evening, ${user.firstName}`)
        : time >= 12
        ? setGreeting(`☀ Good Afternoon, ${user.firstName}`)
        : time >= 4
        ? setGreeting(`🌤 Good Morning, ${user.firstName}`)
        : setGreeting("");
    },
    [user.firstName]
  );

  useEffect(() => {
    const time = new Date().getHours();
    greet(time);
  }, [greet]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box textAlign="center" marginY={2}>
          <Typography variant="h5" color="textSecondary">
            {greeting}
          </Typography>
        </Box>

        <Paper className={classes.post}>
          <IconButton className={classes.iconButton}>
            <PostAddOutlined />
          </IconButton>
          <InputBase
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className={classes.input}
            placeholder="What's on your mind"
          />
          <Divider className={classes.dividerVertical} orientation="vertical" />
          <IconButton
            disabled={value.trim() === ""}
            color="primary"
            className={classes.iconButton}
            aria-label="create post"
            onClick={createPost}
          >
            <SendOutlined />
          </IconButton>
        </Paper>

        <Divider
          className={classes.dividerHorizontal}
          orientation="horizontal"
        />

        {loading ? (
          ["1", "2"].map((i) => (
            <Paper elevation={1} key={i}>
              <Box padding={2} marginBottom={2}>
                <Box display="flex" alignItems="center">
                  <Skeleton variant="circle" width="40px" height="40px" />
                  <Box marginLeft={2}>
                    <Skeleton variant="text" width="150px" />
                    <Skeleton variant="text" width="100px" />
                  </Box>
                </Box>
                <Box marginTop={3}>
                  <Skeleton variant="text" width="100%" />
                  <Skeleton variant="text" width="80%" />
                </Box>
              </Box>
            </Paper>
          ))
        ) : (
          <Posts posts={data.getPosts} error={error} />
        )}
      </Container>
    </>
  );
};

export default Home;
