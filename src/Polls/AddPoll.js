import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import Modal from "react-modal";
// import { Link } from "react-router-dom";

const AddPoll = (props) => {
  const [question, setQuestion] = useState("");
  const [response1, setResponse1] = useState("");
  const [response2, setResponse2] = useState("");
  const [response3, setResponse3] = useState("");
  const [response4, setResponse4] = useState("");

  const { buttonLabel, className } = props;
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const reload = () => window.location.reload();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/poll/create", {
      method: "POST",
      body: JSON.stringify({
        poll: {
          question: question,
          response1: response1,
          response2: response2,
          response3: response3,
          response4: response4,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((pollData) => {
        toggle();
        setQuestion("");
        setResponse1("");
        setResponse2("");
        setResponse3("");
        setResponse4("");
        console.log(pollData);
      });
  };

  return (
    <div className="main">
      <h1 className="addHeader">Add Poll</h1>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="question">Question</Label>
          <Input
            type="text"
            name="question"
            id="question"
            placeholder="type a question"
          />
        </FormGroup>
        <FormGroup>
          <Label for="response1">Response 1</Label>
          <Input
            type="text"
            name="response1"
            id="response1"
            placeholder="poll response"
          />
        </FormGroup>
        <FormGroup>
          <Label for="response2">Response 2</Label>
          <Input
            type="text"
            name="response2"
            id="response2"
            placeholder="poll response"
          />
        </FormGroup>
        <FormGroup>
          <Label for="response3">Response 3</Label>
          <Input
            type="text"
            name="response3"
            id="response3"
            placeholder="poll response"
          />
        </FormGroup>
        <FormGroup>
          <Label for="response4">Response 4</Label>
          <Input
            type="text"
            name="response4"
            id="response4"
            placeholder="poll response"
          />
        </FormGroup>
        <Button onClick={reload}>Submit</Button>
      </Form>

      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Success!</ModalHeader>
        <ModalBody>
          {"The following poll has been added:"}
          <br />

          <br />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={reload}>
            Add Another
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AddPoll;
