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

const Container = styled.div`
  background: #e9ecef;
  border-top: 0.5vw solid #e9ecef;
  border-top-right-radius: 15%;
  margin: 2vh 1vw;
  width: 25vmax;
  height: 25vmax;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #e9ecef;
  /* padding: 2vmax 1vmax; */
`;

const Image = styled.img`
  overflow: hidden;
  border-top: 0.2vw solid #fe5f55;
  border-top-right-radius: 15%;
  border-bottom: 0.5vw solid #fe5f55;
  border-bottom-left-radius: 15%;
`;

let CaptionAndUserInformationContainer = styled.div`
  display: flex;

  flex-direction: column;
`;

let UserInformationWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

let UserName = styled.p`
  color: black;
  margin: 0;
  border-right: 1px solid #fe5f55;
  padding-right: 5px;
  border-top-right-radius: 25%;
  font-size: 1.2vmax;
`;

const Caption = styled.p`
  font-size: 0.8vmax;
  font-family: "Julius Sans One", sans-serif;
  margin: 3px 15px;

  padding: 0 0.4vw;
  /* font-weight: bolder; */
  color: #fe5f55;
  text-shadow: 2px 2px #d3d3d3;
  text-align: center;
  background: #ced4da;
`;

const Span = styled.span`
  color: #2b2d42;
  :hover {
    color: #fe5f55;
    transition: 0.5s;
    cursor: pointer;
  }
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
                  <UserInformationWrapper>
                    <img
                      style={{
                        width: "3vmax",
                        borderRadius: "50%",
                        height: "3vmax",
                        border: "2px solid #fe5f55",
                      }}
                      src={post.user.profile.profilePicture}
                    />
                    <UserName>{post.user.name.toLowerCase()}</UserName>
                  </UserInformationWrapper>
                </a>
              </Link>
              <Caption>{post.caption}</Caption>
            </CaptionAndUserInformationContainer>
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
              </Modal>
            </Wrapper>
          </Container>
        );
      }}
    </User>
  );
};

export default IndividualPost;
