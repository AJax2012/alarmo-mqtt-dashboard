import { Button } from "reactstrap";
import { Camera } from "../types";
import { BsCameraVideoFill } from "react-icons/bs";

type Props = {
  camera: Camera;
  onClick: (camera: Camera) => void;
}

const CameraButton = ({ camera, onClick }: Props) => (
  <Button outline size="lg" className="me-3" onClick={() => onClick(camera)}><BsCameraVideoFill /><span className="ms-2">{camera.name}</span></Button>
);

export default CameraButton;