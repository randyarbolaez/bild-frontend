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
  margin: 1vh 0vw;
  border-radius: 0.5vw;
  background: #f8f8ff;
  abckground: purple;
  width: 25vw;
  height: 100%;
`;

const Image = styled.img`
  overflow: hidden;
  border-top-right-radius: 0.5vw;
  border-top-left-radius: 0.5vw;
`;

const UserInformationWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: -2vh;
  margin-left: 0.5vw;
`;

const LinkToProfile = styled.a`
  display: flex;
  margin: 1vh 0;
  align-items: center;
  :hover {
    cursor: pointer;
  }
`;

const ProfilePictureImage = styled.img`
  width: 2.3vmax;
  height: 2.3vmax;
  border: 2px solid #fe5f55;
  border-radius: 50%;
  margin-left: 0.5vw;
`;

const Username = styled.p`
  color: #535353;
  margin: 0;
  padding: 0 0.5vw;
  font-size: 1.1vmax;
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
  color: #939393;
  word-wrap: break-word;
  margin: -0.5vh 0 0 0.5vw;
`;

const PostButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`;

const ModalButtons = styled.div`
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

const Span = styled.span`
  color: #2b2d42;
  margin: 0;
  padding: 0;
  padding: 0 0.5vw;
  :hover {
    color: #fe5f55;
    transition: 0.5s;
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
                <LinkToProfile>
                  <ProfilePictureImage src={post.user.profile.profilePicture} />
                  <Username>{post.user.name.toLowerCase()}</Username>
                </LinkToProfile>
              </Link>
            </UserInformationWrapper>
            <Caption>{post.caption}</Caption>
            <Modal
              isOpen={openModal}
              ariaHideApp={false}
              onRequestClose={() => setOpenModal(false)}
              style={customStyles}
            >
              <Comments comments={post.comments} post={post} />
              <ModalButtons>
                <CloseButton
                  onMouseEnter={() => setWindowClose(!windowClose)}
                  onMouseLeave={() => setWindowClose(!windowClose)}
                >
                  {windowClose ? (
                    <FaRegWindowClose onClick={() => setOpenModal(false)} />
                  ) : (
                    <FaWindowClose onClick={() => setOpenModal(false)} />
                  )}
                </CloseButton>
                {user && <CreateComment post={post} />}
              </ModalButtons>
            </Modal>
            <PostButtons>
              {(user && user.id) == post.user.id && (
                <DeletePost postId={post.id} />
              )}
              <Span>
                <FaRegCommentDots
                  size={15}
                  onClick={() => setOpenModal(true)}
                />
              </Span>
            </PostButtons>
          </Container>
        );
      }}
    </User>
  );
};

export default IndividualPost;
