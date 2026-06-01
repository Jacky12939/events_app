import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, CardActions,
  Button, Chip, CircularProgress, Alert, Grid
} from "@mui/material";
import { Event, LocationOn, People } from "@mui/icons-material";
import api from "../services/api";
import { registerToEvent } from "../services/registration.service";
import { useNavigate } from "react-router-dom";

export default function ParticipantEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registering, setRegistering] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(() => setError("Impossible de charger les événements"))
      .finally(() => setLoading(false));
  }, []);

  const handleRegister = async (eventId: string) => {
    setRegistering(eventId);
    setError("");
    setSuccess("");
    try {
      await registerToEvent(eventId);
      setSuccess("Inscription réussie ! Votre billet a été généré.");
      setTimeout(() => navigate("/my-tickets"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setRegistering(null);
    }
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🎉 Événements disponibles
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {events.length === 0 ? (
        <Alert severity="info">Aucun événement disponible.</Alert>
      ) : (
        <Grid container spacing={2}>
          {events.map((evt) => (
            <Grid item xs={12} md={6} key={evt.id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography variant="h6" fontWeight="bold">
                      {evt.title}
                    </Typography>
                    <Chip
                      label={evt.status}
                      color={evt.status === "PUBLISHED" ? "success" : "default"}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" mb={1}>
                    {evt.description}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <Event fontSize="small" color="action" />
                    <Typography variant="body2">
                      {new Date(evt.date).toLocaleDateString("fr-FR", {
                        weekday: "long", year: "numeric",
                        month: "long", day: "numeric"
                      })}
                    </Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2">{evt.location}</Typography>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <People fontSize="small" color="action" />
                    <Typography variant="body2">
                      {evt.registrationCount || 0} / {evt.capacity} inscrits
                    </Typography>
                  </Box>
                </CardContent>

                <CardActions sx={{ px: 2, pb: 2 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    disabled={registering === evt.id || evt.status !== "PUBLISHED"}
                    onClick={() => handleRegister(evt.id)}
                  >
                    {registering === evt.id
                      ? <CircularProgress size={20} />
                      : "S'inscrire"
                    }
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
