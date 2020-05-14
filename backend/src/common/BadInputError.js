import CustomError from './CustomError';
import { CODE_BAD_INPUT } from './constants';

class BadInputError extends CustomError {
  constructor(message, payload) {
    super(CODE_BAD_INPUT, message);
    this.payload = payload;
  }
}

export default BadInputError;
