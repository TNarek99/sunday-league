import ForbiddenError from '../../../common/ForbiddenError';
import { MESSAGE_FORBIDDEN } from '../../../common/constants';

export function authorizeUpdateUser(currentUser, queryArgs) {
    if (currentUser.id !== queryArgs.id) {
        throw new ForbiddenError(MESSAGE_FORBIDDEN);
    }
}
