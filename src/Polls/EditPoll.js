import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const EditPoll = (props) => {
  const [editQuestion, setEditQuestion] = useState(props.poll.question);
  const [editResponse1, setEditResponse1] = useState(props.poll.response1);
  const [editResponse2, setEditResponse2] = useState(props.poll.response2);
  const [editResponse3, setEditResponse3] = useState(props.poll.response3);
  const [editResponse4, setEditResponse4] = useState(props.poll.response4);

  const pollUpdate = (event) => {
    event.preventDefault();
    fetch(`http://localhost:3000/poll/update/${props.poll.id}`, {
      method: "PUT",
      body: JSON.stringify({
        question: editQuestion,
        response1: editResponse1,
        response2: editResponse2,
        response3: editResponse3,
        response4: editResponse4,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    }).then((res) => {
      console.log(`updated poll with id ${props.id}`);
      props.fetchPolls();
    });
  };

  return (
    <Form onSubmit={pollUpdate}>
      <FormGroup>
        <Label htmlfor="poll">
          Edit Poll:
          <Input
            name="question"
            value={editQuestion}
            onChange={(e) => setEditQuestion(e.target.value)}
          />
          <Input
            name="response1"
            value={editResponse1}
            onChange={(e) => setEditResponse1(e.target.value)}
          />
          <Input
            name="question"
            value={editResponse2}
            onChange={(e) => setEditResponse2(e.target.value)}
          />
          <Input
            name="question"
            value={editResponse3}
            onChange={(e) => setEditResponse3(e.target.value)}
          />
          <Input
            name="question"
            value={editResponse4}
            onChange={(e) => setEditResponse4(e.target.value)}
          />
        </Label>
      </FormGroup>
    </Form>
  );
};

export default EditPoll;
