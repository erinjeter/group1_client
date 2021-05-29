import React, { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  NavbarToggler,
  Collapse,
} from "reactstrap";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Pollster</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
            <Button className="mr-5" onClick={props.clearToken}>Logout</Button>{' '}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Sitebar;
