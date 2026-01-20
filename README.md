# ESURSI-APP | Portail du Ministère de l'ESURSI

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)

**ESURSI-APP** est le portail web officiel du Ministère de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante (ESURSI) de la République Démocratique du Congo. Conçu avec une approche moderne et une esthétique premium, il sert de vitrine institutionnelle et d'outil de communication directe entre le ministère et les citoyens.

---

## 🌟 Fonctionnalités Clés

### 🏛️ Patrimoine & Histoire
- **Évolution Temporelle** : Une section dédiée retraçant l'histoire de l'enseignement supérieur en RDC, de l'Université Lovanium à la révolution numérique actuelle.
- **Biographie Ministérielle** : Présentation détaillée du parcours académique et professionnel de la Ministre (S.E. Prof. Dr. Marie-Thérèse Sombo Ayanne Safi Mukuna) avec une interface dynamique et immersive.

### 🏢 Structure Organisationnelle
- **Exploration des Organes** : Visualisation complète de la structure du ministère via une interface modale interactive, présentant les différents services et départements.
- **Missions Institutionnelles** : Clarification des objectifs stratégiques du ministère pour le développement scientifique de la nation.

### � Communication & Support
- **Système de Contact Avancé** : Formulaire de contact intégré avec validation en temps réel.
- **Gestion des Annexes** : Possibilité pour les usagers de joindre des photos et documents à leurs messages (hébergement sécurisé via Cloudinary).
- **Formalisme Administratif** : Génération automatique d'emails formatés selon le protocole des lettres administratives officielles pour une meilleure gestion par le cabinet.

### 📚 Contenu Dynamique
- **Cycles & Programmes** : Synchronisation en temps réel avec la plateforme de gestion académique pour afficher les offres de formation disponibles.
- **Recherche & Orientation** : Outil de recherche intégré pour faciliter l'accès aux informations critiques.

---

## �️ Stack Technique

- **Framework** : [Next.js 16](https://nextjs.org/) (App Router, Server Actions)
- **UI & Animation** : [React 19](https://reactjs.org/), [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion 12](https://www.framer.com/motion/)
- **Composants Dynamiques** : [Swiper 12](https://swiperjs.com/) pour les carrousels interactifs.
- **Services Backend** :
  - **Emailing** : [Nodemailer](https://nodemailer.com/) avec SMTP sécurisé.
  - **Stockage Média** : [Cloudinary API](https://cloudinary.com/).
  - **Notifications** : [React Hot Toast](https://react-hot-toast.com/).

---

## 🚀 Installation & Lancement

1. **Clonage du dépôt** :
   ```bash
   git clone https://github.com/gaida-lisongo/elmes-esursi.git
   cd solid-nextjs-main
   ```

2. **Configuration environnementale** :
   Créez un fichier `.env.local` à la racine et renseignez vos identifiants :
   ```env
   # SMTP Configuration
   SMTP_HOST=...
   SMTP_PORT=...
   SMTP_USER=...
   SMTP_PASS=...

   # Cloudinary Configuration
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

3. **Installation des dépendances** :
   ```bash
   pnpm install
   ```

4. **Lancement en développement** :
   ```bash
   pnpm dev
   ```

---

## 🏗️ Architecture du Projet

- `app/` : Routes (App Router) et Logique Serveur (Server Actions).
- `components/` : Composants UI modulaires (Header, Footer, History, Bibliographie, etc.).
- `public/` : Assets statiques et images institutionnelles.
- `types/` : Définitions TypeScript pour une intégrité des données maximale.

---

## � Licence

Ce projet est la propriété du **Ministère de l'ESURSI - RDC**. Développé en collaboration avec **ELMES**.

&copy; 2026 Ministère de l'Enseignement Supérieur, Universitaire et Recherche Scientifique Innovante. Tous droits réservés.
