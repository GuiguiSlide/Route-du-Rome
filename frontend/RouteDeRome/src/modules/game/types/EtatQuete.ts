// Énumération des états possibles d'une quête
// NON_COMMENCEE: La quête n'a pas encore été commencée
// EN_COURS: La quête est en cours (premier dialogue fait)
// ACCOMPLIE: La quête est terminée

export const EtatQuete = {
  NON_COMMENCEE: "NON_COMMENCEE",
  EN_COURS: "EN_COURS",
  ACCOMPLIE: "ACCOMPLIE",
} as const;

export type EtatQuete = (typeof EtatQuete)[keyof typeof EtatQuete];