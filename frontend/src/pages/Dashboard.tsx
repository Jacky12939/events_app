import { useNavigate } from "react-router-dom";
import { Box, Typography, Card, CardContent, CardActionArea, Grid } from "@mui/material";
import { EventNote, ConfirmationNumber, QrCodeScanner } from "@mui/icons-material";
import { getUser } from "../services/auth.service";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const isOrganizer = user?.role === "ORGANIZER" || user?.role === "ADMIN";

  const participantCards = [
    { icon: <EventNote sx={{ fontSize: 50, color: "#1976d2" }} />, label: "Événements", desc: "Voir les événements disponibles", path: "/events" },
    { icon: <ConfirmationNumber sx={{ fontSize: 50, color: "#388e3c" }} />, label: "Mes Billets", desc: "Voir mes billets et QR codes", path: "/my-tickets" },
  ];

  const organizerCards = [
    { icon: <EventNote sx={{ fontSize: 50, color: "#1976d2" }} />, label: "Mes Événements", desc: "Gérer mes événements", path: "/organizer" },
    { icon: <QrCodeScanner sx={{ fontSize: 50, color: "#f57c00" }} />, label: "Scanner", desc: "Scanner les billets QR", path: "/checker" },
  ];

  const cards = isOrganizer ? organizerCards : participantCards;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "grey.100", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={1}>
        Bienvenue, {user?.firstName} {user?.lastName} 👋
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={4}>
        Que souhaitez-vous faire ?
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {cards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.label}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardActionArea onClick={() => navigate(card.path)} sx={{ p: 3, textAlign: "center" }}>
                <CardContent>
                  {card.icon}
                  <Typography variant="h6" fontWeight="bold" mt={1}>
                    {card.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
