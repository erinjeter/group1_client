import React, { useState } from "react";

import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  NavbarToggler,
  NavItem,
  NavLink,
  Collapse,
  Modal,
  ModalHeader,
} from "reactstrap";

import AddPoll from "./Polls/AddPoll";

const Sitebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    let newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };

  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Pollster</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        {localStorage.role === "admin" ? (
          <>
            <Nav className="ml-auto" navbar>
              <Button className="mr-5" onClick={setModalIsOpenToTrue}>
                Add Poll
              </Button>{" "}
              <Modal isOpen={modalIsOpen}>
                <Button onClick={setModalIsOpenToFalse}>x</Button>
                <ModalHeader>Add Poll</ModalHeader>

                <AddPoll />
              </Modal>
            </Nav>
          </>
        ) : (
          <></>
        )}

        <Nav className="ml-auto" navbar>
          <Button className="mr-5" onClick={props.clearToken}>
            Logout
          </Button>{" "}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default Sitebar;
