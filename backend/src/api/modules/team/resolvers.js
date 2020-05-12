import teamService from '../../../modules/team/services/team.service';
import playerService from '../../../modules/team/services/player.service';

export async function teamPlayersResolver(team) {
  return teamService.getPlayersById(team.id);
}

export async function playerUserResolver(player) {
  return playerService.getUserById(player.id);
}
