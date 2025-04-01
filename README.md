# mern-app

mern-app/
├── .gitignore
├── README.md
├── package.json (optional root-level package.json for shared scripts)
│
├── client/
│   ├── .gitignore (client-specific if needed)
│   ├── package.json
│   ├── public/
│   └── src/
│
├── server/
│   ├── .gitignore (server-specific if needed)
│   ├── package.json
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   └── .env.example (template for environment variables)
│
└── database-config/
    ├── migrations/
    ├── seeds/
    └── db.js