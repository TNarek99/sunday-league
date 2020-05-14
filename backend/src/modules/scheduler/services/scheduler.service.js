class SchedulerService {
    async getUserGameCollision(user, game) {
        const gameStartTime = game.date;
        const gameEndTime = game.end;
        return user.getGameCollisionInInterval(gameStartTime, gameEndTime);
    }
}

const schedulerService = new SchedulerService;
export default schedulerService;