import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import User from "./User";
import Posts from "./Posts";
import Nav from "./Nav";

const Wrapper = styled.div`
  display: flex;
`;

const Home = () => {
  let user = null;
  return (
    <User>
      {({ data, loading }) => {
        if (loading) {
          null;
        } else {
          user = data.user;
        }

        return (
          <div>
            {loading && (
              <div>
                <p>Loading</p>
              </div>
            )}
            <Wrapper>
              <Nav />
              <Posts />
            </Wrapper>
          </div>
        );
      }}
    </User>
  );
};

export default Home;
