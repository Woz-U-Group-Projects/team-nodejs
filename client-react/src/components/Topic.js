import React from "react";

export default function Topic(props) {
  return (
    <div>
      {props.topics.map((topic, index) => {
        return (
          <div key={index}>
            <b>{topic.heading}</b>
            <div>{topic.body}</div>
          </div>
        )
      })}
    </div>
  );
}