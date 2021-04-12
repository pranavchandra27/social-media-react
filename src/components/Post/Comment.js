import React from "react";
import {
  CardContent,
  Paper,
  InputBase,
  IconButton,
  Box,
  Avatar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Send } from "@material-ui/icons";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../graphQL/typeDefs";

const useStyles = makeStyles((theme) => ({
  commentAvatar: {
    width: 30,
    height: 30,
  },
  commentBox: {
    marginBottom: theme.spacing(4),
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
}));

const Comment = ({ comments, postId }) => {
  const classes = useStyles();
  const [comment, setComment] = React.useState("");
  const [elevation, setElevation] = React.useState(0);

  const [createComment] = useMutation(ADD_COMMENT, {
    variables: { postId, body: comment },
    update() {
      setComment("");
    },
  });

  return (
    <CardContent>
      <Paper
        elevation={elevation}
        className={classes.commentBox}
        onFocus={() => setElevation(4)}
        onBlur={() => setElevation(0)}
      >
        <InputBase
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write something..."
          className={classes.input}
        />
        <IconButton
          disabled={comment.trim() === ""}
          onClick={createComment}
          color="primary"
          size="small"
          className={classes.iconButton}
        >
          <Send />
        </IconButton>
      </Paper>
      <Box padding={2}>
        {comments.length
          ? comments.map((comment) => (
              <Box key={comment.id} display="flex" alignItems="center">
                <Avatar aria-label="" className={classes.commentAvatar}>
                  {comment.username.charAt(0)}
                </Avatar>
                <Box marginLeft={2}>
                  <Typography color="textPrimary" variant="body2">
                    {comment.body}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {moment(comment.createdAt).fromNow(true)} ago
                  </Typography>
                </Box>
              </Box>
            ))
          : ""}
      </Box>
    </CardContent>
  );
};

export default Comment;
