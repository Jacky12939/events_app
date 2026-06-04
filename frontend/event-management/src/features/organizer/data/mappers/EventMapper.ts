import { type Event } from '../../domain/entities/Event';
import { type EventDTO } from '../dtos/EventDTO';

export class EventMapper {
  
  // Convertit le DTO (Backend NestJS) vers l'Entité (Domaine React)
  static toDomain(dto: EventDTO): Event {
    return {
      id: dto.id_event,
      title: dto.titre,
      description: dto.description_detail || '',
      category: dto.categorie_nom || '',
      location: dto.lieu_adresse || '',
      date: dto.date_debut || '',
      time: dto.heure_debut || '',
      capacity: dto.places_max,
      registeredCount: dto.inscrits_count || 0,
      status: dto.statut_code, // ✅ Assignation directe grâce à l'alignement des types
      organizerName: dto.organisateur_nom || '',
    };
  }

  // Convertit l'Entité (Domaine React) vers le DTO (Backend NestJS)
  static toDTO(entity: Partial<Event>): Partial<EventDTO> {
    return {
      id_event: entity.id,
      titre: entity.title,
      description_detail: entity.description,
      categorie_nom: entity.category,
      lieu_adresse: entity.location,
      date_debut: entity.date,
      heure_debut: entity.time,
      places_max: entity.capacity,
      statut_code: entity.status, 
    };
  }
}