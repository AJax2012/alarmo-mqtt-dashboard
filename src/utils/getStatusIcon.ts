import type { IconType } from 'react-icons';
import {
  FaExclamation,
  FaHouseLock,
  FaLockOpen,
  FaPersonWalkingArrowRight,
  FaPlaneLock,
  FaQuestion,
} from 'react-icons/fa6';
import { GiNightSleep } from 'react-icons/gi';

import { Status } from '../types';

export const getStatusIcon = (status: Status): IconType => {
  switch (status) {
    case Status.Disarmed:
      return FaLockOpen;
    case Status.ArmedHome:
      return FaHouseLock;
    case Status.ArmedAway:
      return FaPersonWalkingArrowRight;
    case Status.ArmedVacation:
      return FaPlaneLock;
    case Status.ArmedNight:
      return GiNightSleep;
    case Status.Arming:
    case Status.Pending:
    case Status.Triggered:
      return FaExclamation;
    default:
      return FaQuestion;
  }
};
