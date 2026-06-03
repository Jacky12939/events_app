import { useState } from "react";
import {
  Box, Typography, Button, Paper, CircularProgress,
  Alert, Chip, Divider
} from "@mui/material";
import {
  QrCodeScanner, CheckCircle, Cancel, Replay,
  Person, Event, LocationOn
} from "@mui/icons-material";
import api from "../services/api";

export default function CheckerPage() {
  const [status, setStatus] = useState<"idle"|"loading"|"valid"|"invalid"|"already_checked">("idle");
  const [ticketInfo, setTicketInfo] = useState<any>(null);
  const [error, setError] = useState("");

  const handleScan = async () => {
    const code = prompt("Entrer le code du billet :");
    if (!code) return;

    setStatus("loading");
    setError("");
    setTicketInfo(null);

    try {
      const res = await api.post("/registrations/verify", { ticketCode: code });
      setTicketInfo(res.data);
      setStatus(res.data.checkedIn ? "already_checked" : "valid");
    } catch (err: any) {
      const msg = err.response?.data?.message || "Billet invalide";
      setError(msg);
      setStatus("invalid");
    }
  };

  const handleReset = () => {
    setStatus("idle");
    setTicketInfo(null);
    setError("");
  };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3} textAlign="center">
        🔍 Scanner de Billets
      </Typography>

      {status === "idle" && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <QrCodeScanner sx={{ fontSize: 80, color: "grey.400" }} />
          <Typography variant="body2" color="text.secondary" mb={3}>
            Appuyez pour scanner un billet QR
          </Typography>
          <Button variant="contained" size="large"
            startIcon={<QrCodeScanner />} onClick={handleScan}>
            Scanner un billet
          </Button>
        </Paper>
      )}

      {status === "loading" && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <CircularProgress />
          <Typography mt={2}>Vérification en cours...</Typography>
        </Box>
      )}

      {status === "valid" && ticketInfo && (
        <Paper sx={{ p: 3, border: "2px solid #4caf50" }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <CheckCircle sx={{ fontSize: 60, color: "success.main" }} />
            <Typography variant="h6" color="success.main" fontWeight="bold">
              ✅ BILLET VALIDE
            </Typography>
            <Chip label="ACCÈS AUTORISÉ" color="success" sx={{ mt: 1 }} />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Person color="action" />
            <Typography>{ticketInfo.user?.firstName} {ticketInfo.user?.lastName}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Event color="action" />
            <Typography>{ticketInfo.event?.title}</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn color="action" />
            <Typography>{ticketInfo.event?.location}</Typography>
          </Box>
          <Button fullWidth variant="outlined" startIcon={<Replay />}
            onClick={handleReset} sx={{ mt: 3 }}>
            Scanner un autre billet
          </Button>
        </Paper>
      )}

      {status === "already_checked" && ticketInfo && (
        <Paper sx={{ p: 3, border: "2px solid #ff9800" }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <CheckCircle sx={{ fontSize: 60, color: "warning.main" }} />
            <Typography variant="h6" color="warning.main" fontWeight="bold">
              ⚠️ DÉJÀ SCANNÉ
            </Typography>
            <Chip label="BILLET DÉJÀ UTILISÉ" color="warning" sx={{ mt: 1 }} />
          </Box>
          <Divider sx={{ mb: 2 }} />
          <Typography variant="body2" color="text.secondary">
            Ce billet a déjà été utilisé pour entrer.
          </Typography>
          <Button fullWidth variant="outlined" startIcon={<Replay />}
            onClick={handleReset} sx={{ mt: 3 }}>
            Scanner un autre billet
          </Button>
        </Paper>
      )}

      {status === "invalid" && (
        <Paper sx={{ p: 3, border: "2px solid #f44336" }}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Cancel sx={{ fontSize: 60, color: "error.main" }} />
            <Typography variant="h6" color="error.main" fontWeight="bold">
              ❌ BILLET INVALIDE
            </Typography>
            <Chip label="ACCÈS REFUSÉ" color="error" sx={{ mt: 1 }} />
          </Box>
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          <Button fullWidth variant="outlined" color="error"
            startIcon={<Replay />} onClick={handleReset}>
            Réessayer
          </Button>
        </Paper>
      )}
    </Box>
  );
}
