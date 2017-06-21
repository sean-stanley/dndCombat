import Chamber from '../generateChamber';

describe('class Chamber()', () => {
  it('should create a chamber to be the setting for our encounter', () => {
    const chamber = new Chamber();
    console.log(chamber);

    expect(chamber.size).toBeDefined();
  });
  describe('method: generateSizeOfChamber()', () => {
    it('should return an object with dimensions and doors and such', () => {
      const size = new Chamber().generateSizeOfChamber(1);
      expect(size.x).toBe(4);
      expect(size.y).toBe(4);
      expect(size.doors).toBe('normal');
    });
    it('should return an object with illegalCoordinates for octagon rooms', () => {
      const size = new Chamber().generateSizeOfChamber(19);
      expect(size.x).toBe(12);
      expect(size.y).toBe(12);
      expect(size.doors).toBe('large');
      expect(size.illegalCoordinates).toContainEqual([0, 0]);
    });
  });
  describe('method: coordinatesFromEachCorner()', () => {
    it('should return unique coordinates for the four corners of a rectangle of dimensions x, y', () => {
      const coords = Chamber.coordinatesFromEachCorner(1, 6, 6);
      expect(coords.length).toBe(4);
      expect(coords).toContainEqual([0, 0]);
      expect(coords).not.toContainEqual([0, 1]);
    });

    it('should also return unique coordinates for adjacent squares', () => {
      const [x, y, num] = [10, 10, 3];
      expect(x).toBe(10);

      const coords = Chamber.coordinatesFromEachCorner(num, x, y);
      expect(coords.length).toBe(20);
      expect(coords).toContainEqual([x - 1, y - num]);
      expect(coords).not.toContainEqual([x - 1 - num, y - num]);
    });
  });
});
