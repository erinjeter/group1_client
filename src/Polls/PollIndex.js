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
import PollDisplay from "./PollDisplay";

const PollIndex = (props) => {
  const [allPolls, setAllPolls] = useState([]);

  const fetchPolls = () => {
    fetch("http://localhost:3000/poll/getAll", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
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
      <PollDisplay allPolls={allPolls} fetchPolls={fetchPolls} />
    </div>
  );
};

export default PollIndex;
