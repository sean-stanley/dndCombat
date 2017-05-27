export default [
  {
    name: 'altar',
    dimensions: [1, 1],
    standingCover: 2,
    proneCover: 'total',
  },
  {
    name: 'armchair',
    dimensions: [1, 1],
    standingCover: 2,
    proneCover: 2,
    movable: true,
    difficultTerrain: true,
  },
  {
    name: 'bench',
    dimensions: [1, 2],
    proneCover: 2,
    movable: true,
    shareSpace: true,
    difficultTerrain: true,
  },
  {
    name: 'bucket',
    dimensions: [1, 1],
    movable: true,
    improvisedWeapon: true,
    equipable: true,
    shareSpace: true,
  },
  {
    name: 'chandelier',
    dimensions: [1, 1],
    shareSpace: true,
    special: {
      trigger: {
        type: 'attack',
        AC: 10,
        hp: 5,
        immunity: ['bludgeoning', 'piercing'],
      },
      effect: {
        type: 'attack',
        range: 0,
        damage: 'setback',
        damageType: 'bludgeoning',
      },
    },
  },
  {
    name: 'chair, plain',
    dimensions: [1, 1],
    standingCover: 2,
    proneCover: 2,
    movable: true,
    shareSpace: true,
  },
  {
    name: 'crate',
    dimensions: [1, 1],
    standingCover: 2,
    proneCover: 'total',
    difficultTerrain: true,
  },
  {
    name: 'desk',
    dimensions: [1, 2],
    standingCover: 2,
    proneCover: 'total',
    movable: true,
    blocksMovement: true,
  },
  {
    name: 'Fireplace, Lit',
    dimensions: [1, 1],
    shareSpace: true,
    difficultTerrain: true,
    hazardTerrain: true,
    special: {
      trigger: {
        type: ['enter space', 'begin turn in space'],
      },
      effect: {
        type: 'attack',
        range: 0,
        damage: 'setback',
        damageType: 'fire',
      },
    },
  },
  {
    name: 'Fireplace, Unlit',
    dimensions: [1, 1],
    difficultTerrain: true,
    shareSpace: true,
  },
  {
    name: 'Fountain',
    dimensions: [1, 1],
    difficultTerrain: true,
    shareSpace: true,
    standingCover: 2,
    proneCover: 2,
  },
  {
    name: 'Idol, Large Statue',
    dimensions: [2, 2],
    standingCover: 5,
    proneCover: 'total',
  },
  {
    name: 'Keg, small 20 gallons',
    dimensions: [1, 1],
    standingCover: 2,
    proneCover: 2,
    shareSpace: true,
    movable: true,
  },
  {
    name: 'Rubble, loose',
    dimensions: [1, 1],
    shareSpace: true,
    difficultTerrain: true,
  },
  {
    name: 'Rubble, Mound',
    dimensions: [2, 2],
    shareSpace: true,
    difficultTerrain: true,
    proneCover: 2,
  },
  {
    name: 'Screen',
    dimensions: [1, 1],
    standingCover: 'total',
    proneCover: 'total',
    movable: true,
    destructable: {
      AC: 10,
      HP: 10,
    },
  },
  {
    name: 'Table, Large',
    dimensions: [2, 2],
    standingCover: 2,
    proneCover: 5,
  },
  {
    name: 'Table, long',
    dimensions: [2, 1],
    standingCover: 2,
    proneCover: 5,
  },
  {
    name: 'Table, low',
    dimensions: [1, 1],
    proneCover: 2,
    shareSpace: true,
  },
  {
    name: 'Urn',
    standingCover: 2,
    proneCover: 5,
    destructable: {
      AC: 8,
      HP: 5,
    },
  },

];