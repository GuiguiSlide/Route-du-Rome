// Tests unitaires pour la classe Jeu
// Vérifie la logique métier du système de jeu et des rencontres

import { describe, expect, it } from 'vitest'
import { Jeu } from '../../modules/game/Jeu'
import { Joueur } from '../../modules/game/Joueur'
import { Personnage } from '../../modules/game/Personnage'
import { Quiz } from '../../modules/game/Quiz'
import { CarnetDeBord } from '../../modules/game/CarnetDeBord'

// Fonction utilitaire pour créer un personnage de test
function creerPersonnageDeTest(id = 'p1'): Personnage {
  const quiz = new Quiz(`${id}-quiz`, [])
  return new Personnage(id, 'Nom Test', 'Métier Test', 'Secteur Test', null, quiz, null)
}

describe('Jeu', () => {
  it("n'a aucun personnage sélectionné avant le premier dialogue", () => {
    const joueur = new Joueur(new CarnetDeBord(1))
    const personnage = creerPersonnageDeTest()
    new Jeu(joueur, [personnage], [])

    expect(joueur.getPersonnageChoisi()).toBeNull()
  })

  it('sélectionne le personnage au démarrage de la rencontre', () => {
    const joueur = new Joueur(new CarnetDeBord(1))
    const personnage = creerPersonnageDeTest()
    const jeu = new Jeu(joueur, [personnage], [])

    jeu.commencer(personnage.id)

    expect(joueur.getPersonnageChoisi()).toBe(personnage)
  })
})