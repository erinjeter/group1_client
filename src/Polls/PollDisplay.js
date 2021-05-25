import { useEffect, useState } from "react";
import { CardColumns, Card } from "reactstrap";
import PollCard from "./PollCard";

const PollDisplay = (props) => {
  const [poll, setPoll] = useState([]);

  return (
    <div>
      <CardColumns>
        {props.allPolls.map((poll) => (
          <PollCard poll={props.poll} fetchPolls={props.fetchPolls} />
        ))}
      </CardColumns>
    </div>
  );
};

export default PollDisplay;
