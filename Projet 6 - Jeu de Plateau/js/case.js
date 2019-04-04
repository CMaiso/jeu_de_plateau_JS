export default class Case {
  constructor(index) {
    this.index = index;
    this.obstacle = false;
  }

  changeColor(color) {
    $(`#c${this.index}`).addClass(color);
  }

  addObstacle() {
    this.obstacle = true;
  }


}
