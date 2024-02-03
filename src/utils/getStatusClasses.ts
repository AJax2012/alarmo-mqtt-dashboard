import { Status } from '../types';

export const getStatusClasses = (status: Status) => {
  switch (status) {
    case Status.Disarmed:
      return 'border-success text-success';
    case Status.ArmedHome:
    case Status.ArmedNight:
    case Status.ArmedAway:
    case Status.ArmedVacation:
      return 'border-danger text-danger';
    case Status.Triggered:
    case Status.Pending:
      return 'trigger border-danger text-danger';
    default:
      return 'border-warning text-warning';
  }
};
