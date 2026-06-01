import { useEffect, useState } from "react";
import {
  Box, Typography, Button, Card, CardContent, CardActions,
  Chip, CircularProgress, Alert, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Grid, IconButton,
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, Paper
} from "@mui/material";
import { Add, Edit, Delete, People, Save, Close } from "@mui/icons-material";
import {
  getMyEvents, createEvent, updateEvent,
  deleteEvent, getEventParticipants
} from "../services/event.service";

export default function OrganizerPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [participants, setParticipants] = useState<any[]>([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedEventTitle, setSelectedEventTitle] = useState("");
  const [form, setForm] = useState({
    title: "", description: "", date: "",
    location: "", capacity: ""
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    getMyEvents()
      .then(setEvents)
      .catch(() => setError("Impossible de charger vos événements"))
      .finally(() => setLoading(false));
  };

  const openCreate = () => {
    setEditingEvent(null);
    setForm({ title: "", description: "", date: "", location: "", capacity: "" });
    setShowForm(true);
  };

  const openEdit = (evt: any) => {
    setEditingEvent(evt);
    setForm({
      title: evt.title, description: evt.description || "",
      date: evt.date?.split("T")[0], location: evt.location,
      capacity: String(evt.capacity)
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const data = { ...form, capacity: Number(form.capacity) };
      if (editingEvent) {
        await updateEvent(editingEvent.id, data);
        setSuccess("Événement modifié !");
      } else {
        await createEvent(data);
        setSuccess("Événement créé !");
      }
      setShowForm(false);
      loadEvents();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteEvent(id);
      setSuccess("Événement supprimé !");
      setDeleteConfirm(null);
      loadEvents();
    } catch {
      setError("Erreur lors de la suppression");
    }
  };

  const handleViewParticipants = async (evt: any) => {
    setSelectedEventTitle(evt.title);
    try {
      const data = await getEventParticipants(evt.id);
      setParticipants(data);
      setShowParticipants(true);
    } catch {
      setError("Impossible de charger les participants");
    }
  };

  if (loading) return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          🎯 Mes Événements
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={openCreate}>
          Créer
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>{success}</Alert>}

      {events.length === 0 ? (
        <Alert severity="info">Vous n'avez pas encore d'événements.</Alert>
      ) : (
        <Grid container spacing={2}>
          {events.map((evt) => (
            <Grid item xs={12} md={6} key={evt.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                    <Typography fontWeight="bold">{evt.title}</Typography>
                    <Chip
                      label={evt.status}
                      color={evt.status === "PUBLISHED" ? "success" : "default"}
                      size="small"
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    📅 {new Date(evt.date).toLocaleDateString("fr-FR")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {evt.location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    👥 {evt.registrationCount || 0} / {evt.capacity} inscrits
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton color="info" onClick={() => handleViewParticipants(evt)}>
                    <People />
                  </IconButton>
                  <IconButton color="primary" onClick={() => openEdit(evt)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => setDeleteConfirm(evt.id)}>
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog créer/modifier */}
      <Dialog open={showForm} onClose={() => setShowForm(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEvent ? "✏️ Modifier" : "➕ Créer"} un événement
          <IconButton sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setShowForm(false)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
          <TextField label="Titre" fullWidth value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })} />
          <TextField label="Description" fullWidth multiline rows={3}
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })} />
          <TextField label="Date" type="date" fullWidth value={form.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
            InputLabelProps={{ shrink: true }} />
          <TextField label="Lieu" fullWidth value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })} />
          <TextField label="Capacité" type="number" fullWidth value={form.capacity}
            onChange={e => setForm({ ...form, capacity: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowForm(false)}>Annuler</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave}>
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog participants */}
      <Dialog open={showParticipants} onClose={() => setShowParticipants(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          👥 Participants — {selectedEventTitle}
          <IconButton sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={() => setShowParticipants(false)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          {participants.length === 0
            ? <Alert severity="info">Aucun participant.</Alert>
            : <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nom</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Check-in</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {participants.map((p: any) => (
                      <TableRow key={p.id}>
                        <TableCell>{p.user?.firstName} {p.user?.lastName}</TableCell>
                        <TableCell>{p.user?.email}</TableCell>
                        <TableCell>
                          <Chip
                            label={p.checkedIn ? "✅ Présent" : "⏳ En attente"}
                            color={p.checkedIn ? "success" : "default"}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
          }
        </DialogContent>
      </Dialog>

      {/* Dialog suppression */}
      <Dialog open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Voulez-vous vraiment supprimer cet événement ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirm(null)}>Annuler</Button>
          <Button color="error" variant="contained"
            onClick={() => handleDelete(deleteConfirm!)}>Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
