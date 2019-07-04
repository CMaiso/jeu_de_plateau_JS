//Génération du plateau;
import Personnage from './personnages.js';
import Case from './case.js';
import Arme from './armes.js';

export class Plateau {
    constructor() {
        this.listeCases = [];
        this.nbCase = 100;
        this.listeJoueurs = [];
        this.indexInterdit = [];
        this.listeArmes = [

            {
                arme: "baguette",
                degats: 20,
                affichage: "Baguette"
            },

            {
                arme: "baton",
                degats: 30,
                affichage: "Bâton"
            },

            {
                arme: "epee",
                degats: 40,
                affichage: "Épée"
            }
        ];
    }

    randomCase() {
        let random;
        do {
            random = Math.floor(Math.random() * this.nbCase);
        } while (this.indexInterdit.includes(random));

        this.indexInterdit.push(random);
        return this.listeCases[random];
    }

    ajouterCase(index) {
        $("#plateau").append(`<div id="c${index}" class="case"></div>`);
    }

    generateTableau() {
        for (let i = 0; i < this.nbCase; i++) {
            this.ajouterCase(i);
            this.listeCases.push(new Case(i));
        }
    }

    generateCase() {
        this.generateTableau();
        for (let i = 0; i < 10; i++) {
            let caseSelect = this.randomCase();
            caseSelect.addObstacle();
            caseSelect.changeColor("greyCase");
        }
    }


    generateArmes() {

        for (let arme of this.listeArmes) {
            let caseSelect = this.randomCase(),
                generation = new Arme(`${arme.arme}`, `${arme.degats}`, `${arme.arme}`, `${arme.affichage}`);
            caseSelect.arme = generation;
            generation.insertArme(caseSelect.index);
        }
    }

    generateJoueur() {

        for (let i = 1; i < 3; i++) {
            let caseSelect;
            do {
                caseSelect = this.randomCase();
            } while (this.verifPlacement(caseSelect.index));
            let joueur = new Personnage(`Joueur ${i}`, `Salut, je suis joueur ${i} !`, `joueur${i}`);
            this.listeJoueurs.push(joueur);
            joueur.insertJoueur(caseSelect.index);
            caseSelect.joueur = joueur;
        }
    }


    verifPlacement(index) {

        for (let joueur of this.listeJoueurs) {
            console.log(this.listeCases);
            const pos = this.listeCases.find(c => c._joueur === joueur).index;

            if (pos % 10 === 0) {
                if (pos === index + 1 || pos === index - 10 || pos === index + 10) {
                    return true;
                }
            } else if (pos % 10 === 9) {
                if (pos === index - 1 || pos === index + 10 || pos === index - 10) {
                    return true;
                }
            } else return pos === index - 1 || pos === index + 1 || pos === index - 10 || pos === index + 10;

        }
    }

    generationPlateau() {

        this.generateCase();
        this.generateJoueur();
        this.generateArmes();
    }


    tours() {

        let indexJoueur = this.listeJoueurs.indexOf(this.joueur);
        if (indexJoueur === 0) {
            this.joueur = this.listeJoueurs[1];
        } else {
            this.joueur = this.listeJoueurs[0];
        }
        this.deplacement();
    }

    compareLine(index1, index2) {
        return Math.floor(index1 / 10) !== Math.floor(index2 / 10);
    }

    deplacement() {
        const orientation = [-10, 1, 10, -1];
        let deplacement = [];
        for (let j = 0; j < 4; j++) {
            const posOrigine = this.listeCases.find(c => c._joueur === this.joueur).index;
            let posJoueur = posOrigine;
            let decalage = orientation[j];

            for (let i = 0; i < 3; i++) {
                posJoueur += decalage;

                let caseSelect = this.listeCases[posJoueur];
                if (!caseSelect || caseSelect._obstacle || caseSelect._joueur) {
                    break;
                }
                if ((decalage === 1 || decalage === -1) && (this.compareLine(caseSelect.index, posOrigine))) {
                    break;
                }
                caseSelect.changeColor('deplacementPossible');
                deplacement.push(caseSelect);
            }
        }
        this.updateArme();
        this.deplacementCliquable();
        this.stats();
        this.modalFight();
    }


    deplacementCliquable() {

        let joueur = this.joueur;

        $('.deplacementPossible').on('click', (event) => {
            const caseOrigine = this.listeCases.find(c => c._joueur === this.joueur);
            caseOrigine._joueur = null;

            let newPosJoueur = $(event.target).attr('id').substring(1);
            joueur.deplacementJoueur(caseOrigine.index, (Number(newPosJoueur)));

            this.listeCases[Number(newPosJoueur)]._joueur = joueur;

            const deplacement = $('.deplacementPossible');
            deplacement.off();
            deplacement.removeClass('deplacementPossible');
            this.tours();
        })
    }

