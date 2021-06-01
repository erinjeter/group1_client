import { Card, CardBody, CardTitle, Button, CardSubtitle } from "reactstrap";
import EditPoll from "./EditPoll";
import React, { useState } from "react";

const PollCard = (props) => {
  const [modal, setModal] = useState(false);

  const updateOn = () => {
    setModal(true);
  };

  const updateOff = () => {
    setModal(false);
  };

  return (
    <Card key={props.poll.id}>
      <CardBody>
        <CardTitle>{props.poll.question}</CardTitle>
        <CardSubtitle></CardSubtitle>
        <Button>{props.poll.response1}</Button>
        <Button>{props.poll.response2}</Button>
        <Button>{props.poll.response3}</Button>
        <Button>{props.poll.response4}</Button>
        <Button onClick={(e) => updateOn()}>Edit Poll</Button>
        {/* {showModal() ? <EditPoll showModal={updateOff()} /> : null} */}
        {/* <EditPoll /> */}
      </CardBody>
    </Card>
  );
};

export default PollCard;
