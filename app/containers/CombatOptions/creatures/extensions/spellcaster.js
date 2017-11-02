import Creature from '../creature';

export default class Spellcaster extends Creature {
  constructor(args) {
    super(args);
    if (args) {
      this.spellcastingAbility = args.spellcastingAbility || 'int';
    }
    this.spells = []; // only for things with saving throws
  }

  equipSpells(...spell) {
    this.spells.push(...spell);
    return this.spells;
  }

  getSpellDC(bonus = 0) {
    return 8 + this[this.spellcastingAbility] + this.proficiency + bonus;
  }

  setConcentration(bool) {
    this.isConcentrating = bool;
  }

  // chanceOfConcentrationBeingBroken(threatAnalysis) {
  //   const chanceOfLosingPerStrategy = [];
  //   threatAnalysis.forEach((strategy) => {
  //     // does the strategy have a chance to land multiple hits?
  //     // does a hit impose a condition that auto ends concentration like stunned or incapacitated
  //     // what would the save DC be per hit.
  //     const saveDC = Math.max(10, Math.round(strategy.damage))
  //     chanceOfLosingPerStrategy.push({
  //       strategyName: strategy.name
  //       probability: 1 - savePassProbability(saveDC)
  //     })
  //   })
  // }

  setSpellcastingAbility(ability) {
    // add error checking;
    this.spellcastingAbility = this[ability];
    return this.spellcastingAbility;
  }

  getSpellSaveProb(targetSave, options) {
    const percentPass = this.getD20Probability(this.getSpellDC(), targetSave, options);
    const percentFail = 1 - percentPass;
    return percentFail;
  }

  getEffectiveSpellDamageValue(targetSave, spell, options = { damageBonus: 0 }) {
    const failSave = this.getSpellSaveProb(targetSave, options) * this.getAverageDamage(spell, options.damageBonus || 0);

    const passSave = (1 - this.getSpellSaveProb(targetSave, options)) * this.getAverageDamage(spell, options.damageBonus || 0) * spell.saveDamage;
    console.log(failSave);
    console.log(passSave);
    return failSave + passSave;
  }

  getSpellVictoryCount(targetCurrentHP, targetSave, spell, options = { damageBonus: 0 }) {
    const eDV = this.getEffectiveSpellDamageValue(targetSave, spell, options);
    return Math.ceil(targetCurrentHP / eDV); // round up to nearest whole round.
  }

  analyzeSpells(target = { hpCurrent: 100, totalAC: 15, savingThrow: 7 }) {
    if (this.spells.length > 0) {
      const results = [];
      this.spells.forEach((spell) => {
        if (Array.isArray(spell)) {
          spell = spell[0]; // eslint-disable-line no-param-reassign
        }
        const saveBonus = target.savingThrow || target.getSave(spell.saveAbility);
        const edv = this.getEffectiveSpellDamageValue(saveBonus, spell);
        const vc = this.getSpellVictoryCount(target.hpCurrent, saveBonus, spell);

        const edvAdvantage = this.getEffectiveSpellDamageValue(saveBonus, spell, { advantage: 1 });
        const vcAdvantage = this.getSpellVictoryCount(target.hpCurrent, saveBonus, spell, { advantage: 1 });

        const edvDisadvantage = this.getEffectiveSpellDamageValue(saveBonus, spell, { disadvantage: 1 });
        const vcDisadvantage = this.getSpellVictoryCount(target.hpCurrent, saveBonus, spell, { disadvantage: 1 });

        console.log(`
          --------------------------------------
          Analysis of ${spell.name} (DC ${this.getSpellDC()}):
          Target Spell Save ${target.savingThrow}, HP: ${target.hpCurrent}
          Effective Damage Value: ${edv}
          Victory would take  ${vc} castings

          ## With Advantage on the save
          - Effective Damage Value: ${edvAdvantage}
          - Victory would take ${vcAdvantage} castings

          ## With Disadvantage on the save
          - Effective Damage Value: ${edvDisadvantage}
          - Victory would take ${vcDisadvantage} castings
          ---------------------------------------

        `);
        results.push({
          spellName: spell.name,
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
