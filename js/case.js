export default class Case {
  constructor(index) {
    this.index = index;
    this._obstacle = false;
    this._arme = null;
    this._joueur = null;
  }

  changeColor(color) {
    $(`#c${this.index}`).addClass(color);
  }

  addObstacle() {
    this._obstacle = true;
  }

  set arme(arme) {
    this._arme = arme;
  }

  set joueur(joueur) {
    this._joueur = joueur;
  }

}
