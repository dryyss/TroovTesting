# Troov - Application de Gestion de Tâches et Calendrier

![Logo Troov](frontend/assets/images/logo.png)

## 📋 Description

Cette application web a été développée dans le cadre d'un test technique pour l'entreprise Troov. Elle présente un tableau Kanban pour la gestion des tâches ainsi qu'un calendrier interactif, démontrant les compétences en développement full-stack avec Vue.js/Nuxt.js et Node.js.

## ✨ Fonctionnalités

### 🎯 Tableau Kanban

- Gestion des tâches avec système drag & drop
- 3 colonnes : À faire, En cours, Terminé
- Création, modification et suppression de tâches
- Persistance automatique des changements

### 📅 Calendrier

- Vue mensuelle interactive
- Création et gestion d'événements
- Affichage intuitif des événements par jour
- Modification et suppression rapide

### 🔐 Authentification & Sécurité

- Inscription et connexion sécurisées
- Gestion de profil utilisateur
- Protection des routes
- Tokens JWT pour l'authentification

## 🛠 Technologies Utilisées

### Frontend

- Vue.js 2 avec Nuxt.js
- Tailwind CSS pour le style
- Axios pour les requêtes HTTP
- Vue-toastification pour les notifications

### Backend

- Node.js avec Express
- MongoDB avec Mongoose
- JWT pour l'authentification
- Bcrypt pour le hachage des mots de passe

## 🚀 Installation

### Prérequis

- Node.js (v14 ou supérieur)
- MongoDB
- Git

### Configuration

1. Clonez le repository :

```bash
git clone https://github.com/votre-username/TroovTesting.git
cd TroovTesting
```

2. Installation des dépendances :

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Configuration des variables d'environnement :

Créez un fichier `.env` dans le dossier backend :

```env
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
PORT=3001
```

Créez un fichier `.env` dans le dossier frontend :

```env
API_URL=http://localhost:3001
```

4. Démarrage des serveurs :

```bash
# Backend
cd backend
npm run dev

# Frontend (dans un nouveau terminal)
cd frontend
npm run dev
```

L'application sera accessible à l'adresse : `http://localhost:3000`

## 📱 Utilisation

1. **Inscription/Connexion**

   - Créez un compte ou connectez-vous
   - Accédez à votre tableau de bord personnalisé

2. **Gestion des Tâches**

   - Créez des tâches avec titre et description
   - Déplacez-les entre les colonnes par drag & drop
   - Modifiez ou supprimez les tâches existantes

3. **Gestion du Calendrier**
   - Ajoutez des événements en cliquant sur une date
   - Visualisez vos événements dans la vue mensuelle
   - Modifiez ou supprimez les événements facilement

## 👨‍💻 Auteur

- **Andrys** - _Développeur Full Stack_ - [GitHub](https://github.com/dryyss)

## 🙏 Remerciements

- Un grand merci à l'équipe de Troov pour cette opportunité de test technique
- La communauté open source pour les outils et bibliothèques utilisés

---

⌨️ avec ❤️ par [Andrys](https://github.com/dryyss)