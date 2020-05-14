import CustomError from './CustomError';
import { CODE_NOT_FOUND } from './constants';

class NotFoundError extends CustomError {
  constructor(message) {
    super(CODE_NOT_FOUND, message);
  }
}

export default NotFoundError;
