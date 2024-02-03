import { Status } from '../types/Status';

export const isArmed = (status: Status) => status.startsWith('Armed');
