
import { fromJS } from 'immutable';
import encounterReducer from '../reducer';

describe('encounterReducer', () => {
  it('returns the initial state', () => {
    expect(encounterReducer(undefined, {})).toEqual(fromJS({}));
  });
});
