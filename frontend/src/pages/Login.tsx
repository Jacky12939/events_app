import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box, TextField, Button, Typography, Paper, Alert, CircularProgress
} from "@mui/material";
import { login } from "../services/auth.service";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      const role = data.user?.role;
      if (role === "ORGANIZER" || role === "ADMIN") {
        navigate("/dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Identifiants incorrects");
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
          🎫 EventFlow — Connexion
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

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
          {loading ? <CircularProgress size={24} /> : "Se connecter"}
        </Button>

        <Typography textAlign="center" mt={2} variant="body2">
          Pas de compte ?{" "}
          <Link to="/register" style={{ color: "#1976d2" }}>S'inscrire</Link>
        </Typography>
      </Paper>
    </Box>
  );
}
