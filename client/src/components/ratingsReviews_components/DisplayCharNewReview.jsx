import React from 'react';
import {
  Col, Row, Form, Container,
} from 'react-bootstrap';

const DisplayCharNewReview = ({
  characteristic, characteristicObj, submission, setSubmission,
}) => {
  const selected = { characteristic };
  const nameSelected = Object.values(selected)[0];
  const charId = characteristicObj.id;
  const charSelections = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  const showSelected = () => {
    if (submission.characteristics[charId] > 0) {
      const index = submission.characteristics[charId] - 1;
      return (
        <Form.Text className="text-muted">
          {charSelections[nameSelected][index]}
        </Form.Text>
      );
    }
    return (
      <Form.Text className="text-muted">
        None selected
      </Form.Text>
    );
  };

  const selectChar = (eventInput) => {
    setSubmission({
      ...submission,
      characteristics: {
        ...submission.characteristics,
        [charId]: Number(eventInput.target.value),
      },
    });
  };

  return (
    <Form.Group>
      {['radio'].map((type) => (
        <div key={`inline-${type}`} className="CharacteristicsNewReview">
          <Container>
            <Row>
              <Col>
                <div>
                  {characteristic}
                  {showSelected()}
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Check required inline label="1" value="1" name={`${characteristic}`} type={type} id={`inline-${type}-1-${characteristic}`} onClick={(event) => selectChar(event)} />
              </Col>
              <Col>
                <Form.Check required inline label="2" value="2" name={`${characteristic}`} type={type} id={`inline-${type}-2-${characteristic}`} onClick={(event) => selectChar(event)} />
              </Col>
              <Col>
                <Form.Check required inline label="3" value="3" name={`${characteristic}`} type={type} id={`inline-${type}-3-${characteristic}`} onClick={(event) => selectChar(event)} />
              </Col>
              <Col>
                <Form.Check required inline label="4" value="4" name={`${characteristic}`} type={type} id={`inline-${type}-4-${characteristic}`} onClick={(event) => selectChar(event)} />
              </Col>
              <Col>
                <Form.Check required inline label="5" value="5" name={`${characteristic}`} type={type} id={`inline-${type}-5-${characteristic}`} onClick={(event) => selectChar(event)} />
              </Col>
              <Col />

            </Row>
            <Row>
              <Col>
                <Form.Text className="text-muted">
                  {charSelections[nameSelected][0]}
                </Form.Text>
              </Col>
              <Col xs={4}> </Col>
              <Col>
                <Form.Text className="text-muted">
                  {charSelections[nameSelected][4]}
                </Form.Text>
              </Col>
            </Row>
          </Container>

        </div>
      ))}
    </Form.Group>
  );
};

export default DisplayCharNewReview;
