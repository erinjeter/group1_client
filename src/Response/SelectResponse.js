import React, { useState, useEffect } from 'react';


const SelectResponse = (props) => {
    console.log("in selectresponse");

    const selectResponse = () => {
        if(localStorage.role === "user"){
            fetch(`http://localhost:3000/responses/select/${props.poll.id}`, {
                method: "POST",
                body: JSON.stringify({
                    selection: props.selection,
                }),
                headers: new Headers({
                "Content-Type": "application/json",
                Authorization: props.token,
                }),
            })
            .then((res) => res.json())
            .then((responseData) => {
                console.log(responseData.message);
                // setAlert(true); // turn on alert confirming vote for a poll
                // setMsg(responseData.message);
                
                // setDisplayResultUser(true);
                // console.log("displayResultUser = ",displayResultUser);
            });
        }
    }

    useEffect(() => {
        selectResponse();
      }, []);

    return ( 
        <>
        </>

     );
}
 
export default SelectResponse;








