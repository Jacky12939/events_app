export interface ParticipantEventDto {
  event_id: number;
  event_title: string;
  event_date: string;
  event_time: string;
  event_location: string;
  event_category: string;
  event_description: string;
  current_registered: number;
  max_capacity: number;
  organizer_title: string;
  user_is_joined: boolean;
  ticket_code?: string;
  joined_at_date?: string;
}

export interface ParticipantProfileDto {
  uuid: string;
  full_name: string;
  email_address: string;
  user_role_title: string;
  created_timestamp: string;
  summary_stats: {
    registered_count: number;
    status_label: string;
    active_year: number;
  };
}