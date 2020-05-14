import moment from 'moment';

export const userToNotificationDataForMessage = (message) =>
  (user) => ({ userId: user.id, message });

export const generateGameMatchStatusUpdatedMessage = (game) =>
  `Match status for game ${game.id} changed to ${game.matchStatus}`;

export const generateGameDateChangedMessage = (game) =>
  `Match date for game ${game.id} changed to ${moment(game.date).format('LLLL')}`;

export const generateInvitationMessage = (game) =>
  `You have been invited to game ${game.id} at ${moment(game.date).format('LLLL')}`;
