import React, { useContext, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  CardBody,
  CardFooter,
  CardHeader,
  Card,
  Button,
  FormGroup,
  Form,
  Input,
  Label,
} from "reactstrap";

import UserContext from "../Context/UserContext";
import firebase from "firebase";
import { toast } from "react-toastify";

const Signin = () => {
  const context = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
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
    handleSignin();
  };

  if (context.user?.uid) {
    return <Redirect to="/user" />;
  } else {
    return (
      <Container className="mt-5">
        <Row>
          <Col lg={6} className="offset-lg-3">
            <Card>
              <CardHeader className="text-center">SignIn here</CardHeader>
              <Form onSubmit={handleSubmit}>
                <CardBody>
                  <FormGroup row className="my-1">
                    <Label sm={3} for="email">
                      Email
                    </Label>
                    <Col sm={9}>
                      <Input
                        className="my-2"
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your Email "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      ></Input>
                    </Col>
                  </FormGroup>
                  <FormGroup row className="my-1">
                    <Label sm={3} for="password">
                      Password
                    </Label>
                    <Col sm={9}>
                      <Input
                        className="my-2"
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      ></Input>
                    </Col>
                  </FormGroup>
                </CardBody>
                <CardFooter className="text-center">
                  <Button
                    className="bg-primary"
                    type="submit"
                    block
                    style={{ width: "80%" }}
                  >
                    SignIn
                  </Button>
                  <div className="text-center mt-3">
                    <Link
                      tag={Link}
                      to="/signup"
                      style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                      Don't have an account ? Click Here
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

export default Signin;
