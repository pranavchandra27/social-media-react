import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
} from "@material-ui/core";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import CommentIcon from "@material-ui/icons/CommentOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { motion } from "framer-motion";

import Menu from "../Menu";
import { useMutation } from "@apollo/client";
import { DELETE_POST, GET_POSTS } from "../../graphQL/typeDefs";
import AlertDialog from "../AlertDialog";
import Comment from "./Comment";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: 20,
  },

  commentIcon: {
    marginLeft: "auto",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function PostCard({ post }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postId: post.id },
    update(proxy) {
      setConfirmDelete(true);
      let posts = proxy.readQuery({
        query: GET_POSTS,
      });
      const data = { getPosts: [] };
      data.getPosts = posts.getPosts.filter((p) => p.id !== post.id);
      proxy.writeQuery({ query: GET_POSTS, data });
    },
  });

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const menuList = [
    { item: "Edit", cb: () => {} },
    { item: "Delete", cb: () => setConfirmDelete(true) },
  ];

  return (
    <>
      <Menu handleClose={closeMenu} anchorEl={anchorEl} menuList={menuList} />
      {confirmDelete && (
        <AlertDialog
          title={`Confirm Delete Post?`}
          desc="After clicking delete button this post will be permanently deleted"
          isOpen={confirmDelete}
          setOpen={setConfirmDelete}
          btnTitle="Delete"
          onConfirm={deletePost}
        />
      )}
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              aria-label={post.username}
              title={post.username}
              className={classes.avatar}
            >
              {post.username.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton
              aria-label="more-menu"
              aria-haspopup="true"
              onClick={openMenu}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.username}
          subheader={`${moment(post.createdAt).fromNow(true)} ago`}
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <motion.div whileTap={{ scale: 1.1 }}>
            <IconButton aria-label="like">
              <FavoriteIcon />
            </IconButton>
          </motion.div>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <motion.div
            whileTap={{ scale: 1.1 }}
            className={clsx(classes.commentIcon)}
          >
            <IconButton
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="comments"
            >
              <CommentIcon />
            </IconButton>
          </motion.div>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comment comments={post.comments} postId={post.id} />
        </Collapse>
      </Card>
    </>
  );
}
