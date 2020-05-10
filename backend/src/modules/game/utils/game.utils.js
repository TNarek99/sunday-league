import { STATUS_FINISHED, STATUS_STARTED, STATUS_PENDING } from '../constants';

export const calculateConsecutiveMatchStatus = (matchStatus) => {
  if (matchStatus === STATUS_PENDING) {
    return STATUS_STARTED;
  }
  if (matchStatus === STATUS_STARTED) {
    return STATUS_FINISHED;
  }
};
