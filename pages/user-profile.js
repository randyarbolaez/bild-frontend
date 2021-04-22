import styled from "styled-components";

import Profile from "../components/Profile";
import Nav from "../components/Nav";

const userProfile = (props) => {
  return (
    <div>
      <Nav />
      <Profile id={props.id} />
    </div>
  );
};

userProfile.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default userProfile;
