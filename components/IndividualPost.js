import React, { useState } from "react";
import {
  FaRegCommentDots,
  FaWindowClose,
  FaRegWindowClose,
} from "react-icons/fa";
import Modal from "react-modal";
import Link from "next/link";
import styled from "styled-components";

import DeletePost from "./DeletePost";
import User from "./User";
import Comments from "./Comments";

import CreateComment from "./CreateComment";

const Container = styled.div`
  background: #ffffff;
  margin: 1vh 0vw;
  border-radius: 0.5vw;
  background: #f8f8ff;
  width: 25vw;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const Image = styled.img`
  overflow: hidden;
  border-top-right-radius: 0.5vw;
  border-top-left-radius: 0.5vw;
`;

let CaptionAndUserInformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 0.2vw solid black;
  padding-top: 1vh;
  margin-top: -2.5vh;
  margin-bottom: 0.5vh;
`;

let UserInformationWrapper = styled.div`
  display: flex;
  align-items: center;
`;

let UserNameAndButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-left: 0.2vw solid black;
  margin-right: 2vw;
`;

let UserName = styled.p`
  color: black;
  border: 1px solid transparent;
  margin: 0;
  padding: 0 1vw;
  font-size: 1.2vmax;
  font-weight: 600;
  transition: color 0.5s ease-in-out;
  :hover {
    color: red;
  }
`;

const Caption = styled.p`
  font-size: 1vmax;
  font-family: "Julius Sans One", sans-serif;
  font-weight: bolder;
  color: #fe5f55;
  text-align: center;
  word-wrap: break-word;
  margin: 0;
`;

const Span = styled.span`
  color: #2b2d42;
  :hover {
    color: #fe5f55;
    transition: 0.5s;
    cursor: pointer;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-around;
`;

const CloseButton = styled.span`
  font-size: 1.8vw;
  color: #fe5f55;
  :hover {
    cursor: pointer;
  }
`;

const IndividualPost = ({ post }) => {
  const [openModal, setOpenModal] = useState(false);
  const [windowClose, setWindowClose] = useState(false);
  let user = null;

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          return null;
        } else {
          user = data.user;
        }
        return (
          <Container>
            <Image
              style={{ width: "25vmax", height: "18vmax" }}
              src={post.picture ? post.picture : null}
              alt={post.caption}
            />
            <CaptionAndUserInformationContainer>
              <UserInformationWrapper>
                <Link
                  href={{
                    pathname: "user-profile",
                    query: { id: post.user.id },
                  }}
                  as={{
                    pathname: "user-profile",
                    query: { id: post.user.id },
                  }}
                >
                  <a>
                    <img
                      style={{
                        width: "3vmax",
                        borderRadius: "50%",
                        height: "3vmax",
                        border: "2px solid #fe5f55",
                        margin: "0 0.5vw",
                        marginTop: "1vh",
                      }}
                      src={post.user.profile.profilePicture}
                    />
                  </a>
                </Link>
                <UserNameAndButtons>
                  <Link
                    href={{
                      pathname: "user-profile",
                      query: { id: post.user.id },
                    }}
                    as={{
                      pathname: "user-profile",
                      query: { id: post.user.id },
                    }}
                  >
                    <a>
                      <UserName>{post.user.name.toLowerCase()}</UserName>
                    </a>
                  </Link>
                  <Wrapper>
                    {(user && user.id) == post.user.id && (
                      <DeletePost postId={post.id} />
                    )}
                    <Span>
                      <FaRegCommentDots
                        size={20}
                        onClick={() => setOpenModal(true)}
                      />
                    </Span>
                    <Modal
                      isOpen={openModal}
                      // onAfterOpen={afterOpenModal}
                      ariaHideApp={false}
                      onRequestClose={() => setOpenModal(false)}
                      style={customStyles}
                    >
                      <Comments comments={post.comments} post={post} />
                      <Buttons>
                        <CloseButton
                          onMouseEnter={() => setWindowClose(!windowClose)}
                          onMouseLeave={() => setWindowClose(!windowClose)}
                        >
                          {windowClose ? (
                            <FaRegWindowClose
                              onClick={() => setOpenModal(false)}
                            />
                          ) : (
                            <FaWindowClose
                              onClick={() => setOpenModal(false)}
                            />
                          )}
                        </CloseButton>
                        {user && <CreateComment post={post} />}
                      </Buttons>
                    </Modal>
                  </Wrapper>
                </UserNameAndButtons>
              </UserInformationWrapper>
            </CaptionAndUserInformationContainer>
            <Caption>{post.caption}</Caption>
          </Container>
        );
      }}
    </User>
  );
};

export default IndividualPost;
