export type MqttMessage = {
  topic: string;
  message: string;
};

export type StateMessage =
  | 'disarmed'
  | 'armed_home'
  | 'armed_away'
  | 'armed_night'
  | 'armed_vacation'
  | 'pending'
  | 'triggered'
  | 'arming';

export type Sensor = {
  name: string;
  entity_id: string;
};

export type EventMessage = {
  event: string;
  delay: number;
  sensors?: Sensor[];
};
