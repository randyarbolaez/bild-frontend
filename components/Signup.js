import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { useRouter } from "next/router";
import styled from "styled-components";

import { CURRENT_USER_QUERY } from "./User";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
    $profilePicture: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
      profilePicture: $profilePicture
    ) {
      id
      email
      password
    }
  }
`;

let Fieldset = styled.fieldset`
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border: none;
  padding: 0;
  width: 30vw;
  background: #fffff4;
  margin: 0;
  border-top-left-radius: 5%;
  border-bottom-left-radius: 5%;
`;

let Title = styled.h2`
  text-align: center;
  font-style: italic;
  margin-bottom: 0.6vw;
  font-family: "Montserrat", sans-serif;
  color: #fe5f55;
  font-size: 5vw;
  margin-top: 0;
`;

let Input = styled.input`
  margin-bottom: 2vw;
  background-image: linear-gradient(to bottom, #fffff4, #fdfdf6);
  border-radius: 0.4vw;
  border: none;
  border: 0.2vw solid #9a9a9a;
  font-size: 1.2vw;
  color: #9a9a9a;
  outline: none;
  padding: 10px 5px;
  width: 16vw;
  transition: 0.3s;
  :hover {
    transition: 0.3s;
    border-color: #cdcdcd;
  }
  ::placeholder {
    color: #cf8884;
    color: #9a9a9a;
    // color: #e4766f;
  }
`;

let LabelFile = styled.label`
  font-size: 1.5vw;
  color: #fffff4;
  cursor: pointer;
  background: #fe5f55;
  margin: 0 5vw;
  padding: 10px 5px;
  font-family: "Montserrat", sans-serif;
  border-radius: 20px;
  white-space: nowrap;
  /* word-wrap: break-word; */
  line-height: 1.38;
`;

let ButtonDiv = styled.div`
  text-align: right;
  padding-bottom: 4vh;
  padding-top: 2vh;
`;

let InputButton = styled.input`
  background-color: #fe5f55;
  cursor: pointer;
  outline: none;
  font-family: "Montserrat", sans-serif;
  color: #fffff4;
  font-weight: 600;
  font-size: 2vw;
  border: none;
  padding: 10px 0;
  width: 12vw;
  transition: 0.9;
  border-top-left-radius: 0.4vw;
  border-bottom-left-radius: 0.4vw;
  :disabled {
    color: #d3d3d3;
    cursor: default;
  }
  :hover {
    transition: 0.9;
    color: #fffff4;
    :disabled {
      background: #fe5f55;
      color: #d3d3d3;
    }
  }
`;

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [fileName, setFileName] = useState("");
  const [errorTimer, setErrorTimer] = useState();
  const [profilePictureLoading, setProfilePictureLoading] = useState(false);

  const router = useRouter();

  const emailRegex = /\S+@\S+\.\S+/;

  const uploadFile = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    setFileName(files[0].name);
    data.append("upload_preset", "bild-profile-picture");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dx3i4rcnz/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setProfilePicture(file.url);
    setProfilePictureLoading(!profilePictureLoading);
  };

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={{ email, password, name, profilePicture }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => {
        return (
          <form
            method="post"
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await signup();
                setEmail("");
                setPassword("");
                setName("");
                setProfilePicture("");
                setProfilePictureLoading(!profilePictureLoading);
                setFileName("");
                router.push("/", "/");
                console.log("USER SIGNED UP: ", signup);
              } catch (error) {
                console.log("Error[Signup.js]: ", error);
                setErrorTimer(true);
                setTimeout(() => {
                  setErrorTimer(false);
                }, 1000);
              }
            }}
          >
            <Fieldset>
              <Title>Sign Up</Title>
              <label htmlFor="email">
                <Input
                  style={{
                    borderColor: error && errorTimer ? "#ff0f0f" : "",
                  }}
                  required
                  type="email"
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </label>
              {emailRegex.test(email) && (
                <label htmlFor="password">
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </label>
              )}
              {password && (
                <label htmlFor="name">
                  <Input
                    required
                    type="text"
                    name="name"
                    placeholder="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </label>
              )}
              {name && (
                <LabelFile htmlFor="file">
                  {fileName
                    ? fileName.substring(0, 20)
                    : "Upload Profile Picture"}
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={uploadFile}
                    required
                    style={{ display: "none" }}
                  />
                </LabelFile>
              )}
              <ButtonDiv>
                <InputButton
                  disabled={!profilePictureLoading}
                  type="submit"
                  value="Sign Up"
                />
              </ButtonDiv>
            </Fieldset>
          </form>
        );
      }}
    </Mutation>
  );
};

export default Signup;
