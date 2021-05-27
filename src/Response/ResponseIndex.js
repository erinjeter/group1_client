import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Container, Row, Col } from "reactstrap";
import PollDisplay from "../Polls/PollDisplay";

const ResponseDisplay = (props) => {
  const [responses, setResponses] = useState([]);

  const fetchResponses = () => {
    fetch("http://localhost/3000/responses/getAllResp/:poll_id", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token
          ? props.token
          : localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((responsesData) => {
        setResponses(responsesData);
        console.log(props.token);
      });
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  const NoResponses = () => {
    return (
      <div className="noResponses">
        <h1>No Responses to display</h1>
        <p></p>
      </div>
    );
  };

  const HasResponses = () => {
    return (
      <div className="responsesContainer">
        <h1>Responses</h1>
        <PollDisplay
          responses={responses}
          fetchResponses={fetchResponses}
          token={props.token}
        />
      </div>
    );
  };

  return (
    <div className="main">
      <Pie data={PollDisplay} />
      {responses.length === 0 ? <NoResponses /> : <HasResponses />}
    </div>
  );
};

export default ResponseDisplay;
