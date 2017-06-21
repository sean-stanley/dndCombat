import { createSelector } from 'reselect';

/**
 * Direct selector to the combatOptions state domain
 */
const selectCombatOptionsDomain = () => (state) => state.get('combatOptions');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CombatOptions
 */

const makeSelectCombatOptions = () => createSelector(
  selectCombatOptionsDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCombatOptions;
export {
  selectCombatOptionsDomain,
};
