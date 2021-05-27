import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";

const GET_ONE_USER_QUERY = gql`
  query GET_ONE_USER_QUERY($id: String!) {
    getOneUser(userId: $id) {
      id
      name
      posts {
        id
        caption
        picture
      }
      comments {
        id
        content
        createdAt
        user {
          name
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
  // margin-top: 2vh;
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
  :hover {
    color: #f37748;
  }
  :disabled {
    :hover {
      color: #f37748;
    }
    cursor: default;
    color: #f37748;
    font-weight: 900;
  }
`;

const CommentTitleButton = styled.input`
  background: none;
  border: none;
  border-bottom: 0.3vw solid #d56062;
  padding: 0.8vw;
  font-size: 1.2vw;
  color: #bd8f7e;
  cursor: pointer;
  :hover {
    color: #f37748;
  }
  :disabled {
    :hover {
      color: #f37748;
    }
    cursor: default;
    color: #f37748;
    font-weight: 900;
  }
`;

const PostWrapper = styled.div`
  width: 50%;
  background: #fffff4;
  border-top-left-radius: 25px;
  border-right: 1px solid #fe5f55;
  /* border-top-right-radius: 25px; */
`;

const IndividualPost = styled.div`
  margin: 0 4vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PostImage = styled.img`
  width: 15vw;
  background: #fe5f55;
  border: 0.4vw solid #fe5f55;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
`;

const PostCaption = styled.p`
  font-size: 1.1vw;
  color: #fffff4;
  border-radius: 25px;
  background: #fe5f55;
  width: 30vw;
  margin-top: 0;
  padding: 1vw;
  /* padding: 0vw 2vw; */
`;

const CommentWrapper = styled.div`
  height: auto;
  width: 50%;
  background: #fffff4;
  border-top-right-radius: 25px;
  border-left: 1px solid #fe5f55;
`;

let IndividualComment = styled.div`
  margin: 0 4vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: 10px 10vw;
  border: 0.4vw solid #fe5f55;
  transition: 0.8s;
  :hover {
    border: 0.4vw solid #fffff4;
    transition: 0.8s;
    background: #fe5f55;
    p {
      color: #fffff4;
    }
  }
`;

let CommentContent = styled.h2`
  background: #fffff4;
  font-size: 1vw;
  margin-bottom: 0;
  color: #fe5f55;
`;

let CommentTimestamp = styled.p`
  margin-top: 0;
  font-size: 0.8vw;
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
            {isPostSide == true && <h1>post</h1>}
            {isPostSide == false && <h1>comments</h1>}
            {/* <PostWrapper> */}
            {/* <PostTitle>Posts</PostTitle> */}
            {/* {(user && user.posts) == null ? (
                <p>No Posts</p>
              ) : (
                user.posts.map((post) => (
                  <IndividualPost>
                    <PostImage src={post.picture} alt={post.caption} />
                    <PostCaption>{post.caption}</PostCaption>
                  </IndividualPost>
                ))
              )} */}
            {/* </PostWrapper> */}
            {/* <CommentWrapper> */}
            {/* <CommentTitle>Comments</CommentTitle> */}
            {/* {(user && user.comments) == null ? (
                <p>No Comment</p>
              ) : (
                user.comments.map((comment) => (
                  <IndividualComment>
                    <CommentContent>{comment.content}</CommentContent>
                    <CommentTimestamp>
                      {`${
                        months[new Date(comment.createdAt).getMonth()]
                      } ${new Date(comment.createdAt).getDate()}, ${new Date(
                        comment.createdAt
                      ).getFullYear()}`}
                    </CommentTimestamp>
                  </IndividualComment>
                ))
              )} */}
            {/* </CommentWrapper> */}
          </Container>
        );
      }}
    </Query>
  );
};

export default Profile;
