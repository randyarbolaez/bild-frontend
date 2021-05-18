import React from "react";
import styled from "styled-components";

import IndividualComment from "./IndividualComment";
import CreateComment from "./CreateComment";
import User from "./User";

const Container = styled.div`
  margin-top: 15px;
  height: 70vh;
  width: 80vw;
  display: flex;
  // background: black;
  align-items: center;
  overflow-y: auto;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-between;
  flex-grow: 1;
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
            {comments.map((comment) => (
              <IndividualComment key={comment.id} comment={comment} />
            ))}
            {/* {user && <CreateComment post={post} />} */}
          </Container>
        );
      }}
    </User>
  );
};

export default Comments;
