import React from "react";
import {Link} from "react-router-dom"

export default function Topic(props) {
  return (
    <div>
      {props.topics.map((topic, index) => {
        let topicHeading = ""
        if (topic.heading) {
        topicHeading = topic.heading.replace(/ /g,"_")
        }
        return (
          <div key={index}>
            <Link to = {`/topics/${topicHeading}`}>
              <b>{topic.heading}</b>
            </Link>
            <div>{topic.body}</div>
          </div>
        )
      })}
    </div>
  );
}