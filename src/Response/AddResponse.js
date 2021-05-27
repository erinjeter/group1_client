import React, { Component } from "react";
import Responses from "./ResponseIndex";

const SelectResponse = (props) => {
  const [pollId, setPollId] = useState("");
  const [pollSelection, setPollSelection] = useState("");
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/responses/select/poll_id", {
      method: "POST",
      body: JSON.stringify({
        responses: {
          pollId: pollId,
          pollSelection: pollSelection,
          userId: userId,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        setPollId("");
        setPollSelection("");
        setUserId("");
        console.log(responseData);
      });
  };

  return <div></div>;
};
export default SelectResponse;
