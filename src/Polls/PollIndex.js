import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Button,
  Form,
  FormGroup,
  Input,
  CardColumns,
} from "reactstrap";
import DisplayResponse from "../Response/DisplayResponse";
import PollDisplay from "./PollDisplay";

const PollIndex = (props) => {
  const [allPolls, setAllPolls] = useState([]);
  const [modal, setModal] = useState(false);

  const fetchPolls = () => {
    fetch("http://localhost:3000/poll/getAll", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setAllPolls(json);
        console.log(json);
      });
  };

  useEffect(() => {
    fetchPolls();
  }, []);

  return (
    <div>
      <Button color="warning">See Poll Results</Button>
      <PollDisplay
        allPolls={allPolls}
        token={props.token}
        fetchPolls={fetchPolls}
      />
    </div>
  );
};

export default PollIndex;
