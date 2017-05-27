import { createSelector } from 'reselect';

/**
 * Direct selector to the encounter state domain
 */
const selectEncounterDomain = () => (state) => state.get('encounter');

/**
 * Other specific selectors
 */


/**
 * Default selector used by Encounter
 */

const makeSelectEncounter = () => createSelector(
  selectEncounterDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEncounter;
export {
  selectEncounterDomain,
};
