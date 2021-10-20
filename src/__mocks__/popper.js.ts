const PopperJS = jest.requireActual('popper.js');

export default class {
  static placements = PopperJS.placements;

  constructor() {
    return {
      destroy: (): void => undefined,
      scheduleUpdate: (): void => undefined,
    };
  }
}
