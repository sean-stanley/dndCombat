import weapon from './weapon';

const list = [];

export const greatsword = {
  name: 'Greatsword',
  damageStr: '2d6',
  type: 'martial',
};
export const jScimitar = {
  name: 'Jager Scimitar',
  finesse: true,
  damageStr: '1d8',
  type: 'martial',
};
export const longbow = {
  name: 'Longbow',
  ability: 'dex',
  damageStr: '1d8',
  type: 'martial',
};
export const dagger = {
  name: 'Dagger',
  finesse: true,
  damageStr: '1d4',
  type: 'simple',
};
export const firebolt = {
  name: 'Firebolt',
  ability: 'cha',
  damageStr: '2d10',
  type: 'spell',
  noAbilityToDamage: true,
};
export const fireball = {
  name: 'Fireball',
  damageStr: '8d6',
  type: 'spell',
  saveAbility: 'dex',
  saveDamage: 0.5,
};

export const coneOfCold = {
  name: 'Cone of Cold',
  damageStr: '8d8',
  type: 'spell',
  saveAbility: 'dex',
  saveDamage: 0.5,
};

export const rayOfFrost = {
  name: 'Ray of Frost',
  ability: 'int',
  noAbilityToDamage: true,
  damageStr: '2d8',
  type: 'spell',
};

export const animateObjectsTiny = {
  name: 'Animate Objects Tiny',
  noAbilityToDamage: true,
  overrideAttackBonus: 8,
  damageStr: '1d4',
  type: 'spell',
  damageBonus: 4,
};

export const animateObjectsSmall = {
  name: 'Animate Objects Small',
  noAbilityToDamage: true,
  overrideAttackBonus: 6,
  damageStr: '1d8',
  damageBonus: 2,
  type: 'spell',
};

export const animateObjectsMedium = {
  name: 'Animate Objects Medium',
  noAbilityToDamage: true,
  overrideAttackBonus: 6,
  damageStr: '2d6',
  damageBonus: 1,
  type: 'spell',
};

export const animateObjectsLarge = {
  name: 'Animate Objects Large',
  noAbilityToDamage: true,
  overrideAttackBonus: 6,
  damageStr: '2d10',
  damageBonus: 2,
  type: 'spell',
};

export const animateObjectsHuge = {
  name: 'Animate Objects Huge',
  noAbilityToDamage: true,
  overrideAttackBonus: 8,
  damageStr: '2d12',
  damageBonus: 4,
  type: 'spell',
};

const defaultWeapons = [
  greatsword, jScimitar, longbow, dagger, firebolt, fireball, rayOfFrost, coneOfCold, animateObjectsTiny, animateObjectsSmall, animateObjectsMedium, animateObjectsLarge, animateObjectsHuge,
];

for (let i = 0; i < defaultWeapons.length; i += 1) {
  const w = Object.assign({}, weapon, defaultWeapons[i]);

  list.push(w);
}

export default list;
