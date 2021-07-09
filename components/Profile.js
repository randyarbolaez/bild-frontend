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

const TitleButtonContainer = styled.div`
  margin-bottom: 2vh;
`;

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

const CommentSubjectContainer = styled.div`
  // margin-top: 24px;
  // margin-bottom: 2vh;
  display: flex;
  // flex-direction: column;
  align-items: center;
  // flex: 1;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const PostSubjectContainer = styled.div`
  // margin-top: 24px;
  margin-bottom: 2vh;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
`;

const IndividualPost = styled.div`
  display: flex;
  transition: 0.3s;
  width: 20vw;
  height: 40vh;
  flex-grow: 1;
  &:last-child {
    flex-grow: 10;
  }
  :hover {
    border-bottom: 10px solid #ced4da;
  }
`;

const PostImage = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const CaptionContainer = styled.div`
  display: flex;
  position: relative;
`;

const PostCaption = styled.p`
  position: absolute;
  bottom: 0px;
  right: 0px;
  font-size: 1.02vw;
  font-weight: 700;
  color: #ced4da;
  background: rgba(0, 0, 0, 0.5);
  margin: 0;
  padding: 0 1vw;
  width: 22.5vw;
`;

let IndividualComment = styled.div`
  display: flex;
  transition: 0.3s;
  width: 20vw;
  height: auto;
  background: #f7ece1;
  position: relative;
  flex-grow: 1;
  :hover {
    border-top: 10px solid #ced4da;
  }
`;

let CommentContent = styled.h2`
  display: flex;
  margin: 0;
  justify-content: center;
  font-size: 1vw;
  color: #788475;
  width: 100%;
  font-weight: 400;
  overflow-wrap: anywhere;
  padding: 0.9vw;
`;

let CommentTimestamp = styled.p`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: 0.8vw;
  margin: 0;
  // padding: 1vw;
`;

const Profile = (props) => {
  const [isPostSide, setIsPostSide] = useState(true);
  const [captionShown, setCaptionShown] = useState(false);
  const [captionId, setCaptionId] = useState("");
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
            <>
              {isPostSide && (
                <PostSubjectContainer>
                  {(user && user.posts) == null ? (
                    <Loading />
                  ) : user.posts.length == 0 ? (
                    <h1>No Posts</h1>
                  ) : (
                    user.posts.map((post) => {
                      return (
                        <IndividualPost key={post.id}>
                          <PostImage
                            src={post.picture}
                            alt={post.caption}
                            onMouseEnter={() => {
                              setCaptionId(post.id);
                              setCaptionShown(true);
                            }}
                            onMouseMove={() => {
                              setCaptionId(post.id);
                              setCaptionShown(true);
                            }}
                            onMouseLeave={() => {
                              setCaptionId("");
                              setCaptionShown(false);
                            }}
                          />
                          {captionShown && captionId == post.id && (
                            <CaptionContainer>
                              <PostCaption numberOfLines={1}>
                                {post.caption}
                              </PostCaption>
                            </CaptionContainer>
                          )}
                        </IndividualPost>
                      );
                    })
                  )}
                </PostSubjectContainer>
              )}
              {!isPostSide && (
                <CommentSubjectContainer>
                  {(user && user.comments) == null ? (
                    <Loading />
                  ) : user.comments.length == 0 ? (
                    <h1>No Comments</h1>
                  ) : (
                    user.comments.map((comment) => (
                      <IndividualComment key={comment.id}>
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
                </CommentSubjectContainer>
              )}
            </>
          </Container>
        );
      }}
    </Query>
  );
};

export default Profile;
