export default class Creature {
  constructor() {
    // ability scores
    this.str = 0;
    this.dex = 0;
    this.con = 0;
    this.int = 0;
    this.wis = 0;
    this.cha = 0;

    // proficiency score
    this.proficiency = 2;

    // armor class
    this.baseAC = 10;
    this.armor = 0;
    // use dex with AC
    this.dexOnAC = true;
    // total AC
    this.totalAC = 10 + this.armor + (this.dexOnAC ? this.dex : 0);

    // default hit dice
    this.hpTotal = 6 + this.con;
    this.hpCurrent = 6 + this.con;

    this.saveProficiencies = [];

    this.weapons = new Set();
  }

  equipArmor(bonus) {
    this.armor = bonus;
    this.getAC();
  }

  getAC() {
    this.totalAC = this.baseAC + this.armor + (this.dexOnAC ? this.dex : 0);
    return this.totalAC;
  }

  equipWeapon(weapon) {
    return this.weapons.add(weapon);
  }

  setSaveProficiencies(arrayOfAbilities) {
    this.saveProficiencies = arrayOfAbilities;
    return this.saveProficiencies;
  }

  setProficiency(newProficiency) {
    this.proficiency = newProficiency;
    return this.proficiency;
  }

  setHpTotal(hp) {
    this.hpTotal = hp;
    return this.hpTotal;
  }

  incrementCurrentHp(amount) {
    const total = this.hpCurrent + amount;
    if (total > this.hpTotal) {
      this.hpCurrent = this.hpTotal;
    } else {
      this.hpCurrent = total;
    }
    return this.hpCurrent;
  }

  getSave(ability) {
    const proficiency = this.saveProficiencies.includes(ability) ? this.proficiency : 0;
    return this[ability] + proficiency;
  }

  // getEffectiveDamageValue for 1 round

  getD20Probability(difficulty, bonus, options = {}) {
    let successChance = (20 - (difficulty - bonus)) / 20;
    successChance = Math.max(successChance, 0);
    successChance = Math.min(successChance, 1);
    if (options.critRange && options.critRange > 0) {
      // subtract critical hit probability
      const critChance = options.critRange / 20;
      successChance = Math.max(successChance - critChance, 0);
    }
    if (options.advantage) {
      // 1-(1-m)^n
      return 1 - ((1 - successChance) ** 2);
    } else if (options.disadvantage) {
      return successChance ** 2;
    }

    return successChance;
  }

  getWeaponAbility(weapon) {
    if (weapon.finesse && (this.dex > this.str)) {
      return this.dex;
    } else if (!weapon.ability) {
      return 0;
    }
    return this[weapon.ability];
  }
  getWeaponAccuracy(weapon, bonus = 0) {
    const ability = this.getWeaponAbility(weapon);
    // const proficient = weapon.proficient ? this.proficiency : 0;
    return ability + this.proficiency + bonus;
  }
  accuracyPercentage(weapon, targetAC, options) {
    const accuracy = weapon.overrideAttackBonus || this.getWeaponAccuracy(weapon, options.attackBonus || 0);
    return this.getD20Probability(targetAC, accuracy, options);
  }
  getAverageDamage(weapon, bonus = 0, isCritical) {
    const ability = this.getWeaponAbility(weapon);
    const [diceNum, maxResult] = weapon.damageStr.split('d');
    const min = 1 * diceNum;
    const max = diceNum * maxResult;
    const avg = ((max + min) / 2);
    return bonus + (isCritical ? 2 * avg : avg) + (weapon.noAbilityToDamage ? 0 : ability);
  }
  getEffectiveDamageValue(targetAC, weapon, options = {}) {
    const defaultOptions = {
      attackBonus: 0, damageBonus: 0, critRange: 1,
    };
    const mergedOptions = Object.assign({}, defaultOptions, options);
    const hit = this.accuracyPercentage(weapon, targetAC, mergedOptions) * this.getAverageDamage(weapon, mergedOptions.damageBonus || weapon.damageBonus || 0);
    const crit = (this.critRange || 0.05) * this.getAverageDamage(weapon, mergedOptions.damageBonus, true);
    return hit + crit;
  }

  // get number of rounds before we win with given weapon
  getVictoryCount(targetCurrentHP, targetAC, weapon, options = { attackBonus: 0, damageBonus: 0 }) {
    const eDV = this.getEffectiveDamageValue(targetAC, weapon, options);
    return Math.ceil(targetCurrentHP / eDV); // round up to nearest whole round.
  }

  analyzeAttacks(target = { hpCurrent: 100, getAC() { return 15; }, savingThrow: 3 }) {
    if (this.weapons.size > 0) {
      const results = [];
      this.weapons.forEach((weapon) => {
        if (Array.isArray(weapon)) {
          weapon = weapon[0]; // eslint-disable-line no-param-reassign
        }
        const edv = this.getEffectiveDamageValue(target.getAC(), weapon);
        const vc = this.getVictoryCount(target.hpCurrent, target.getAC(), weapon);

        const edvAdvantage = this.getEffectiveDamageValue(target.getAC(), weapon, { advantage: 1 });
        const edvDisadvantage = this.getEffectiveDamageValue(target.getAC(), weapon, { disadvantage: 1 });

        const vcAdvantage = this.getVictoryCount(target.hpCurrent, target.getAC(), weapon, { advantage: 1 });
        const vcDisadvantage = this.getVictoryCount(target.hpCurrent, target.getAC(), weapon, { disadvantage: 1 });

        console.log(`
          --------------------------------------
          # Analysis of ${weapon.name}:
          Target AC ${target.getAC()}, HP: ${target.hpCurrent}
          - Effective Damage Value: ${edv}
          - Victory would take  ${vc} attacks

          ## With Advantage
          - Effective Damage Value: ${edvAdvantage}
          - Victory would take ${vcAdvantage} attacks

          ## With Disadvantage
          - Effective Damage Value: ${edvDisadvantage}
          - Victory would take ${vcDisadvantage} attacks
          ---------------------------------------
        `);
        results.push({
          weaponName: weapon.name,
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
