import { includes, isEqual, uniqWith, uniqueId } from 'lodash';

import furnishings from './furnishings';

import { OBJECT_INTERACTION, ACTION } from './constants';

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    const output = [];
    for (let i = 0; i < numRolls; i += 1) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

export default class Chamber {
  constructor() {
    this.size = this.generateSizeOfChamber();
    // this.entrance = this.generateEntrance();
    // this.exits = [];
    // this.generateExits();
    // this.furnishings = this.getFurnishings();
  }

  getSize() {
    return this.size;
  }

  generateSizeOfChamber(r) {
    const d20 = new RandomDie(20);
    const roll = r || d20.rollOnce();
    switch (roll) {
      case 1 :
      case 2 :
        return { x: 4, y: 4, doors: 'normal' };
      case 3 :
      case 4 :
        return { x: 6, y: 6, doors: 'normal' };
      case 5 :
      case 6 :
        return { x: 8, y: 8, doors: 'normal' };
      case 7 :
      case 8 :
      case 9 :
        return { x: 4, y: 6, doors: 'normal' };
      case 10 :
      case 11 :
      case 12 :
        return { x: 6, y: 8, doors: 'normal' };
      case 13 :
      case 14 :
        return { x: 8, y: 10, doors: 'large' };
      case 15 :
        return { x: 10, y: 16, doors: 'large' };
      case 16 :
        return { r: 3, x: 6, y: 6, doors: 'normal', illegalCoordinates: this.constructor.coordinatesFromEachCorner(1, 6, 6) };
      case 17 :
        return { r: 5, x: 10, y: 10, doors: 'large', illegalCoordinates: this.constructor.coordinatesFromEachCorner(3, 10, 10) };
      case 18 :
        return { x: 8, y: 8, octagon: true, doors: 'large', illegalCoordinates: this.constructor.coordinatesFromEachCorner(3, 8, 8) };
      case 19 :
      case 20 :
        return {
          x: 12,
          y: 12,
          octagon: true,
          doors: 'large',
          illegalCoordinates: this.constructor.coordinatesFromEachCorner(4, 12, 12).concat([[[1, 1], [10, 1], [1, 10], [10, 10]]]),
        };
      default:
        return {};
    }
  }

  static coordinatesFromEachCorner(num, x, y) {
    const results = [];
    const maxX = x - 1;
    const maxY = y - 1;
    for (let i = 0; i < num; i += 1) {
      results.push(
        [0, i], [i, 0],
        [maxX, i], [maxX - i, 0],
        [i, maxY], [0, maxY - i],
        [maxX - i, maxY], [maxX, maxY - i],
      );
    }
    return uniqWith(results, isEqual);
  }

  generateExits() {
    const { doors } = this.getSize();
    const d20 = new RandomDie(20);
    const roll = d20.rollOnce();
    if (doors === 'normal') {
      switch (roll) {
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
          return 0;
        case 6 :
        case 7 :
        case 8 :
        case 9 :
        case 10 :
        case 11 :
          return this.generateExitsData(1);
        case 12 :
        case 13 :
        case 14 :
        case 15 :
          return this.generateExitsData(2);
        case 16 :
        case 17 :
        case 18 :
          return this.generateExitsData(3);
        case 19 :
        case 20 :
          return this.generateExitsData(4);
        default:
          return {};
      }
    } else {
      switch (roll) {
        case 1 :
        case 2 :
        case 3 :
          return 0;
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 8 :
          return this.generateExitsData(1);
        case 9 :
        case 10 :
        case 11 :
        case 12 :
        case 13 :
          return this.generateExitsData(2);
        case 14 :
        case 15 :
        case 16 :
        case 17 :
          return this.generateExitsData(3);
        case 18 :
          return this.generateExitsData(4);
        case 19 :
          return this.generateExitsData(5);
        case 20 :
          return this.generateExitsData(6);
        default:
          return {};
      }
    }
  }

  generateExitsData(numOfExits) {
    const d2 = new RandomDie(2);
    for (let i = 0; i < numOfExits; i += 1) {
      const roll = d2.rollOnce();
      if (roll === 1) {
        const door = {
          id: uniqueId('DOOR_'),
          location: this.generateExitLocation(),
          type: 'door',
          details: this.generateDoorDetails(),
        };
        this.exits.push(door);
      } else {
        const corridor = {
          id: uniqueId('CORRIDOR_'),
          location: this.generateExitLocation(),
          type: 'corridor',
        };
        this.exits.push(corridor);
      }
    }
  }

  generateEntrance() {
    return {
      id: uniqueId('CORRIDOR_'),
      type: 'corridor',
      entrance: true,
      location: {
        wall: 's', x: Math.floor(this.size.x / 2), y: this.size.y,
      },
    };
  }

