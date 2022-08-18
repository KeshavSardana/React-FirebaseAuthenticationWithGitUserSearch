import React from "react";
import Axios from "axios";
import { Card, CardBody, CardTitle } from "reactstrap";

const ProfileCard = ({ profile }) => {
  return (
    <Card className="text-center border-2 border-info">
      <CardBody className="text-center">
        <img
          src={profile.avatar_url}
          className="img-thumbnail rounded-circle border-2 border-info"
          style={{ marginTop: "-60px" }}
          height="300px"
          width="300px"
        />
        <CardTitle className="text-primary">
          <h2 className="mt-3">{profile.login}</h2>
        </CardTitle>
        <div className="mt-1">{profile.location}</div>
        <div className="mt-1">
          <h6>Available for Hiring : {profile.hireable ? "Yes" : "Nope"}</h6>
        </div>
        <div className="">{profile.bio ? profile.bio : ""}</div>
      </CardBody>
    </Card>
  );
};

export default ProfileCard;
