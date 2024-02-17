import { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { Container, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { MqttClient } from 'mqtt';
import { Actions, CameraButton, CameraModal, FailedSensors, Status } from './components';
import {
  Status as StatusType,
  MqttMessage,
  EventMessage,
  StateMessage,
  Sensor,
  Command,
  Camera,
} from './types';
import { getMqttClient, getStatusFromStateMessage } from './utils';

// const testStatus = StatusType.Unknown;

function App() {
  const cameras: Camera[] = JSON.parse(import.meta.env.VITE_CAMERAS);
  const [client, setClient] = useState<MqttClient>();
  const [status, setStatus] = useState(StatusType.Unknown);
  const [delay, setDelay] = useState(0);
  const [openSensors, setOpenSensors] = useState<Sensor[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<Camera | undefined>();

  useEffect(() => {
    const client = getMqttClient();
    setClient(client);
  }, []);

  const triggered = useMemo(() => [StatusType.Triggered, StatusType.Pending].includes(status), [status]);

  const publishStatusUpdate = (command: Command, code?: string) => {
    const message = code ? JSON.stringify({ command: command.toString(), code }) : command.toString();
    if (client) {
      client.publish("alarmo/command", message, { qos: 1, retain: true });
    }
  };

  const handleEventMessage = (message: EventMessage) => {
    switch (message.event) {
      case 'TRIGGER':
        setDelay(message.delay);
        break;
      case 'ARM_AWAY':
        setDelay(message.delay);
        break;
      case 'FAILED_TO_ARM':
        toast.error(
          'Failed to arm, please check the locations listed below and try again',
          { toastId: 'failed-to-arm' }
        );
        setOpenSensors(message.sensors || []);
        break;
      case 'NO_CODE_PROVIDED':
      case 'INVALID_CODE_PROVIDED':
        toast.error('Invalid code provided, please try again');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (client) {
      client.on('connect', () => {
        toast.success('Connected to Home Assistant!', { toastId: 'mqtt-connected' });
        client.subscribe(import.meta.env.VITE_EVENT_TOPIC);
        client.subscribe(import.meta.env.VITE_STATE_TOPIC);
      });
      client.on('error', (err) => {
        console.error('Connection error: ', err);
        toast.error('Failed to connect to Home Assistant', { toastId: 'mqtt-error' });
        client.end();
      });
      client.on('reconnect', () => {
        toast.warn('Reconnecting to Home Assistant...');
      });
      client.on('message', (topic: string, message: Buffer) => {
        const payload: MqttMessage = {
          topic,
          message: message.toString(),
        };

        if (topic === import.meta.env.VITE_STATE_TOPIC) {
          const status = getStatusFromStateMessage(payload.message as StateMessage);
          setStatus(status);

          if (![StatusType.Pending, StatusType.Arming].includes(status)) {
            setOpenSensors([]);
            setDelay(0);
          }
        }

        if (topic === import.meta.env.VITE_EVENT_TOPIC) {
          handleEventMessage(JSON.parse(payload.message) as EventMessage);
        }
      });
    }
  }, [client]);

  const toggleCameraClick = (camera?: Camera) => {
    setSelectedCamera(camera);
  }

  return (
    <Container className={cn({ trigger: triggered })}>
      {status === StatusType.Unknown ? <Spinner /> : (
        <>
          <Status mode={status} secondsRemaining={delay} />
          <Actions mode={status} handleAction={publishStatusUpdate} />
          <FailedSensors sensors={openSensors} />
          {cameras?.length > 0 &&
            <div id="cameraButtonWrapper" className="position-absolute bottom-0 start-50 translate-middle-x mb-3">
              {(cameras || []).map((camera: Camera) => (
                <CameraButton key={camera.name} camera={camera} onClick={toggleCameraClick} />
              ))}
            </div>
          }
          <CameraModal selectedCamera={selectedCamera} toggleCameraClick={toggleCameraClick} />
        </>
      )}
    </Container>
  );
}

export default App;
