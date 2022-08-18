import React, { useState, useEffect } from "react";
import Axios from "axios";
import { ListGroup, ListGroupItem } from "reactstrap";

const Repos = ({ repos_url }) => {
  const [repos, setRepos] = useState([]);

  const getRepos = async () => {
    const { data } = await Axios.get(repos_url);
    setRepos(data);
  };

  useEffect(() => getRepos(), [repos_url]);

  if (repos.length >= 1) {
    return (
      <>
        <ListGroup
          className="border-2 border-info mb-5"
          style={{ border: "2px solid blue" }}
        >
          <h3 className="text-center text-info my-4">Repositories</h3>
          {repos.map((repo) => (
            <ListGroupItem key={repo.id}>
              <div className="text-primary">{repo.name}</div>
              <div className="text-primary">{repo.language}</div>
              <div className="text-secondary ">{repo.description}</div>
            </ListGroupItem>
          ))}
        </ListGroup>
      </>
    );
  } else {
    return (
      <>
        <h1 className="text-center text-info mb-5">Repositories</h1>
        <h2>No Public Repositories available for this User</h2>
      </>
    );
  }
};

export default Repos;
