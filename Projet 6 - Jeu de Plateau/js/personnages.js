export default class Personnage {
  constructor(nom, citation, arme, emplacement, skin) {
    this.nom = nom;
    this.citation = citation;
    this.vie = 100;
    this.arme = arme;
    this.index = emplacement;
    this.skin = skin;
  }

  insertJoueur() {
    $(`#c${this.index}`).addClass(this.skin);
  }


}
