#  Event Management API

API REST de gestion d'événements construite avec **NestJS**, **Prisma**, **PostgreSQL** et sécurisée avec **JWT + Bcrypt**.

---

## Stack technique

| Technologie     | Rôle                          |
|----------------|-------------------------------|
| NestJS 11       | Framework backend              |
| Prisma 6        | ORM / accès base de données   |
| PostgreSQL      | Base de données relationnelle |
| JWT (Passport)  | Authentification stateless    |
| Bcrypt          | Hachage des mots de passe     |
| QRCode          | Génération de billets QR      |
| Swagger         | Documentation API interactive |
| class-validator | Validation des DTOs           |

---

##  Rôles utilisateurs

| Rôle          | Description                                                   |
|--------------|---------------------------------------------------------------|
| `ADMIN`       | Tous les droits. Crée les organisateurs.                     |
| `ORGANIZER`   | Crée, modifie, supprime ses événements. Voit son dashboard.  |
| `PARTICIPANT` | S'inscrit aux événements, reçoit un billet avec QR Code.     |

---

##  Structure du projet

```
backend/
├── .env
├── package.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
└── src/
    ├── main.ts
    ├── app.module.ts
    ├── prisma/
    │   ├── prisma.service.ts
    │   └── prisma.module.ts
    ├── auth/
    │   ├── dto/
    │   │   ├── register.dto.ts
    │   │   └── login.dto.ts
    │   ├── strategies/
    │   │   └── jwt.strategy.ts
    │   ├── guards/
    │   │   ├── jwt-auth.guard.ts
    │   │   └── roles.guard.ts
    │   ├── decorators/
    │   │   ├── roles.decorator.ts
    │   │   └── current-user.decorator.ts
    │   ├── auth.service.ts
    │   ├── auth.controller.ts
    │   └── auth.module.ts
    ├── users/
    │   ├── users.service.ts
    │   ├── users.controller.ts
    │   └── users.module.ts
    ├── events/
    │   ├── dto/
    │   │   ├── create-event.dto.ts
    │   │   ├── update-event.dto.ts
    │   │   └── filter-event.dto.ts
    │   ├── events.service.ts
    │   ├── events.controller.ts
    │   └── events.module.ts
    └── registrations/
        ├── registrations.service.ts
        ├── registrations.controller.ts
        └── registrations.module.ts
```

---

##  Installation

### Prérequis

- Node.js >= 18
- PostgreSQL en cours d'exécution
- npm ou yarn

### 1. Cloner et installer les dépendances

```bash
cd backend
npm install
```

### 2. Configurer les variables d'environnement

Modifier le fichier `.env` à la racine :

```env
DATABASE_URL="postgresql://postgres:VOTRE_MOT_DE_PASSE@localhost:5432/event_app?schema=public"
JWT_SECRET="votre_secret_jwt_tres_long_et_securise"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### 3. Migrer la base de données

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Seeder l'administrateur et les catégories

```bash
npx ts-node prisma/seed.ts
```

Identifiants admin créés :
- **Email** : `admin@eventapp.com`
- **Mot de passe** : `Admin@1234`

### 5. Lancer l'application

```bash
# Développement (hot reload)
npm run start:dev

