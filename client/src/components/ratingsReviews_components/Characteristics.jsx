import React from 'react';
import {
  ProgressBar, Container, Row, Col, Form,
} from 'react-bootstrap';


const Characteristics = (props) => {
  const { characteristic, objValue } = props;
  const now = (objValue[characteristic].value / 5) * 100;

  const charSelections = {
    Size: ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'],
    Width: ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'],
    Comfort: ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'],
    Quality: ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'],
    Length: ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'],
    Fit: ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'],
  };

  return (
    <Container className="characteristic-entry">
      <Row>
        <div className="characteristic-left">
          {characteristic}
        </div>
      </Row>
      <Row>
        <div className="characteristic-right">
          {' '}
          <ProgressBar variant="success" now={now} />
        </div>
      </Row>
      <Row>
        <Col>
          <Form.Text className="text-muted">
            {charSelections[characteristic][0]}
          </Form.Text>
        </Col>
        <Col>
          <Form.Text className="text-muted">
            {charSelections[characteristic][2]}
          </Form.Text>
        </Col>
        <Col>
          <Form.Text className="text-muted">
            {charSelections[characteristic][4]}
          </Form.Text>
        </Col>
      </Row>
    </Container>
  );
};
export default Characteristics;
