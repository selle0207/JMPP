# Frontend - Jeunesse en Mouvement pour la Paix

Site web public de la plateforme JMP.

## 🚀 Installation

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build pour production
npm run build
```

## 📁 Placement du logo

1. Créez le dossier `public/images/` s'il n'existe pas
2. Placez le fichier logo dans : `public/images/logo-jmp.png`

```bash
mkdir -p public/images
# Copier le logo ici
```

## ⚙️ Configuration

Créez un fichier `.env` à la racine du dossier frontend :

```env
VITE_API_URL=http://localhost:3001
VITE_GOOGLE_FORM_URL=https://forms.gle/VOTRE_LIEN
```

## 🎨 Technologies

- **React** avec Vite
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes

## 📦 Structure

```
frontend/
├── public/
│   └── images/
│       └── logo-jmp.png    ← Placez le logo ici
├── src/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
└── package.json
```

## 🌐 Accès

Le site sera accessible sur : `http://localhost:5173`