  generateDoorDetails() {
    const d20 = new RandomDie(20);
    const roll = d20.rollOnce();
    if (roll <= 12) {
      // might be a trap!
      let trap = {};
      const doorTypeRoll = d20.rollOnce();
      if (doorTypeRoll === 20) {
        const damageTierRoll = new RandomDie(6).rollOnce();
        trap = {
          trapped: true,
        };
        switch (damageTierRoll) {
          case 1 :
          case 2 :
            trap.damageTier = 'setback';
            break;
          case 3 :
          case 4 :
          case 5 :
            trap.damageTier = 'dangerous';
            break;
          case 6 :
            trap.damageTier = 'deadly';
            break;
          default:
        }
      }
      return {
        description: 'unlocked door',
        locked: false,
        visible: true,
        openAction: OBJECT_INTERACTION,
        ...trap,
      };
    } else if (roll >= 13 && roll <= 18) {
      return {
        description: 'Locked door',
        locked: true,
        broken: false,
        visible: true,
        unlockAction: ACTION,
        breakAction: ACTION,
        unlockDC: 15,
        breakDC: 20,
        openAction: OBJECT_INTERACTION,
      };
    } else if (roll === 17) {
      return {
        description: 'Unlocked Portcullis',
        locked: false,
        broken: false,
        visible: true,
        openAction: ACTION,
      };
    } else if (roll === 18) {
      return {
        description: 'Barred Portcullis',
        locked: false,
        broken: false,
        visible: true,
        unlockAction: ACTION,
        breakAction: ACTION,
        unlockDC: 20,
        breakDC: 25,
        openAction: ACTION,
      };
    } else if (roll === 19) {
      return {
        description: 'Unlocked Secret Door',
        locked: false,
        broken: false,
        visible: false,
        perceptionDC: 20,
        openAction: OBJECT_INTERACTION,
      };
    } return {
      description: 'Locked secret door',
      locked: true,
      broken: false,
      visible: false,
      unlockAction: ACTION,
      breakAction: ACTION,
      perceptionDC: 20,
      unlockDC: 15,
      breakDC: 20,
      openAction: OBJECT_INTERACTION,
    };
  }

  generateExitLocation() {
    const d20 = new RandomDie(20);
    const roll = d20.rollOnce();
    switch (roll) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return { wall: 'n', ...this.getCoordinate(this.getRandomRoomCoordinate(null, 0), true) };
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
        return { wall: 'w', ...this.getCoordinate(this.getRandomRoomCoordinate(0, null), true) };
      case 13:
      case 14:
      case 15:
      case 16:
      case 17:
        return { wall: 'e', ...this.getCoordinate(this.getRandomRoomCoordinate(this.size.x, null), true) };
      case 18:
      case 19:
      case 20:
        return { wall: 's', ...this.getCoordinate(this.getRandomRoomCoordinate(null, this.size.y), true) };
      default:
        return {};
    }
  }

  getRandomRoomCoordinate(defaultX, defaultY) {
    const { x, y } = this.size;
    // coordinates are zero-based but dice are one-based;
    const randomX = new RandomDie(x);
    const randomY = new RandomDie(y);

    return {
      x: defaultX || randomX.rollOnce() - 1,
      y: defaultY || randomY.rollOnce() - 1,
      defaultX,
      defaultY,
    };
  }

  getCoordinate(coord, recursive) {
    const contents = this.locationContents(coord);

    if (contents.error === 'illegal coordinates') {
      const coordClone = Object.assign({}, coord);
      if (coordClone.y > this.size.y / 2) { // this.size.y is always even thankfully
        coordClone.y -= 1;
      } else {
        coordClone.y += 1;
      }
      if (recursive) {
        return this.getCoordinate(coord, recursive);
      }
      return {};
    } else if (contents.type === ('door' || 'corridor' || 'furnishing') || !contents.shareSpace) {
      if (recursive) {
        return this.getCoordinate(this.getRandomRoomCoordinate(coord.defaultX, coord.defaultY), recursive);
      }
    }

    return { coord, ...contents };
  }

  locationContents({ x, y }) {
    // check if the location is in the Chamber
    const outsideChamberResult = { error: 'outside chamber' };
    // if room has size.x then x cannot be greater than size.x
    if (this.size.x && (x - 1) > this.size.x) {
      return outsideChamberResult;
    } else if (this.size.y && (y - 1) > this.size.y) {
      return outsideChamberResult;
    } else if (this.size.r || this.size.octagon) {
      // for circles and octagons the corner locations are not accessible.
      if (includes(this.size.illegalCoordinates, { x, y }.values)) {
        // location is illegal, mutate the current location on the y axis and try again.
        return { error: 'illegal coordinates' };
      }
    }

    // check if the location is the entrance
    if (isEqual({ x, y }, this.entrance.location)) {
      return this.entrance;
    }
    // check if the location is an exit
    const exitResult = this.exits.filter((exit) => exit.location.x === x && exit.location.y === y);
    if (exitResult.length === 1) {
      return exitResult[0];
    }
    // check if the location contains a furnishing
    if (this.furnishings && this.furnishings.length) {
      const furnishingResult = this.furnishings.filter((f) => f.location.x === x && f.location.y === y);
      if (furnishingResult.length) {
        return furnishingResult;
      }
    }

    return {}; // empty location
  }

  getFurnishings(die1, d20Array) {
    const dieSize = this.size.doors === 'large' ? 10 : 6;
    const furnishingsAmountDie = new RandomDie(dieSize);
    const furnishingsAmountRoll = die1 || furnishingsAmountDie.rollOnce() - 2;

    if (furnishingsAmountRoll <= 0) {
      return [];
    }
    const d20 = new RandomDie(20);
    const rolls = d20Array || d20.roll(furnishingsAmountRoll);

    return rolls.map(this.selectFurnishing);
  }

  selectFurnishing(roll) {
    const furnishing = furnishings[roll];
    return { ...furnishing,
      id: uniqueId('FURNISHING_'),
      type: 'furnishing',
      location: this.getRandomRoomCoordinate(),
    };
  }
}
