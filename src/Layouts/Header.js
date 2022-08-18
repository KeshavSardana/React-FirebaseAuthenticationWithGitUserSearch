import React, { useContext, useState } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
  Collapse,
  NavbarToggler,
} from "reactstrap";

import UserContext from "../Context/UserContext";

import { Link } from "react-router-dom";

const Header = () => {
  const context = useContext(UserContext);

  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <Navbar expand="md" className="text-white bg-info m-0">
      <NavbarBrand
        className="text-white"
        tag={Link}
        to="/"
        style={{ marginLeft: "7%" }}
      >
        GitFire Authentication App
      </NavbarBrand>
      <NavbarText className="text-dark">
        {context.user?.uid ? context.user.email : ""}
      </NavbarText>
      <NavbarToggler
        onClick={toggle}
        className="border-dark"
        style={{ marginRight: "3%" }}
      />
      <Collapse isOpen={open} navbar className="text-center">
        <Nav className="ms-auto mx-4" navbar>
          {context.user?.uid ? (
            <NavItem>
              <NavLink
                onClick={() => context.setUser(null)}
                style={{ cursor: "pointer" }}
                className="text-white"
              >
                Logout
              </NavLink>
            </NavItem>
          ) : (
            <>
              <NavItem>
                <NavLink className="text-white" tag={Link} to="/signin">
                  SignIn
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="text-white" tag={Link} to="/signup">
                  SignUp
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Header;
