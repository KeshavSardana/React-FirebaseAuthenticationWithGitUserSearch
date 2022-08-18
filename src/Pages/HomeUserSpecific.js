import React, { useContext, useState } from "react";
import UserContext from "../Context/UserContext";
import { Redirect } from "react-router-dom";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";

import Axios from "axios";

import { toast } from "react-toastify";

import ProfileCard from "../Components/ProfileCard";
import Repos from "../Components/Repos";

const HomeUserSpecific = () => {
  const context = useContext(UserContext);

  const [query, setQuery] = useState("");
  const [profile, setProfile] = useState(null);

  const fetchProfile = async () => {
    try {
      const { data } = await Axios.get(`https://api.github.com/users/${query}`);
      setProfile(data);
      console.log(data);
    } catch {
      toast("Could not locate the username. Please enter a valid username", {
        type: "error",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchProfile();
  };

  if (context.user?.uid) {
    return (
      <Container>
        <Row className="my-5">
          <Col>
            <Form onsubmit={handleSubmit}>
              <FormGroup>
                <InputGroup>
                  <Input
                    type="text"
                    name="query"
                    id="query"
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search any valid username"
                    value={query}
                  ></Input>
                  <InputGroupAddon addonType="append">
                    <Button
                      type="submit"
                      color="primary"
                      className="px-2"
                      onClick={handleSubmit}
                    >
                      Fetch User
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        <Row>
          <Col md={5}>{profile ? <ProfileCard profile={profile} /> : null}</Col>
          <Col md={7}>
            {profile ? (
              <Repos
                repos_url={profile.repos_url}
                className="border-2 border-info"
              />
            ) : null}
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Redirect to="/signin" />;
  }
};

export default HomeUserSpecific;
