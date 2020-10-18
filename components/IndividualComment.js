import React from "react";
import styled from "styled-components";

import DeleteComment from "./DeleteComment";
import User from "./User";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50vw;
  align-items: center;
  background: #f0efeb;
  border-left: 0.4vw solid #fe5f55;
  border-right: 0.4vw solid #fe5f55;
  margin: 5px 0;
`;

const UserInformationWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #fe5f55;

  border-top: 0.4vw solid #f0efeb;
  border-bottom: 0.4vw solid #f0efeb;
  width: 7vw;
  text-align: center;
`;

let UserName = styled.p`
  margin-left: 5px;
  font-size: 0.8vmax;
  width: 7vw;
`;

let Content = styled.p`
  font-size: 1vmax;
  margin: 0 2vw;
`;

let TimeContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: #fe5f55;
  border-top: 0.4vw solid #f0efeb;
  border-bottom: 0.4vw solid #f0efeb;
`;

let Time = styled.p`
  font-size: 0.8vmax;
  text-align: center;
  width: 7vw;
`;

const IndividualComment = ({ comment }) => {
  let user = null;

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          return null;
        } else {
          user = data.user;
        }
        return (
          <div style={{ display: "flex" }}>
            <Container>
              <UserInformationWrapper>
                <img
                  style={{
                    width: "2vmax",
                    borderRadius: "50%",
                    height: "2vmax",
                    border: "2px solid #fe5f55",
                  }}
                  src={comment.user.profile.profilePicture}
                />
                <UserName>{comment.user.name}</UserName>
              </UserInformationWrapper>
              <Content>{comment.content}</Content>
              <TimeContainer>
                <Time>
                  {`${
                    months[new Date(comment.createdAt).getMonth()]
                  } ${new Date(comment.createdAt).getDate()}, ${new Date(
                    comment.createdAt
                  ).getFullYear()}`}
                </Time>
              </TimeContainer>
            </Container>
            {(user && user.id) == comment.user.id && (
              <DeleteComment commentId={comment.id} />
            )}
          </div>
        );
      }}
    </User>
  );
};

export default IndividualComment;
