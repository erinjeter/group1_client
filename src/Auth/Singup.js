import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/user/create", {
      method: "POST",
      body: JSON.stringify({
        email: email, password: password, role: role ,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.updateToken(data.sessionToken);
      });
  };

  // Sets role through checkboxes
  const onValueChange = (e) => {
    e.target.value === 'isUser' ? setRole("user") : setRole("admin");
    console.log('e.target.value', e.target.value);
}

  return (
    <div>
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
          ></Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
          ></Input>
        </FormGroup>
        <FormGroup >
            <Label htmlFor="role">Role:</Label>
            <FormGroup check>
            <Label check>
                <Input type="radio" name="role" value='isUser' defaultchecked onChange={(e) => onValueChange(e)}/>{' '}
                User
            </Label>
            </FormGroup>
            <FormGroup check>
            <Label check>
                <Input type="radio" name="role" value='isAdmin'  onChange={(e) => onValueChange(e)}/>
                Admin
            </Label>
            </FormGroup>
        </FormGroup>

        
        <Button type="submit">Signup</Button>
      </Form>
    </div>
  );
};

export default Signup;
