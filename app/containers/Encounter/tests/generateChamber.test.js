import Chamber from '../generateChamber';

describe('class Chamber()', () => {
  it('creates a chamber to be the setting for our encounter', () => {
    const chamber = new Chamber();
    console.log(chamber);

    expect(chamber.size).toBeDefined();
  });
});
