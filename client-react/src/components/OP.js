import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoaderButton from "./LoaderButton";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib";
import axios from "axios";
import "./OP.css"

export default function OP(props) {
  const [replies, setReplies] = useState([""]);
  const [topic, setTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    body: ""
  });
  const history = useHistory();
  let topicName = props.match.params.topicName;

  useEffect(() => {
    getTopic()
    .then(response => {
      console.log(response.data)
      setTopic(response.data.topic[0])
      setReplies([...response.data.topic[0].replies])
    }) 
  }, [setTopic]);

  function getTopic() {
    let url = `http://localhost:3001/topics/${topicName}`
    return axios.get(url, {})
  };

  function replyMapper() {
    if (replies.length > 0) {
      return replies.map((reply, i) => {
        let divId = `form-${i + 1}`
        if (reply.user) {
          return (
            <div>
            <div className="replies" key={i} onClick={() => toggleForm(divId)}>
              <p><span><i>{reply.user.email}</i>. </span>{reply.body}</p>
              </div>
              <div className="no-render-form" id={divId}>
                {renderForm(reply)}
              </div>
            </div>
          )
        }
      })
    } else {
      return (
        <div>There are no replies to this lonely topic. Be the first to create one.</div>
      )
    }
  };

  function toggleForm(divId) {
    let element = document.getElementById(divId);
    console.log(element.className)
    if (element.className === 'no-render-form') {
      element.className = 'render-form'
    } else {
      element.className = 'no-render-form'
    }
  }

  async function handleReplySubmit(event) {
    event.preventDefault();
    let nodeList = event.target.querySelectorAll("input");
    let bodyParams = {};
    console.log(event)
    nodeList.forEach(selector => {
        bodyParams[selector.id] = selector.value
    })
    setIsLoading(true);
    let url = "http://localhost:3001/topics/createreply";
    axios.post(url, bodyParams)
    .then(response => { 
      if (response.data.success) {
      setIsLoading(false);
      history.go(0);
      }
      else {
        history.push("/signup")
      }
    });    
  }

  function validateForm() {
    return fields.body.length > 0
  }

  function renderForm(reply) {
    return (
      <Form onSubmit={handleReplySubmit}>
        <Form.Group controlId="body" size="lg">
          <Form.Control
            autoFocus
            type="text"
            value={fields.body}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group controlId="email" size="lg">
          <Form.Control 
            type="hidden" 
            value={reply.user.email}
          />
        </Form.Group>
        <Form.Group controlId="password" size="lg">
          <Form.Control 
            type="hidden" 
            value={reply.user.password}
          />
        </Form.Group>
        <Form.Group controlId="topicId" size="lg">
          <Form.Control 
            type="hidden" 
            value={reply.topicId}
          />
        </Form.Group>
        <Form.Group controlId="replyId" size="lg">
          <Form.Control 
            type="hidden" 
            value={reply.replyId}
          />
        </Form.Group>
        <LoaderButton
          block
          size="sm"
          type="submit"
          variant="success"
          isLoading={isLoading}
          disabled={!validateForm()}
          >
          Submit
        </LoaderButton>
      </Form>
      
    )
  }
  return (
    <div className="container">
      <b>{topicName}</b>
      <div>
      <b>{topic.body}</b>
      </div>
      {replyMapper()}
    </div>
  );
}