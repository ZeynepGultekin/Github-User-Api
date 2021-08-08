import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

function Repositories() {
  const [repoArray, setRepoArray] = useState([]);

  useEffect(() => {
    const url =
      "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&page=1";
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setRepoArray(data.items);
      });
  }, []);

  return (
    <div className="container">
      <Row xs={1} sm={3} md={4} xl={5} className="g-4 align-items-center justify-content-md-center">
        {repoArray.map((item, key) => { return (
          <Col key={key} className="m-3">
            <Card style={{ "width":"250px", "height":"500px"}}>
              <Card.Img variant="top" src={item.owner.avatar_url} />
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">{item.owner.login}</Card.Subtitle>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <Card.Text className="text-right" style={{"fontSize":"12px"}}>
                  {item.watchers}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )
        })}
      </Row>
    </div>
  );
}

export default Repositories;
