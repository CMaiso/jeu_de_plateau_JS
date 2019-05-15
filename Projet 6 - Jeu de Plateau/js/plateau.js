//Génération du plateau;
import Personnage from './personnages.js';
import Case from './case.js';
import Arme from './armes.js';

class Plateau {
    constructor() {
        this.listeCases = [];
        this.nbCase = 100;
        this.listeJoueurs = [];
        this.indexInterdit = [];
        this.listeArmes = [

            {
                arme: "baguette",
                degats: 20
            },

            {
                arme: "baton",
                degats: 30
            },

            {
                arme: "epee",
                degats: 40
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
                generation = new Arme(`${arme.arme}`, `${arme.degats}`, `${arme.arme}`);
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
            let joueur = new Personnage(`Joueur ${i}`, `Salut, je suis joueur ${i} !`, caseSelect.index, `joueur${i}`);
            this.listeJoueurs.push(joueur);
            joueur.insertJoueur();
            caseSelect.joueur = joueur;
        }
    }

    verifPlacement(index) {

        for (let joueur of this.listeJoueurs) {
            const pos = joueur.index;

            if (pos % 10 === 0) {
                if (pos === index + 1 || pos === index - 10 || pos === index + 10){
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

    lancement() {

        this.joueur = this.listeJoueurs[0];
    //methode qui permet à mes joueurs de jouer l'un après l'autre et d'une boucle pour que le jeu continue jusqu'à qu'un joueur meurs.
    }


    deplacementHaut(num) {

        let compt;
        let deplacement = [];

        if (num === undefined) {
            compt = 3;
        } else {
            compt = num;
        }

        this.joueur.index -= 10;
        let posJoueur = this.joueur.index;

        if (compt > 0 && posJoueur >= 0) {
            let caseSelect = this.listeCases[posJoueur];
            if (!caseSelect._obstacle) {
                caseSelect.changeColor('deplacement');
                deplacement.push(caseSelect);
                this.deplacementHaut(compt -1);
            }
        }
        console.log(deplacement);
    }

}





const plateau = new Plateau();
plateau.generationPlateau();
plateau.lancement();
plateau.deplacementHaut();
