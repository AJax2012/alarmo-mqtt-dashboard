import { Badge, Card, CardBody, CardHeader } from "reactstrap";
import { Sensor } from "../types";

type Props = {
  sensors?: Sensor[];
}

const FailedSensors = ({ sensors = [] }: Props) => {
  return (
    sensors.length > 0 && (
      <Card outline color="danger" className="my-3">
        <CardHeader tag="h3" className="bg-danger text-white">
          Failed Sensors
        </CardHeader>
        <CardBody>
          {sensors.map((sensor) => (
            <Badge color="danger" key={sensor.entity_id} pill className="me-2 fs-5">
              {sensor.name}
            </Badge>
          ))}
        </CardBody>
      </Card>
    )
  );
}

export default FailedSensors;