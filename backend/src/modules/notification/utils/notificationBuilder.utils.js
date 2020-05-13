export const userToNotificationDataForMessage = (message) => (user) => ({ userId: user.id, message });

export const generateGameMatchStatusUpdatedMessage = (game) => `Match status for game ${game.id} changed to ${game.matchStatus}`;
