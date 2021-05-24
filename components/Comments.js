import React from "react";
import styled from "styled-components";

import IndividualComment from "./IndividualComment";
import User from "./User";

const Container = styled.div`
  margin-top: 15px;
  height: 70vh;
  width: 80vw;
  flex-direction: column;
  overflow-y: auto;
`;

const NoComments = styled.h1`
  font-family: "Montserrat", sans-serif;
  text-align: center;
  font-size: 2em;
  color: #3fa7d6;
`;

const Comments = ({ comments, post }) => {
  let user = null;
  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          null;
        } else {
          user = data.user;
        }
        return (
          <Container>
            {comments.length == 0 ? (
              <NoComments>Nobody has commented, be the first!</NoComments>
            ) : (
              comments.map((comment) => (
                <IndividualComment key={comment.id} comment={comment} />
              ))
            )}
          </Container>
        );
      }}
    </User>
  );
};

export default Comments;
