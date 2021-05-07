import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import { ALL_POSTS_QUERY } from "./Posts";

const CREATE_COMMENT_MUTATION = gql`
  mutation CREATE_COMMENT_MUTATION($content: String!, $id: String!) {
    createComment(content: $content, postId: $id) {
      content
    }
  }
`;

const CommentInput = styled.input`
  font-size: 1vmax;
  border: none;
  width: 20vmax;
  height: 2vmax;
  outline: none;
  border-bottom: 0.4vw solid #fe5f55;
  ::placeholder {
    font-weight: 400;
    font-size: 1vmax;
  }
`;

const AddCommentButton = styled.input`
  color: #fe5f55;
  font-size: 1vmax;
  font-weight: 700;
  width: 10vmax;
  height: 2vmax;
  border: none;
  background: none;
  outline: none;
  border-bottom: 0.4vw solid #fe5f55;
  border-left: 0vw solid #fe5f55;
  transition: border 0.4s ease-in-out;
  :disabled {
    font-weight: 400;
    color: #d3d3d3;
    border-bottom: 0.4vw solid #bcb8b1;
  }
  :hover {
    border-left: 1.6vw solid #fe5f55;
    cursor: pointer;
    :disabled {
      font-size: 1vmax;
      cursor: default;
      border-left: none;
      border-color: #bcb8b1;
    }
  }
`;

const CreateComment = ({ post }) => {
  const [content, setContent] = useState("");

  return (
    <Mutation
      variables={{ id: post.id, content }}
      mutation={CREATE_COMMENT_MUTATION}
      refetchQueries={[{ query: ALL_POSTS_QUERY }]}
    >
      {(createComment, { loading, error }) => (
        <div>
          <form
            action="post"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await createComment();
                setContent("");
              } catch (error) {
                console.log("Error[CreateComment]: ", error);
              }
            }}
          >
            <CommentInput
              aria-multiline
              maxLength={140}
              placeholder="Comment under 140 characters"
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <AddCommentButton
              type="submit"
              value="Add Comment"
              disabled={!content}
            />
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default CreateComment;
