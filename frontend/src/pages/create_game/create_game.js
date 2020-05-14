import React, { useCallback, useContext } from 'react';
import useCreateGameForm from './create_game_form';
import InputWithLabel from '../../components/input_with_label/input_with_label';
import GameContext from '../../contexts/game/game_context';
import { GAME_TYPE_CLOSED, GAME_TYPE_PRIVATE, GAME_TYPE_OPEN } from '../../common/constants/games';

import './styles.css';

const CreateGame = () => {
  const { createGame } = useContext(GameContext);

  const submitCreateGame = useCallback((gameInput) => {
    createGame({ game: { ...gameInput, teamCapacity: Number(gameInput.teamCapacity) } });
  }, [createGame]);

  const form = useCreateGameForm(submitCreateGame);

  return (
    <div className="create-game-form">
      <form onSubmit={form.handleSubmit}>
        <InputWithLabel
          onChange={form.handleChange}
          name="location"
          label="Location"
          showError={form.touched.location}
          error={form.errors.location}
          value={form.values.location}
        />
        <InputWithLabel
          onChange={form.handleChange}
          name="date"
          label="Date"
          showError={form.touched.date}
          error={form.errors.date}
          value={form.values.date}
        />
        <InputWithLabel
          onChange={form.handleChange}
          name="teamCapacity"
          label="Team Capacity"
          showError={form.touched.teamCapacity}
          error={form.errors.teamCapacity}
          value={form.values.teamCapacity}
        />
        <label htmlFor="type">Type</label>
        <select name="type" onChange={form.handleChange} value={form.values.type}>
          <option value={GAME_TYPE_OPEN}>Open</option>
          <option value={GAME_TYPE_PRIVATE}>Private</option>
          <option value={GAME_TYPE_CLOSED}>Closed</option>
        </select>
        {form.touched.type && form.errors.type ? (
          <div>{form.errors.type}</div>
        ) : null}
        <input type="submit" onClick={form.handleSubmit} />
      </form>
    </div>
  );
};

export default CreateGame;