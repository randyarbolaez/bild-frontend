import React, { useState } from "react";
import Modal from "react-modal";
import Link from "next/link";
import styled from "styled-components";

import User from "./User";
import Signout from "./Signout";
import CreatePost from "./CreatePost";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  font-family: "Julius Sans One", sans-serif;
  align-items: center;
  margin: 0 15%;
`;

const TitleContainer = styled.h1`
  color: #fe5f55;
  font-size: 4.5vw;
  margin: 0;
  :hover {
    color: #fe2f22;
  }
`;

const InputWrapper = styled.input`
  margin: 2vh 2vw;
  padding: 0.5vw;
  border: none;
  border-bottom: 0.2vw solid #fe5f55;
  border-top: 0.2vw solid #fe5f55;
  font-size: 1.2vw;
  font-family: "Halant", serif;
  border-top-right-radius: 25%;
  border-bottom-left-radius: 25%;
  background: #22333b;
  outline: none;
  color: #bcb8b1;
  text-align: center;
  ::placeholder {
    font-size: 1.2vw;
    color: #d3d3d3;
  }
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.6vw;
  color: #e9ecef;
  transition: 0.5s;
  outline: none;
  :hover {
    color: #66798c;
    font-size: 2.5vw;
    transition: 0.5s;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Nav = () => {
  const [openModal, setOpenModal] = useState(false);

  const getDatafromChild = () => {
    setTimeout(() => {
      setOpenModal(false);
    }, 200);
  };

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
          null;
        } else {
          user = data.user;
        }
        return (
          <Container>
            <Link href="/" as={"/"}>
              <a>
                <TitleContainer>Bild</TitleContainer>
              </a>
            </Link>
            {!user && (
              <Link href="/authenticate" as={"/authenticate"}>
                <a>
                  <Button>Sign Up/In</Button>
                </a>
              </Link>
            )}
            {user && (
              <div>
                <Button onClick={() => setOpenModal(true)}>Create Post</Button>

                <Modal
                  isOpen={openModal}
                  // onAfterOpen={afterOpenModal}
                  ariaHideApp={false}
                  onRequestClose={() => setOpenModal(false)}
                  style={customStyles}
                >
                  <CreatePost sendData={() => getDatafromChild} />
                  <Button onClick={() => setOpenModal(false)}>close</Button>
                </Modal>
                <Signout />
              </div>
            )}
          </Container>
        );
      }}
    </User>
  );
};

export default Nav;
