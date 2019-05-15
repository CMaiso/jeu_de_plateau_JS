export default class Arme {
  constructor(name, degats, skin) {
    this.name = name;
    this.degats = degats;
    this.skin = skin;
    this.obstacle = false;
  }

  insertArme(index) {
   $(`#c${index}`).addClass(this.skin);
  }

}

