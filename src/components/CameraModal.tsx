import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Camera } from "../types";

type Props = {
  selectedCamera: Camera | undefined;
  toggleCameraClick: (camera?: Camera) => void;
}

const CameraModal = ({ selectedCamera, toggleCameraClick }: Props) => (
  <Modal
    isOpen={!!selectedCamera}
    toggle={() => toggleCameraClick()}
    centered
    fullscreen
    scrollable={false}
  >
    <ModalHeader toggle={() => toggleCameraClick()}>{selectedCamera?.name}</ModalHeader>
    <ModalBody>
      <iframe
        title={selectedCamera?.name}
        src={selectedCamera?.url}
        width="100%"
        height="100%"
        allow="autoplay; fullscreen"
      />
    </ModalBody>
  </Modal>
);

export default CameraModal;
