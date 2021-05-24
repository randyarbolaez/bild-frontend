import React from "react";
import styled from "styled-components";
import Link from "next/link";

import DeleteComment from "./DeleteComment";
import User from "./User";

const ATag = styled.a`
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 5px 5px 10px #ddd;
  border-radius: 0.5vw;
  margin: 1.2vh 1.2vw;
`;

const Container = styled.div`
  margin: 1.1vh 0;
  margin-left: 1.2vw;
`;

const InformationWrapper = styled.div`
  display: flex;
`;

const ProfilePicture = styled.img`
  width: 2vmax;
  border-radius: 50%;
  height: 2vmax;
  border: 2px solid #fe5f55;
`;

const UserInformationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0.5vw;
`;

const Username = styled.p`
  margin: 0;
  margin-right: 5px;
  font-size: 1.01vmax;
  max-width: 7vw;
  font-weight: 700;
  color: #e98986;
  :hover {
    color: #fd2a25;
    cursor: pointer;
  }
`;

const Comment = styled.p`
  font-size: 1vmax;
  margin: 0;
  color: #d3d3d3;
  color: #a6a6a6;
  overflow-wrap: break-word;
  margin-left: 0.5vw;
`;

const DateTag = styled.p`
  margin: 0;
  font-size: 0.8vmax;
  text-align: center;
  color: #b3b3b3;
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
          console.log(comment.user);
        }
        return (
          <Wrapper>
            <Container>
              <InformationWrapper>
                <Link
                  href={{
                    pathname: "user-profile",
                    query: { id: comment.user.id },
                  }}
                  as={{
                    pathname: "user-profile",
                    query: { id: comment.user.id },
                  }}
                >
                  <ATag>
                    <ProfilePicture
                      src={comment.user.profile.profilePicture}
                      alt={comment.user.name}
                    />
                  </ATag>
                </Link>
                <UserInformationContainer>
                  <Link
                    href={{
                      pathname: "user-profile",
                      query: { id: comment.user.id },
                    }}
                    as={{
                      pathname: "user-profile",
                      query: { id: comment.user.id },
                    }}
                  >
                    <ATag>
                      <Username>{comment.user.name}</Username>
                    </ATag>
                  </Link>
                  <DateTag>
                    {`${
                      months[new Date(comment.createdAt).getMonth()]
                    } ${new Date(comment.createdAt).getDate()}, ${new Date(
                      comment.createdAt
                    ).getFullYear()}`}
                  </DateTag>
                </UserInformationContainer>
              </InformationWrapper>
              <Comment>{comment.content}</Comment>
            </Container>
            {(user && user.id) == comment.user.id && (
              <DeleteComment commentId={comment.id} />
            )}
          </Wrapper>
        );
      }}
    </User>
  );
};

export default IndividualComment;
