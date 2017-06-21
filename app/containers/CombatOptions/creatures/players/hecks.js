import Creature from '../../character';

import {
  rayOfFrost,
  dagger,
  fireball,
  coneOfCold,
  animateObjectsTiny,
  animateObjectsSmall,
  animateObjectsMedium,
  animateObjectsLarge,
  animateObjectsHuge,
} from '../../defaultWeapons';

class Hecks extends Creature {
  constructor() {
    super();
    // ability scores
    this.str = -1;
    this.dex = 2;
    this.con = 3;
    this.int = 5;
    // this.wis = 0; use default
    this.cha = -1;

    // proficiency score
    this.proficiency = 4;

    // armor class
    this.baseAC = 10;

    // use dex with AC
    this.dexOnAC = true;

    // default hit dice
    this.hpTotal = 70;

    this.hpCurrent = 70;

    this.spellcastingAbility = 'int';

    this.saveProficiencies = ['int', 'wis'];

    this.name = 'Hecks Van Martelen';
  }
}

const hecks = new Hecks();

hecks.equipWeapon([
  rayOfFrost,
  dagger,
  animateObjectsTiny,
  animateObjectsSmall,
  animateObjectsMedium,
  animateObjectsLarge,
  animateObjectsHuge,
]);
hecks.equipSpells([fireball, coneOfCold]);

// hecks.analyzeAttacks();
// hecks.analyzeSpells();

export default hecks;
