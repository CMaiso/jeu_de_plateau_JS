export default class Arme {
  constructor(name, degats, skin, emplacement) {
    this.name = name;
    this.degats = degats;
    this.skin = skin;
    this.index = emplacement;
  }

  insertArme() {
    $(`#c${this.index}`).addClass(this.skin);
  }

}

