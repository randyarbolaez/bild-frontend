import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import User from "./User";
import Signout from "./Signout";

const Container = styled.div`
  height: 10vh;
  display: flex;
  justify-content: space-around;
  // justify-content: space-between;
  // flex-direction: column;
  font-family: "Julius Sans One", sans-serif;
  align-items: center;
  // padding: 10vh 0;
  // background: black;
  // width: 25vw;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.h1`
  color: #66798c;
  font-size: 1.6vw;
  :hover {
    span {
      color: #e9ecef;
    }
    cursor: pointer;
  }
`;

const TitleContainer = styled.h1`
  color: #fe5f55;
  font-size: 4.5vw;
  margin: 0;
  :hover {
    color: #fe2f22;
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
    font-size: 2.3vw;
    transition: 0.5s;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Nav = () => {
  let user = null;
  let [navInfoShown, setNavInfoShown] = useState(false);
  let [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ]
    );
  }, [url]);

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
          <Container
            style={{
              backgroundColor: navInfoShown ? null : "purple",
              height: navInfoShown ? null : "10vh",
              width: navInfoShown ? null : "10%",
              position:
                navInfoShown && url !== "authenticate" ? null : "absolute",
              // position: navInfoShown ? "absolute" : "absolute",
              bottom: navInfoShown ? null : "0px",
              right: navInfoShown ? null : "0px",
              // position: navInfoShown ? null : "absolute",
            }}
          >
            <button
              onClick={() => {
                // setUrl(
                //   window.location.href.split("/")[
                //     window.location.href.split("/").length - 1
                //   ]
                // );
                console.log(url);
                setNavInfoShown(!navInfoShown);
                console.log(
                  navInfoShown || url == "authenticate"
                    ? console.log(null, "WHA")
                    : console.log("absolute")
                );
              }}
            >
              HELO
            </button>
            {navInfoShown ? (
              <>
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
                  <Wrapper>
                    <Link
                      href={{
                        pathname: "create",
                      }}
                    >
                      <a>
                        <Button>Create Post</Button>
                      </a>
                    </Link>
                    <Signout />
                    <Link
                      href={{
                        pathname: "user-profile",
                        query: { id: user.id },
                      }}
                      as={{
                        pathname: "user-profile",
                        query: { id: user.id },
                      }}
                    >
                      <a>
                        <UserName>
                          <span>"</span>
                          {user.name}
                          <span>"</span>
                        </UserName>
                      </a>
                    </Link>
                  </Wrapper>
                )}
              </>
            ) : null}
          </Container>
        );
      }}
    </User>
  );
};

export default Nav;

// return (
//   <User>
//     {({ data, loading }) => {
//       if (loading) {
//         null;
//       } else {
//         user = data.user;
//       }
//       return (
//         <Container>
//           <button onClick={() => setShowNav(!showNav)}>HELO</button>
//           <Link href="/" as={"/"}>
//             <a>
//               <TitleContainer>Bild</TitleContainer>
//             </a>
//           </Link>
//           {!user && (
//             <Link href="/authenticate" as={"/authenticate"}>
//               <a>
//                 <Button>Sign Up/In</Button>
//               </a>
//             </Link>
//           )}
//           {user && (
//             <Wrapper>
//               <Link
//                 href={{
//                   pathname: "create",
//                 }}
//               >
//                 <a>
//                   <Button>Create Post</Button>
//                 </a>
//               </Link>
//               <Signout />
//               <Link
//                 href={{
//                   pathname: "user-profile",
//                   query: { id: user.id },
//                 }}
//                 as={{
//                   pathname: "user-profile",
//                   query: { id: user.id },
//                 }}
//               >
//                 <a>
//                   <UserName>
//                     <span>"</span>
//                     {user.name}
//                     <span>"</span>
//                   </UserName>
//                 </a>
//               </Link>
//             </Wrapper>
//           )}
//         </Container>
//       );
//     }}
//   </User>
// );
