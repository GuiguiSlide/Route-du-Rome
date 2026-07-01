import { describe, expect, it } from 'vitest'
import { Jeu } from '../../modules/game/Jeu'

describe('Jeu', () => {
  it('initialise sans personnage sélectionné', () => {
    const jeu = new Jeu()
    expect(jeu.getState().personnageSelectionneId).toBeNull()
  })
})
