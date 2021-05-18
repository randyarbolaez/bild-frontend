import React, { useState } from "react";
import styled from "styled-components";

import DeleteComment from "./DeleteComment";
import User from "./User";

const Container = styled.div`
  border-radius: 0.4vw;
  max-width: 20vw;
  min-width: 20vw;
  align-items: center;
  background: #27a888;
  margin: 5px 0;
  border: none;
  margin-top: 0;
  margin: 1.2vh 1.2vw;
  // margin-right: 1.2vw;
`;

const InformationWrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.2vw solid white;
`;

const UserInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-left: 0.2vw solid white;
  margin: 0 0.5vw;
`;

let UserName = styled.p`
  margin: 0 5px;
  color: #9dc5bb;
  font-size: 1.1vmax;
  max-width: 7vw;
  font-weight: 700;
`;

let Content = styled.p`
  font-size: 1vmax;
  margin: 0;
  color: #d3d3d3;
  overflow-wrap: break-word;
  max-width: 20vw;
  max-height: 100%;
  text-align: center;
`;

let TimeContainer = styled.div``;

let Time = styled.p`
  margin: 0;
  margin-top: -1.5vh;
  font-size: 0.8vmax;
  text-align: center;
  color: #566246;
`;

const IndividualComment = ({ comment }) => {
  const [userHoverOverComment, setUserHoverOverComment] = useState(false);
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
          console.log(comment.user);
        }
        return (
          <div
            onMouseEnter={() => setUserHoverOverComment(true)}
            onMouseLeave={() => setUserHoverOverComment(false)}
          >
            <Container>
              <InformationWrapper>
                <img
                  style={{
                    width: "2vmax",
                    borderRadius: "50%",
                    height: "2vmax",
                    border: "2px solid #fe5f55",
                    marginLeft: "0.5vw",
                  }}
                  src={comment.user.profile.profilePicture}
                  alt={comment.user.name}
                />
                <UserInformationContainer>
                  {!userHoverOverComment &&
                    (user && user.id) == comment.user.id && (
                      <>
                        <UserName>{comment.user.name}</UserName>
                        <TimeContainer>
                          <Time>
                            {`${
                              months[new Date(comment.createdAt).getMonth()]
                            } ${new Date(
                              comment.createdAt
                            ).getDate()}, ${new Date(
                              comment.createdAt
                            ).getFullYear()}`}
                          </Time>
                        </TimeContainer>
                      </>
                    )}
                  {userHoverOverComment &&
                    (user && user.id) == comment.user.id && (
                      <DeleteComment commentId={comment.id} />
                    )}
                </UserInformationContainer>
              </InformationWrapper>

              <Content>{comment.content}</Content>
            </Container>
          </div>
        );
      }}
    </User>
  );
};

export default IndividualComment;
