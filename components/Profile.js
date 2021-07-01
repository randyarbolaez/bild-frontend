import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

import Posts from "./Posts";
import Comments from "./Comments";
import Loading from "./Loading";

const GET_ONE_USER_QUERY = gql`
  query GET_ONE_USER_QUERY($id: String!) {
    getOneUser(userId: $id) {
      id
      name
      posts {
        id
        caption
        picture
        user {
          id
        }
      }
      comments {
        id
        content
        createdAt
        user {
          id
          name
          profile {
            profilePicture
          }
        }
      }
      profile {
        profilePicture
      }
    }
  }
`;

const Container = styled.div`
  display: flex;
  width: 90vw;
  text-align: center;
  flex-direction: column;
  height: auto;
  justify-content: center;
  margin: 2vh 5vw 0 5vw;
`;

const TitleButtonContainer = styled.div``;

const PostTitleButton = styled.input`
  background: none;
  border: none;
  border-bottom: 0.3vw solid #d56062;
  border-right: 0.3vw solid #d56062;
  padding: 0.8vw;
  font-size: 1.2vw;
  cursor: pointer;
  font-weight: bold;
  color: #bd8f7e;
  transition: color 0.4s ease-in-out;
  :hover {
    color: #f37748;
  }
  :disabled {
    :hover {
      color: #f37748;
    }
    cursor: default;
    color: #f37748;
  }
`;

const CommentTitleButton = styled.input`
  background: none;
  border: none;
  border-bottom: 0.3vw solid #d56062;
  padding: 0.8vw;
  font-size: 1.2vw;
  font-weight: bold;
  color: #bd8f7e;
  cursor: pointer;
  transition: color 0.4s ease-in-out;
  :hover {
    color: #f37748;
  }
  :disabled {
    :hover {
      color: #f37748;
    }
    cursor: default;
    color: #f37748;
  }
`;

const SubjectContainer = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IndividualPost = styled.div`
  width: 20vw;
  margin: 2vh 4vw;
  display: flex;
  flex-direction: column;
  background: #f8f8ff;
  align-items: center;
  border-radius: 0.5vw 0.5vw 0.5vw 0.5vw;
`;

const PostImage = styled.img`
  width: 100%;
  border-radius: 0.5vw 0.5vw 0% 0%;
`;

const CaptionContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 96%;
`;

const PostCaption = styled.p`
  font-size: 1.02vw;
  color: #939393;
  width: 100%;
  margin-top: 0;
  text-align: left;
  padding-left: 1vw;
`;

let IndividualComment = styled.div`
  display: flex;
  align-items: flex-end;
  transition: 0.8s;
  width: 50vw;
  margin: 1.2vh 1.2vw;
  border-top: 0.2vw solid #f7ece1;
  border-bottom: 0.2vw solid #f7ece1;
`;

let CommentContent = styled.h2`
  display: flex;
  margin: 0;
  align-items: left;
  padding-left: 1.2vw;
  font-size: 1vw;
  color: #788475;
  width: 50vw;
  font-weight: 400;
`;

let CommentTimestamp = styled.p`
  background: #e0e0e0;
  background: #f7ece1;
  font-size: 0.8vw;
  width: 10vw;
  display: flex;
  justify-content: center;
  margin: 0;
  align-items: center;
  text-align: center;
  padding-top: auto;
  margin: auto;
`;

const Profile = (props) => {
  const [isPostSide, setIsPostSide] = useState(true);
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
    <Query
      query={GET_ONE_USER_QUERY}
      variables={{ id: props.id }}
      fetchPolicy="no-cache"
    >
      {({ data, loading, error, refetch }) => {
        if (!data) {
          user = null;
          refetch();
        } else {
          user = data.getOneUser;
        }
        return (
          <Container>
            <TitleButtonContainer>
              <PostTitleButton
                disabled={isPostSide == true}
                onClick={() => setIsPostSide(true)}
                value={"Posts"}
                type="button"
              />
              <CommentTitleButton
                disabled={isPostSide == false}
                onClick={() => setIsPostSide(false)}
                value={"Comments"}
                type="button"
              />
            </TitleButtonContainer>
            <SubjectContainer>
              {isPostSide && (
                <>
                  {(user && user.posts) == null ? (
                    <Loading />
                  ) : user.posts.length == 0 ? (
                    <h1>No Posts</h1>
                  ) : (
                    user.posts.map((post) => (
                      <IndividualPost key={post.id}>
                        <PostImage src={post.picture} alt={post.caption} />
                        <CaptionContainer>
                          <PostCaption>{post.caption}</PostCaption>
                        </CaptionContainer>
                      </IndividualPost>
                    ))
                  )}
                </>
              )}
              {!isPostSide && (
                <>
                  {(user && user.comments) == null ? (
                    <Loading />
                  ) : user.comments.length == 0 ? (
                    <h1>No Comments</h1>
                  ) : (
                    user.comments.map((comment) => (
                      <IndividualComment>
                        <CommentContent>{comment.content}</CommentContent>
                        <CommentTimestamp>
                          {`${
                            months[new Date(comment.createdAt).getMonth()]
                          } ${new Date(
                            comment.createdAt
                          ).getDate()}, ${new Date(
                            comment.createdAt
                          ).getFullYear()}`}
                        </CommentTimestamp>
                      </IndividualComment>
                    ))
                  )}
                </>
              )}
            </SubjectContainer>
          </Container>
        );
      }}
    </Query>
  );
};

export default Profile;
