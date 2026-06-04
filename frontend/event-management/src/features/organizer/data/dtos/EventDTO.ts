export interface EventDTO {
  id_event: string;
  titre: string;
  description_detail: string;
  categorie_nom: string;
  lieu_adresse: string;
  date_debut: string;
  heure_debut: string;
  places_max: number;
  inscrits_count: number;
  statut_code: 'draft' | 'published' | 'completed'; 
  organisateur_nom: string;
}