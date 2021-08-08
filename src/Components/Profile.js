import React, { useState } from "react";
import Repo from "../Components/Repo";
import {
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const [githubData, setGithubData] = useState({});
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const onchangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsVisible(true);
    setUsername("");

    const profile = await fetch(`https://api.github.com/users/${username}`);
    const profileJson = await profile.json();

    const repository = await fetch(profileJson.repos_url);
    const repositoriesJson = await repository.json();

    if (profileJson) {
      setGithubData(profileJson);
      setRepositories(repositoriesJson);
    }
  };

  return (
    <div className=" mt-5">
      <Container>
        <Row className="justify-content-md-center bg-light">
          <Col xs lg="8">
            <InputGroup onChange={onchangeHandler} className="mb-3 mt-5">
              <FormControl placeholder="type username" value={username} />
              <InputGroup.Append>
                <Button type="submit" onClick={submitHandler} variant="primary">
                  Search
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>

        <Row xs={1} lg={2} className=" bg-light" style={{ visibility: isVisible ? "visible" : "hidden" }}>
          <Col>
            <Card className=" text-center mx-auto my-2 " style={{ width: "25rem" }}>
              <Card.Link href={githubData.html_url} target="_blank" rel="noreferrer">
                <Card.Img variant="top" src={githubData.avatar_url} className="border rounded-circle mx-auto mt-3" style={{ width: "15rem", height: "15rem" }}/>
              </Card.Link>
              <Card.Body>
                <Card.Title className="font-weight-bold ">Username</Card.Title>
                <Card.Text className="text-dark">
                  <Card.Link style={{color: "black", fontSize: "2rem", textDecoration: "underline"}} href={githubData.html_url} target="_blank" rel="noreferrer">
                    {githubData.login}
                  </Card.Link>
                </Card.Text>
              </Card.Body>

              <Card.Body>
                <Card.Subtitle className="font-weight-bold">
                  Real Name
                </Card.Subtitle>
                <Card.Text>{githubData.name}</Card.Text>
              </Card.Body>

              <Card.Body>
                <Card.Subtitle className="font-weight-bold">
                  Location
                </Card.Subtitle>
                <Card.Text>{githubData.location}</Card.Text>
              </Card.Body>

              <Card.Body>
                <Card.Subtitle className="font-weight-bold">
                  Number of public repositories
                </Card.Subtitle>
                <Card.Text>{githubData.public_repos}</Card.Text>
              </Card.Body>

              <Card.Body>
                <Card.Subtitle className="font-weight-bold">
                  Number of followers
                </Card.Subtitle>
                <Card.Text>{githubData.following}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Repo repositories={repositories} isVisible={isVisible} />
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
