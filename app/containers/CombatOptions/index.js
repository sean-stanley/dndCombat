/*
 *
 * CombatOptions
 *
 */

import React from 'react';
// import { connect } from 'react-redux';
import Helmet from 'react-helmet';
// import { createStructuredSelector } from 'reselect';
// import makeSelectCombatOptions from './selectors';

import defaultWeapons from './defaultWeapons';

// import CreateCreature from '../../components/CreateCreature';
// import CreatureView from '../../components/CreatureView';

import Hecks from './creatures/players/hecks';
import Monster from './creatures/enemy/hillGiant';

export default class CombatOptions extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      player: Hecks,
      creature: Monster,
      weapons: defaultWeapons,
    };
  }

  // handleCreatureSubmit(creature, target) {
  //   this.setState({
  //     [target]: new Creature(creature),
  //   });
  // }

  render() {
    const { player, creature } = this.state;

    const playerAttacks = player.analyzeAttacks(creature);
    const playerSpells = player.analyzeSpells(creature);
    const creatureAttacks = creature.analyzeAttacks(player);
    const creatureStrategies = creature.analyzeStrategies(player);

    const weaponNames = [...player.weapons].map((w) => w[0].name);

    console.log(weaponNames);

    return (
      <div>
        <Helmet
          title="CombatOptions"
          meta={[
            { name: 'description', content: 'Description of CombatOptions' },
          ]}
        />
        <div className="section">
          <div className="container">
            <div className="columns">
              <div className="player column content">
                <h1 className="title">{player.name}</h1>
                <h2 className="subtitle">Stats</h2>
                <p>HP: {player.hpCurrent} / {player.hpTotal} ({(player.hpCurrent / player.hpTotal) * 100}%)
                AC: {player.getAC()}
                </p>
                <h2>Attacks</h2>
                <ul>
                  {[...player.weapons].map((weapon) =>
                    <li key={weapon[0].name}>
                      {weapon[0].name} +{player.getWeaponAccuracy(weapon[0])} {weapon[0].damageStr}+{weapon[0].noAbilityToDamage ? 0 : player.getWeaponAbility(weapon[0])}
                    </li>
                  )}
                </ul>
                <h2>Spells</h2>
                <ul>
                  {[...player.spells].map((spell) =>
                    <li key={spell[0].name}>
                      {spell[0].name} DC{player.getSpellDC()} {spell[0].damageStr} save for {spell[0].saveDamage * 100}% damage
                    </li>
                  )}
                </ul>
                <h3>Combat Analysis</h3>
                {playerAttacks.map((attack) =>
                  <div key={attack.weaponName}>
                    <p>
                      {attack.weaponName}
                    </p>
                    <ul>
                      <li>Effective Damage Value: {attack.edv}</li>
                      <li>Attacks to victory: {attack.vc}</li>
                    </ul>
                  </div>)}
                <h4>
                  Spell Options:
                </h4>
                {playerSpells.map((spell) =>
                  <div key={spell.spellName}>
                    <p>
                      {spell.spellName}
                    </p>
                    <ul>
                      <li>Effective Damage Value: {spell.edv}</li>
                      <li>Attacks to victory: {spell.vc}</li>
                    </ul>
                  </div>)}
              </div>

              <div className="enemy column content">
                <h1 className="title">{creature.name}</h1>
                <h2 className="subtitle">Stats</h2>
                <p>HP: {creature.hpCurrent} / {creature.hpTotal} ({(creature.hpCurrent / creature.hpTotal) * 100}%)
                AC: {creature.getAC()}
                </p>
                <h2>Attacks</h2>
                <ul>
                  {[...creature.weapons].map((weapon) =>
                    <li key={weapon[0].name}>
                      {weapon[0].name} +{creature.getWeaponAccuracy(weapon[0])} {weapon[0].damageStr}+{weapon[0].noAbilityToDamage ? weapon[0].damageBonus || 0 : creature.getWeaponAbility(weapon[0])}
                    </li>
                  )}
                </ul>
                <h3>Combat Analysis</h3>
                <h4>Strategies</h4>
                {creatureStrategies.map((strategy) =>
                  <div key={strategy.strategyName}>
                    <p>
                      {strategy.strategyName}
                    </p>
                    <ul>
                      <li>Effective Damage Value: {strategy.edv}</li>
                      <li>Attacks to victory: {strategy.vc}</li>
                    </ul>
                  </div>
                )}
                {creatureAttacks.map((attack) =>
                  <div key={attack.weaponName}>
                    <p>
                      {attack.weaponName}
                    </p>
                    <ul>
                      <li>Effective Damage Value: {attack.edv}</li>
                      <li>Attacks to victory: {attack.vc}</li>
                    </ul>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// CombatOptions.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
//
// const mapStateToProps = createStructuredSelector({
//   CombatOptions: makeSelectCombatOptions(),
// });
//
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(CombatOptions);
