import Arme from './armes.js';

export default class Personnage {
  constructor(nom, citation, skin) {
    this.nom = nom;
    this.citation = citation;
    this.vie = 100;
    this.arme = new Arme('lance-pierre', 10, 'lance-pierre', 'Lance-Pierre');
    this.skin = skin;
    this.bouclier = false;
    this.victoire = false;
  }

  insertJoueur(index) {
    $(`#c${index}`).addClass(this.skin);
  }

  deplacementJoueur(oldIndex, newIndex) {
    $(`#c${oldIndex}`).removeClass(this.skin);
    $(`#c${newIndex}`).addClass(this.skin);
  }

  attack(otherPlayer) {
    let armeEquipe = this.arme.degats;

    if (otherPlayer.bouclier) {
      otherPlayer.vie -= (armeEquipe / 2);
      otherPlayer.bouclier = false;

    } else {
      otherPlayer.vie -= armeEquipe;
    }
    return otherPlayer.vie;
  }

  defend(joueur) {
    return joueur.bouclier = true;
  }

  buttonsJ1() {
    $(".buttonJ1").show();
    $(".buttonJ2").hide();
  }

  buttonsJ2() {
    $('.buttonJ2').show();
    $('.buttonJ1').hide();
  }

  verifVie(otherPlayer, player) {
    if (otherPlayer.vie <= 0) {
      player.victoire = true;
    }
  }

  victoireJ1() {
    $('#modal').hide();
    $('#modalVictoireJ1').show();
  }

  victoireJ2() {
    $('#modal').hide();
    $('#modalVictoireJ2').show();
  }


}
