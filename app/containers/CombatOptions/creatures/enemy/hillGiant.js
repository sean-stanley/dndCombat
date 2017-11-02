import Monster from '../extensions/monster';

const greatClub = {
  name: 'Giant Great Club',
  damageStr: '3d8',
  type: 'exotic',
  ability: 'str',
};

const rock = {
  name: 'Thrown Rock',
  damageStr: '3d10',
  type: 'exotic',
  ability: 'str',
};

class HillGiant extends Monster {
  constructor() {
    super();

    this.str = 5;
    this.dex = -1;
    this.con = 4;
    this.int = -1;
    this.wis = -1;
    this.cha = -2;

    this.proficiency = 3;

    this.hpTotal = 105;
    this.hpCurrent = 105;

    this.baseAC = 14;
    this.dexOnAC = false;

    this.name = 'Hill Giant';
  }
}

const giant = new HillGiant();

giant.equipWeapon(greatClub, rock);
giant.setMultiAttack([greatClub, greatClub]);

// giant.analyzeStrategies();

export default giant;
