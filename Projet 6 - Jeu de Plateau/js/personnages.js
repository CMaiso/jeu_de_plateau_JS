import Arme from './armes.js';

export default class Personnage {
  constructor(nom, citation, emplacement, skin) {
    this.nom = nom;
    this.citation = citation;
    this.vie = 100;
    this.arme = new Arme('lance-pierre', 10, 'skin');
    this.index = emplacement;
    this.skin = skin;
  }

  insertJoueur() {
    $(`#c${this.index}`).addClass(this.skin);
  }

}