# Production
npm run build
npm run start:prod
```

---

##  Documentation Swagger

Une fois l'application lancée, la documentation interactive est disponible sur :

```
http://localhost:3000/api/docs
```

> Pour tester les routes protégées : cliquez sur **Authorize** en haut à droite et entrez votre token JWT sous la forme `Bearer `.

---

##  Routes API

###  Auth — `/api/auth`

| Méthode | Route                        | Description                         | Accès      |
|---------|------------------------------|-------------------------------------|------------|
| POST    | `/auth/register`             | Inscription d'un participant        | Public     |
| POST    | `/auth/login`                | Connexion et récupération du token  | Public     |
| POST    | `/auth/admin/create-organizer` | Créer un compte organisateur      | ADMIN      |

### 👤 Users — `/api/users`

| Méthode | Route       | Description                        | Accès      |
|---------|------------|-------------------------------------|------------|
| GET     | `/users/me` | Récupérer le profil connecté        | Authentifié |
| GET     | `/users`    | Lister tous les utilisateurs        | ADMIN      |

###  Events — `/api/events`

| Méthode | Route                          | Description                                   | Accès       |
|---------|-------------------------------|-----------------------------------------------|-------------|
| GET     | `/events`                      | Événements publiés (filtres disponibles)      | Public      |
| GET     | `/events/:id`                  | Détail d'un événement                         | Public      |
| GET     | `/events/organizer/dashboard`  | Dashboard stats de l'organisateur             | ORGANIZER   |
| GET     | `/events/organizer/my-events`  | Mes événements avec filtres                   | ORGANIZER   |
| POST    | `/events`                      | Créer un événement                            | ORGANIZER   |
| PATCH   | `/events/:id`                  | Modifier un événement                         | ORGANIZER   |
| DELETE  | `/events/:id`                  | Supprimer un événement                        | ORGANIZER   |

#### Paramètres de filtrage (query params) pour `GET /events` :

| Paramètre    | Type   | Description                    |
|-------------|--------|-------------------------------|
| `title`      | string | Recherche par titre (insensible à la casse) |
| `location`   | string | Filtrer par localisation       |
| `categoryId` | string | Filtrer par catégorie (UUID)   |
| `dateFrom`   | string | Date de début minimum (ISO)    |
| `dateTo`     | string | Date de début maximum (ISO)    |

###  Registrations — `/api/registrations`

| Méthode | Route                                    | Description                           | Accès       |
|---------|------------------------------------------|---------------------------------------|-------------|
| POST    | `/registrations/events/:eventId`         | S'inscrire à un événement             | PARTICIPANT |
| GET     | `/registrations/my`                      | Mes inscriptions et billets           | PARTICIPANT |
| GET     | `/registrations/:id/ticket`              | Récupérer un billet avec QR Code      | PARTICIPANT |
| DELETE  | `/registrations/events/:eventId`         | Se désinscrire d'un événement         | PARTICIPANT |
| GET     | `/registrations/events/:eventId/participants` | Liste des participants          | ORGANIZER   |

---

##  Sécurité

### Authentification JWT

- Le token est généré lors de la connexion (`/auth/login`) ou l'inscription (`/auth/register`)
- Durée de validité configurable via `JWT_EXPIRES_IN` (défaut : `7d`)
- À envoyer dans chaque requête protégée via le header :

```
Authorization: Bearer 
```

### Gestion des erreurs

| Code HTTP | Cas                                          |
|-----------|----------------------------------------------|
| `400`     | Données invalides ou inscription en doublon  |
| `401`     | Token absent, invalide ou expiré             |
| `403`     | Rôle insuffisant pour cette action           |
| `404`     | Ressource introuvable                        |
| `409`     | Email déjà utilisé lors de l'inscription     |

### Hachage des mots de passe

Les mots de passe sont hachés avec **bcrypt** (salt rounds : 12) avant stockage. Ils ne sont jamais retournés dans les réponses API.

---

##  Système de billets

Lors de l'inscription à un événement publié, le système :

1. Vérifie que l'événement est **publié** et que des **places sont disponibles**
2. Vérifie que le participant n'est **pas déjà inscrit**
3. Génère un **code de billet unique** (UUID v4)
4. Génère un **QR Code en base64** encodant : code du billet, titre de l'événement, ID participant
5. Retourne le billet complet avec le QR Code prêt à l'affichage

---

## Statuts des événements

| Statut      | Description                                      |
|------------|--------------------------------------------------|
| `DRAFT`     | Brouillon, non visible par les participants      |
| `PUBLISHED` | Publié, visible et ouvert aux inscriptions       |
| `CANCELLED` | Annulé, plus d'inscriptions possibles           |

---

## Commandes utiles

```bash
# Générer le client Prisma après modification du schéma
npx prisma generate

# Créer une nouvelle migration
npx prisma migrate dev --name nom_de_la_migration

# Ouvrir Prisma Studio (interface visuelle DB)
npx prisma studio

# Lancer le seed
npx ts-node prisma/seed.ts

# Formater le code
npm run format

# Build production
npm run build
```

---

## 📝 Exemple d'utilisation

### 1. Connexion Admin

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eventapp.com","password":"Admin@1234"}'
```

### 2. Créer un organisateur (avec le token admin)

```bash
curl -X POST http://localhost:3000/api/auth/admin/create-organizer \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{"email":"org@test.com","firstName":"Paul","lastName":"Biya","password":"Org@1234"}'
```

### 3. Créer un événement (avec le token organisateur)

```bash
curl -X POST http://localhost:3000/api/events \
  -H "Authorization: Bearer " \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Festival de Jazz de Douala",
    "description": "Grand festival annuel",
    "location": "Douala, Cameroun",
    "startDate": "2025-08-15T09:00:00Z",
    "endDate": "2025-08-17T23:00:00Z",
    "capacity": 500,
    "status": "PUBLISHED"
  }'
```

### 4. Inscription d'un participant

```bash
curl -X POST http://localhost:3000/api/registrations/events/ \
  -H "Authorization: Bearer "
```

---

##  Auteur

Projet généré avec NestJS CLI — Architecture modulaire, sécurisée et prête pour la production.
