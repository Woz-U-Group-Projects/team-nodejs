import React, { useEffect, useState } from "react";
import Topic from "../components/Topic";
import { useUser } from "../context/UserContext";
import axios from "axios";
import "./Home.css";

export default function Home() {

  let [data, setData] = useState([""]);
  const [user, setuser] = useUser();

  useEffect(() => {
    getTopics()
    .then(response => {
      setData([...response.data])
    }) 
  }, [])

  function getTopics() {
    let url = "http://localhost:3001/topics"
    return axios.get(url, {})
  }

  return user ? (
    <div className="Home">
      <div className="lander">
        <h1>Chat Bubbles</h1>
        <p className="text-muted">Your new favorite app!</p>
        <p>{user.email}</p>
        <Topic topics={data} />
      </div>
    </div>
  ) : (<div>Sorry</div>);
}
