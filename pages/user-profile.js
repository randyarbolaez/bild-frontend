import Profile from "../components/Profile";

const userProfile = (props) => {
  return (
    <>
      <Profile id={props.id} />
    </>
  );
};

userProfile.getInitialProps = async ({ query }) => {
  const { id } = query;

  return { id };
};

export default userProfile;
