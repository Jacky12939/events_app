import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, TextField, Button, Typography, Paper, Alert, CircularProgress
} from "@mui/material";
import { register } from "../services/auth.service";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center",
      bgcolor: "grey.100"
    }}>
      <Paper sx={{ p: 4, width: "100%", maxWidth: 400 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          🎫 EventFlow — Inscription
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Prénom" fullWidth sx={{ mb: 2 }}
          value={form.firstName}
          onChange={e => setForm({ ...form, firstName: e.target.value })}
        />
        <TextField
          label="Nom" fullWidth sx={{ mb: 2 }}
          value={form.lastName}
          onChange={e => setForm({ ...form, lastName: e.target.value })}
        />
        <TextField
          label="Email" fullWidth sx={{ mb: 2 }}
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />
        <TextField
          label="Mot de passe" type="password" fullWidth sx={{ mb: 3 }}
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
          onKeyDown={e => e.key === "Enter" && handleSubmit()}
        />

        <Button
          variant="contained" fullWidth size="large"
          onClick={handleSubmit} disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "S'inscrire"}
        </Button>

        <Typography textAlign="center" mt={2} variant="body2">
          Déjà un compte ?{" "}
          <Link to="/login" style={{ color: "#1976d2" }}>Se connecter</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
