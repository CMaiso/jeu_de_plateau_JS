import Arme from './armes.js';

export default class Personnage {
  constructor(nom, citation, skin) {
    this.nom = nom;
    this.citation = citation;
    this.vie = 100;
    this.arme = new Arme('lance-pierre', 10, 'lance-pierre');
    //this.index = emplacement;
    this.skin = skin;
  }

  insertJoueur(index) {
    $(`#c${index}`).addClass(this.skin);
  }

  deplacementJoueur(oldIndex, newIndex) {
    $(`#c${oldIndex}`).removeClass(this.skin);
    $(`#c${newIndex}`).addClass(this.skin);
  }

}
