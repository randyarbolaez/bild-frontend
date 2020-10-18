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

const Input = styled.input`
  font-size: 0.9vmax;
  border: none;
  width: 20vmax;
  height: 2vmax;
  font-family: "Montserrat", sans-serif;
  outline: none;

  border-bottom: 0.4vw solid #fe5f55;
  /* border-bottom-left-radius: 25px; */

  ::placeholder {
    font-family: "Montserrat", sans-serif;
    text-align: center;
    font-size: 1vmax;
  }
`;

const InputButton = styled.input`
  color: #fe5f55;
  font-size: 0.9vmax;
  width: 10vmax;
  height: 2vmax;
  border: none;
  background: none;
  outline: none;
  transition: 0.8s;
  border-bottom: 0.4vw solid #bcb8b1;
  border-bottom-left-radius: 25px;
  :disabled {
    color: #d3d3d3;
  }
  :hover {
    font-size: 1.1vmax;
    border-bottom: 0.4vw solid #fe5f55;
    transition: 0.5s;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 25px;
    :disabled {
      font-size: 0.9vmax;
      border-bottom: 0.4vw solid #bcb8b1;
      border-bottom-left-radius: 0px;
      border-bottom-right-radius: 0px;
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
            <Input
              aria-multiline
              maxLength={255}
              placeholder="Comment"
              type="text"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <InputButton
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
