import React, { useContext, useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Label,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "reactstrap";

import { Link } from "react-router-dom";

import firebase from "firebase/app";
import firebaseConfig from "../config/firebaseConfig";

import { toast } from "react-toastify";
import UserContext from "../Context/UserContext";

import { Redirect } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const context = useContext(UserContext);

  const handleSignup = () => {
    console.log("Hello");
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        context.setUser({
          email: res.user.email,
          uid: res.user.uid,
        });
      })
      .catch((error) => {
        console.log(error);
        toast(error.message, {
          type: "error",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hello");
    handleSignup();
  };

  if (context.user?.uid) {
    return <Redirect to="/user" />;
  } else {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg={6} className="offset-lg-3">
            <Card>
              <CardHeader className="text-center  ">SignUp Here</CardHeader>
              <Form onSubmit={handleSubmit}>
                <CardBody>
                  <FormGroup row className="my-1">
                    <Col sm={3}>
                      <Label for="email" className="my-2">
                        Email
                      </Label>
                    </Col>
                    <Col sm={9}>
                      <Input
                        className="my-2"
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your Email here"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-1">
                    <Label for="password" sm={3} className="my-2">
                      Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        className="my-2"
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Create Password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                      />
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    color="primary"
                    type="submit"
                    block
                    style={{ width: "80%" }}
                  >
                    SignUp
                  </Button>
                  <div className="text-center mt-3">
                    <Link
                      tag={Link}
                      to="/signin"
                      style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      Already have an account ? Click Here
                    </Link>
                  </div>
                </CardFooter>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Signup;
