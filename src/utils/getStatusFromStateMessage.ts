import { StateMessage, Status } from '../types';

export const getStatusFromStateMessage = (message: StateMessage): Status => {
  switch (message.toLocaleLowerCase()) {
    case 'disarmed':
      return Status.Disarmed;
    case 'arming':
      return Status.Arming;
    case 'armed_away':
      return Status.ArmedAway;
    case 'armed_home':
      return Status.ArmedHome;
    case 'armed_vacation':
      return Status.ArmedVacation;
    case 'armed_night':
      return Status.ArmedNight;
    case 'pending':
      return Status.Pending;
    case 'triggered':
      return Status.Triggered;
    default:
      return Status.Unknown;
  }
};
