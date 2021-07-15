import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OP(props) {
  let [replies, setReplies] = useState([""]);
  let [topic, setTopic] = useState("")
  let topicName = props.match.params.topicName;
  useEffect(() => {
    getTopic()
    .then(response => {
      console.log(response.data)
      setTopic(response.data.topic)
      setReplies([...response.data.replies])
    }) 
  }, [])
  function getTopic() {
    let url = `http://localhost:3001/topics/${topicName}`
    return axios.get(url, {})
  }
  function replyMapper() {
    console.log(replies)
    if (replies.length > 0) {
      return replies.map((reply, i) => {
        return (
          <div key={i}>
          <p><span>{i + 1}. </span>{reply.body}</p>
          </div>
        )})
    } else {
      return (
        <div>There are no replies to this lonely topic. Be the first to create one.</div>
      )
    }
  }
  return (
    <div>
      <b>{topicName}</b>
      <div>
      <b>{topic.body}</b>
      </div>
      {replyMapper()}
    </div>
  );
}