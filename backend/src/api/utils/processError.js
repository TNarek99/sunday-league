import { UserInputError, ForbiddenError, ApolloError } from 'apollo-server';
import {
  CODE_INTERNAL_ERROR,
  CODE_BAD_INPUT,
  CODE_FORBIDDEN,
  CODE_NOT_FOUND,
  MESSAGE_INTERNAL_SERVER_ERROR,
} from '../../common/constants';

function processError(apolloError) {
  const customError = apolloError.extensions.exception;
  if (customError.code === CODE_BAD_INPUT) {
    return new UserInputError(customError.customMessage, customError.payload);
  }
  if (customError.code === CODE_FORBIDDEN) {
    return new ForbiddenError(customError.customMessage);
  }
  if (customError.code === CODE_NOT_FOUND) {
    return new ApolloError(customError.customMessage, customError.code, customError.payload);
  }
  return new ApolloError(MESSAGE_INTERNAL_SERVER_ERROR, CODE_INTERNAL_ERROR);
}

export default processError;
