import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";

import User from "./User";
import Posts from "./Posts";

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
            <div>
              <Posts />
            </div>
          </div>
        );
      }}
    </User>
  );
};

export default Home;