    updateArme() {

        const caseOrigine = this.listeCases.find(c => c._joueur === this.joueur);

        $('.deplacementPossible').on('click', (event) => {

            let posJoueur = caseOrigine.index; // position de base du joueur
            let caseClique = this.listeCases[$(event.target).attr('id').substring(1)].index; //position cliquée du joueur

            let nbDeplacement = Math.abs(caseClique - posJoueur); // nb de cases entre la position de départ du joueur et celle d'arrivée

            if (nbDeplacement > 3) {
                nbDeplacement /= 10;
            } // si le déplacement est supérieur à 3, / par 10 (pour calculer le déplacement haut et bas)

            let decalage;
            for (let i = 1; i < nbDeplacement + 1; i++) {
                decalage = Math.floor((caseClique - posJoueur) / nbDeplacement); //permet de connaître la direction du joueur (haut -10, bas +10, gauche -1, droite +1)
                let caseParcourues = this.listeCases[posJoueur + (decalage * i)]; // passe sur les cases parcourues et ressort les éléments de mon tableau listeCases (pour vérifier les armes)

                if (caseParcourues._arme !== null) { // s'il y a une arme sur mes cases parcourues
                    const armeTemp = caseParcourues._arme;
                    caseParcourues._arme = this.joueur.arme; // je change l'arme de mon joueur par celle sur ma case
                    $(`#c${caseParcourues.index}`).removeClass(armeTemp.skin).addClass(this.joueur.arme.skin); // changement du skin de l'arme déposée
                    this.joueur.arme = armeTemp; // mon joueur dépose son arme
                }
            }
        })
    }

    stats() {
        const J1 = this.listeJoueurs[0];
        const J2 = this.listeJoueurs[1];

        $('.statsJ1').empty().append(`<li id="vie"> Vie : ${J1.vie}</li>`).append(`<li id="arme"> Arme : ${J1.arme.affichage}</li>`).append(`<li id="degats"> Dégâts : ${J1.arme.degats}</li>`);
        $('.statsJ2').empty().append(`<li id="vie"> Vie : ${J2.vie}</li>`).append(`<li id="arme"> Arme : ${J2.arme.affichage}</li>`).append(`<li id="degats"> Dégâts : ${J2.arme.degats}</li>`);

        $('.armeJ1').empty().append(`<div class="${J1.arme.skin}"></div>`);
        $('.armeJ2').empty().append(`<div class="${J2.arme.skin}"></div>`);

    }

    modalFight() {
        const J1 = this.listeJoueurs[0];
        const J2 = this.listeJoueurs[1];

        let posJ1 = this.listeCases.find(c => c._joueur === J1).index;
        let posJ2 = this.listeCases.find(c => c._joueur === J2).index;
        const diff = Math.abs(posJ1 - posJ2);

        if (diff === 1 && !this.compareLine(posJ1, posJ2)|| diff === 10) {
            $('#modal').fadeIn();
            this.fight();
        }
    }


    fight() {
        const J1 = this.listeJoueurs[0];
        const J2 = this.listeJoueurs[1];

                let otherPlayer;
                if (this.joueur === this.listeJoueurs[1]) {
                    this.joueur = J1; // J1 commence
                    otherPlayer = J2;
                    this.joueur.buttonsJ1();

                } else {
                    this.joueur = J2; // sinon c'est J2 qui commence
                    otherPlayer = J1;
                    this.joueur.buttonsJ2();
                }

                $('.attackJ1').on('click', () => {
                    this.joueur.attack(otherPlayer);
                    this.stats();
                    this.joueur.buttonsJ2();
                    this.joueur.verifVie(otherPlayer, this.joueur);
                    this.joueur = J2;
                    otherPlayer = J1;

                    if (J1.victoire) {
                        J1.victoireJ1();
                    }
                });

                $('.defenseJ1').on('click', () => {
                    this.joueur.defend(this.joueur);
                    this.stats();
                    this.joueur.buttonsJ2();
                    this.joueur = J2;
                    otherPlayer = J1;
                });

                $('.attackJ2').on('click', () => {
                    this.joueur.attack(otherPlayer);
                    this.stats();
                    this.joueur.buttonsJ1();
                    this.joueur.verifVie(otherPlayer, this.joueur);
                    this.joueur = J1;
                    otherPlayer = J2;

                    if (J2.victoire) {
                        J2.victoireJ2();
                    }
                });

                $('.defenseJ2').on('click', () => {
                    this.joueur.defend(this.joueur);
                    this.stats();
                    this.joueur.buttonsJ1();
                    this.joueur = J1;
                    otherPlayer = J2;
                });

                this.restart();
    }
    restart() {
        $('.restart').on('click', () => {
            location.reload();
        })
    }
}


const plateau = new Plateau();
plateau.generationPlateau();
plateau.tours();