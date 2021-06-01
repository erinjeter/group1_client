import { useState, useEffect } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
} from "reactstrap";
import BarResult from "../Response/BarResult";

const PollCard = (props) => {
  // const [nbVotes, setNbVotes] = useState("");
  const [msg, setMsg] = useState("");
  const [alert, setAlert] = useState(false);
  const [displayResultUser, setDisplayResultUser] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [disableBtn, setDisableBtn] = useState(false);
  const [resultArray, setResultArray] = useState([]);

  // SELECT RESPONSE FROM POLL //
  const selectResponse = (event) => {
    console.log("click on ", event.target.id);
    // return (<SelectResponse poll={props.poll} selection={event.target.id} token={props.token}/>)
    if (localStorage.role === "user") {
      fetch(`http://localhost:3000/responses/select/${props.poll.id}`, {
        method: "POST",
        body: JSON.stringify({
          selection: event.target.id,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: props.token,
        }),
      })
        .then((res) => res.json())
        .then((responseData) => {
          console.log(responseData.message);
          setAlert(true); // turn on alert confirming vote for a poll
          setMsg(responseData.message);
          setDisableBtn(true); // cannot vote twice
          setDisplayResultUser(true);
          console.log("displayResultUser = ", displayResultUser);
        });
    }
  };

  // turn off alert after 1.5sec
  useEffect(() => {
    const timer = setTimeout(() => setAlert(false), 1500);
    return () => {
      clearTimeout(timer);
      setMsg("");
    };
  }, [alert]);

  // disable selection if admin
  useEffect(() => {
    localStorage.role === "admin" ? setReadOnly(true) : setReadOnly(false);
  }, []);

  // display results in a bar chart
  const seeResults = (event) => {
    console.log("click on ", event.target.id);

    // getVotes
    fetch(`http://localhost:3000/responses/getResult/${props.poll.id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: props.token,
      }),
    })
      .then((res) => res.json())
      .then((responsesData) => {
        console.log(responsesData);
        parseData(responsesData);
      })
      .catch((err) => console.log(err));
  };

  const parseData = (data) => {
    console.log("in parse ");
    setResultArray(data);
  };

  return (
    <>
      <Card key={props.poll.id}>
        <CardBody>
          <Alert color="success" isOpen={alert}>
            {msg}
          </Alert>
          <CardTitle>{props.poll.question}</CardTitle>
          <CardSubtitle></CardSubtitle>
          <Button
            id="response1"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response1}
          </Button>{" "}
          <Button
            id="response2"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response2}
          </Button>{" "}
          <Button
            id="response3"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response3}
          </Button>{" "}
          <Button
            id="response4"
            onClick={selectResponse}
            disabled={readOnly || disableBtn}
          >
            {props.poll.response4}
          </Button>{" "}
        </CardBody>
      </Card>

      {displayResultUser ? (
        <>
          <Button id="result" color="warning" onClick={seeResults}>
            See Results
          </Button>
          {resultArray.length > 0 ? (
            <BarResult
              data={resultArray}
              question={props.poll.question}
              responses={[
                props.poll.response1,
                props.poll.response2,
                props.poll.response3,
                props.poll.response4,
              ]}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default PollCard;
