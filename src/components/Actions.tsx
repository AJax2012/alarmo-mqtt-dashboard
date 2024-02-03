import { Button, Col, FormFeedback, FormGroup, Input, Label, Row } from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import { Command, Status } from '../types';
import * as yup from 'yup';

type Props = {
  mode: Status;
  handleAction: (command: Command, code?: string) => void;
};

const schema = yup.object().shape({
  passcode: yup.string().required('Passcode is required'),
});

const Actions = ({ mode, handleAction }: Props) => (
  mode === Status.Disarmed ? (
    <Row className="d-flex justify-content-around row-cols-2 gy-3">
      <Col>
        <Button block size="lg" outline onClick={() => handleAction(Command.ArmHome)}>
          Home
        </Button>
      </Col>
      <Col>
        <Button block size="lg" outline onClick={() => handleAction(Command.ArmAway)}>
          Away
        </Button>
      </Col>
      <Col>
        <Button block size="lg" outline onClick={() => handleAction(Command.ArmNight)}>
          Night
        </Button>
      </Col>
      <Col>
        <Button block size="lg" outline onClick={() => handleAction(Command.ArmVacation)}>
          Vacation
        </Button>
      </Col>
    </Row>
  ) : (
    <Formik
      initialValues={{ passcode: '' }}
      validationSchema={schema}
      onSubmit={({ passcode }) =>
        handleAction(Command.Disarm, passcode)
      }
    >
      {({ errors, touched }) => (
        <Form>
          <FormGroup>
            <Input
              tag={Field}
              autoFocus
              name="passcode"
              placeholder="Passcode"
              type="password"
              className="text-center fw-bold fs-1"
              invalid={Boolean(errors.passcode && touched.passcode)}
            />
            <Label hidden for="passcodeInput">
              Passcode
            </Label>
            <FormFeedback>{errors.passcode}</FormFeedback>
          </FormGroup>
          <Button color="danger" block type="submit" className="border-1 border-white">
            Disarm
          </Button>
        </Form>
      )}
    </Formik>
  )
);

export default Actions;
