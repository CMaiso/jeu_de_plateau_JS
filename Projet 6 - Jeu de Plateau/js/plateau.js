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
                "arme": "lance-pierre",
                "degats": "10"
            },

            {
                "arme": "baguette",
                "degats": "20"
            },

            {
                "arme": "baton",
                "degats": "30"
            },

            {
                "arme": "epee",
                "degats": "40"
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

    // alreadyUse() {
    //     let indexInterdit = this.listeCases.filter(indexCase => indexCase.obstacle).map(indexCase => indexCase.index);
    //     return indexInterdit;
    // }

    generateArmes() {

        for (let arme of this.listeArmes) {
            let caseSelect = this.randomCase(),
                generation = new Arme(`${arme.arme}`, `${arme.degats}`, `${arme.arme}`, caseSelect.index);
            generation.insertArme();
            console.log(generation);
        }

    }

    generateJoueur() {

        for (let i = 1; i < 3; i++) {
            let caseSelect = this.randomCase();
            let joueur = new Personnage(`Joueur ${i}`, `Salut, je suis joueur ${i} !`, 'arme', caseSelect.index, `joueur${i}`);
            this.listeJoueurs.push(joueur);
            joueur.insertJoueur();
        }
    }

    verifEmplacement() {
        let caseSelect = this.randomCase();
        if (this.index === this.index + 1 || this.index === this index -1 || this.index === this.index + 10 || this.index === -10 )
    }

}





const plateau = new Plateau();
plateau.generateCase();
plateau.generateJoueur();
plateau.generateArmes();
