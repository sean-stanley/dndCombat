import Creature from '../creature';

export default class Monster extends Creature {
  constructor() {
    super();
    this.strategies = [];
  }

  setMultiAttack(weapons, options = {}) {
    if (Array.isArray(weapons) && weapons.length > 1) {
      this.strategies.push({
        name: 'multiAttack',
        weapons,
        options,
        action: 'standard',
        numberOfAttacks: weapons.length,
      });
      return this.strategies;
    } return undefined;
  }

  multiAttack(strategy, targetAC, options = {}) {
    const mergedOptions = Object.assign({}, strategy.options, options);
    return strategy.weapons.reduce((total, weapon) =>
      total + this.getEffectiveDamageValue(targetAC, weapon, mergedOptions)
    , 0);
  }

  multiAttackDamage(strategy, damageOptions = {}) {
    return strategy.weapons.reduce((total, weapon) => total + this.getAverageDamage(weapon, damageOptions));
  }

  pureStrategyVictoryCount(targetCurrentHP, targetAC, strategy, options = { attackBonus: 0, damageBonus: 0 }) {
    const eDV = this[strategy.name](strategy, targetAC, options);
    return Math.ceil(targetCurrentHP / eDV);
  }

  analyzeStrategies(target = { hpCurrent: 100, getAC() { return 15; }, savingThrow: 3 }) {
    if (this.strategies.length > 0) {
      const results = [];
      this.strategies.forEach((strategy) => {
        // const damage = this.
        const edv = this[strategy.name](strategy, target.getAC());
        const vc = this.pureStrategyVictoryCount(target.hpCurrent, target.getAC(), strategy);

        const edvAdvantage = this[strategy.name](strategy, target.getAC(), { advantage: 1 });
        const edvDisadvantage = this[strategy.name](strategy, target.getAC(), { disadvantage: 1 });

        const vcAdvantage = this.pureStrategyVictoryCount(target.hpCurrent, target.getAC(), strategy, { advantage: 1 });
        const vcDisadvantage = this.pureStrategyVictoryCount(target.hpCurrent, target.getAC(), strategy, { disadvantage: 1 });

        console.log(`
          --------------------------------------
          # Analysis of ${strategy.name}:
          Target AC ${target.getAC()}, HP: ${target.hpCurrent}
          - Effective Damage Value: ${edv}
          - Victory would take  ${vc} turns

          ## With Advantage
          - Effective Damage Value: ${edvAdvantage}
          - Victory would take ${vcAdvantage} turns

          ## With Disadvantage
          - Effective Damage Value: ${edvDisadvantage}
          - Victory would take ${vcDisadvantage} turns
          ---------------------------------------
        `);
        results.push({
          strategyName: strategy.name,
          edv,
          vc,
          edvAdvantage,
          vcAdvantage,
          edvDisadvantage,
          vcDisadvantage,
        });
      });
      results.sort((a, b) => b.edv - a.edv);
      console.log(results);
      return results;
    }
    return null;
  }
}
