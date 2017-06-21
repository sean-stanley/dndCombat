
import { fromJS } from 'immutable';
import combatOptionsReducer from '../reducer';

describe('combatOptionsReducer', () => {
  it('returns the initial state', () => {
    expect(combatOptionsReducer(undefined, {})).toEqual(fromJS({}));
  });
});
