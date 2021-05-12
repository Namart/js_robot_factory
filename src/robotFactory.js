'use strict';

class BaseRobot {
  constructor(name, weight, position, chipVersion) {
    this.name = name;
    this.weight = weight;

    this.coords = position.x ? position : {
      x: 0, y: 0,
    };
    this.chipVersion = chipVersion;
  }
  getInfo() {
    return `Robot: ${this.name}, `
    + `Chip version: ${this.chipVersion}, `
    + `Weight: ${this.weight}`;
  };

  goForward(step = 1) {
    this.coords.y += step;
  };

  goLeft(step = 1) {
    this.coords.x -= step;
  };

  goBack(step = 1) {
    this.coords.y -= step;
  };

  goRight(step = 1) {
    this.coords.x += step;
  };
}

class FlyingRobot extends BaseRobot {
  constructor(name, weight, position, chipVersion) {
    super(name, weight, position, chipVersion);

    this.coords = position.z ? position : {
      x: 0,
      y: 0,
      z: 0,
    };
  }

  goUp(step = 1) {
    this.coords.z += step;
  };
  goDown(step = 1) {
    this.coords.z -= step;
  };
}

class DeliveryDrone extends FlyingRobot {
  constructor(name, weight, position, chipVersion, maxLoadWeight, currentLoad) {
    super(name, weight, position, chipVersion);

    this.maxLoadWeight = maxLoadWeight;
    this.currentLoad = currentLoad;
  }

  hookLoad(cargo) {
    if (cargo.weight <= this.maxLoadWeight && this.currentLoad === null) {
      this.currentLoad = cargo;
    }
  }

  unhookLoad() {
    this.currentLoad = null;
  }
}

// DeliveryDrone.prototype = {
//   unhookCount: 0,
//   counter() {
//     this.unhookCount++;
//   },
// };

module.exports = {
  BaseRobot,
  FlyingRobot,
  DeliveryDrone,
};
