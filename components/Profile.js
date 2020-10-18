import React from "react";
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
  width: 80vw;
  margin: 15px 10vw;
  text-align: center;
  height: auto;
`;

const PostWrapper = styled.div`
  width: 50%;
  background: #fffff4;
  border-top-left-radius: 25px;
  border-right: 1px solid #fe5f55;
  /* border-top-right-radius: 25px; */
`;

const PostTitle = styled.h2`
  width: 100%;
  border-bottom: 1px solid #fe5f55;
  color: #ffb5a7;
  font-family: "Montserrat", sans-serif;
  font-size: 2.4vmax;
  :hover {
    color: #fe5f55;
  }
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

const CommentTitle = styled.h2`
  width: 100%;
  border-bottom: 1px solid #fe5f55;
  color: #ffb5a7;
  font-family: "Montserrat", sans-serif;
  font-size: 2.4vmax;
  :hover {
    color: #fe5f55;
  }
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
    <Query query={GET_ONE_USER_QUERY} variables={{ id: props.id }}>
      {({ data, loading, error }) => {
        if (!data) {
          user = null;
        } else {
          user = data.getOneUser;
        }
        return (
          <Container>
            <PostWrapper>
              <PostTitle>Posts</PostTitle>
              {(user && user.posts) == null ? (
                <p>No Posts</p>
              ) : (
                user.posts.map((post) => (
                  <IndividualPost>
                    <PostImage src={post.picture} alt={post.caption} />
                    <PostCaption>{post.caption}</PostCaption>
                  </IndividualPost>
                ))
              )}
            </PostWrapper>
            <CommentWrapper>
              <CommentTitle>Comments</CommentTitle>
              {(user && user.comments) == null ? (
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
              )}
            </CommentWrapper>
          </Container>
        );
      }}
    </Query>
  );
};
export default Profile;
