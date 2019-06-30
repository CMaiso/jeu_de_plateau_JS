export default class Arme {
  constructor(name, degats, skin, affichage) {
    this.name = name;
    this.degats = degats;
    this.skin = skin;
    this.obstacle = false;
    this.affichage = affichage;
  }

  insertArme(index) {
   $(`#c${index}`).addClass(this.skin);
  }

}

