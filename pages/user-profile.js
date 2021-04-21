import styled from "styled-components";

import Profile from "../components/Profile";
import Nav from "../components/Nav";

const Wrapper = styled.div`
  display: flex;
`;

const userProfile = (props) => {
  return (
    <Wrapper>
      <Nav />
      <Profile id={props.id} />
    </Wrapper>
  );
};

userProfile.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default userProfile;
