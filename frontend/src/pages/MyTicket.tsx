import { useEffect, useState } from "react";
import {
  Box, Typography, Card, CardContent, Chip,
  CircularProgress, Alert, Divider
} from "@mui/material";
import { Event, LocationOn, ConfirmationNumber } from "@mui/icons-material";
import { getMyRegistrations } from "../services/registration.service";

export default function MyTicket() {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyRegistrations()
      .then(setRegistrations)
      .catch(() => setError("Impossible de charger vos billets"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        🎫 Mes Billets
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {registrations.length === 0 ? (
        <Alert severity="info">Vous n'avez pas encore de billets.</Alert>
      ) : (
        registrations.map((reg) => (
          <Card key={reg.id} sx={{ mb: 2 }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {reg.event?.title}
                </Typography>
                <Chip
                  label={reg.checkedIn ? "✅ Utilisé" : "✔ Valide"}
                  color={reg.checkedIn ? "default" : "success"}
                  size="small"
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                <Event fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {new Date(reg.event?.date).toLocaleDateString("fr-FR", {
                    weekday: "long", year: "numeric",
                    month: "long", day: "numeric"
                  })}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <LocationOn fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {reg.event?.location}
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <ConfirmationNumber fontSize="small" color="primary" />
                <Typography variant="body2" fontFamily="monospace" fontWeight="bold">
                  {reg.ticketCode}
                </Typography>
              </Box>

              {reg.qrCode && (
                <Box sx={{ textAlign: "center" }}>
                  <img
                    src={reg.qrCode}
                    alt="QR Code"
                    style={{ width: 200, height: 200, borderRadius: 8 }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}
