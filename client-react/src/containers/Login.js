import axios from "axios";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import React, { setState, useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import NotFound from "../containers/NotFound";
import "./Login.css";

export default function Login(props) {
  const history = useHistory();
  const { userHasAuthenticated } = useAppContext();
  const { user, setUser } = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    email: props.user.email || "",
    password: props.user.password || ""
  });

  function validateForm() {
    return fields.email.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    let url = "http://localhost:3001/users/login";
     axios.post(url, { email: fields.email, password: fields.password})
      .then(response => { 
        if (response.data.success && response.data.active) {
        setUser({email: fields.props, password: fields.props})
        userHasAuthenticated(true);
        history.push("/")
      }
      else {
        history.push("/signup")
      }
      })
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <LoaderButton
          block
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}