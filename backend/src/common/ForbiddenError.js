import CustomError from './CustomError';
import { CODE_FORBIDDEN } from './constants';

class ForbiddenError extends CustomError {
  constructor(message) {
    super(CODE_FORBIDDEN, message);
  }
}

export default ForbiddenError;
