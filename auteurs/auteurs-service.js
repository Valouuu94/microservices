const express = require('express');
const bodyParser = require('body-parser');
const api = express();

api.use(bodyParser.json());

let auteurs = [{
        id: 1,
        name: 'Eichiro oda',
    },
    {
        id: 2,
        name: 'Auteur test 2',
    },
    {
        id: 3,
        name: 'Auteur test 3',
    },
    {
        id: 4,
        name: 'Auteur test 4',
    },
];

api.get('/auteurs', (req, res) => {
    res.json(auteurs);
});

api.get('/auteurs/:id', (req, res) => {
    const auteurId = parseInt(req.params.id);
    const auteur = auteurs.find((auteur) => auteur.id === auteurId);

    if (auteur) {
        res.json(auteur);
    } else {
        res.json(`auteur ${auteurId} pas trouvé`);
    }
});

api.post('/auteurs', (req, res) => {
    const { id, name } = req.body;

    if (id && name) {
        const auteur = { id, name };
        auteurs.push(auteur);
        res.json(auteur);
    } else {
        res.status(400).json({ message: 'donnée auteur invalide' });
    }
});

api.delete('/auteurs/:id', (req, res) => {
    const auteurId = parseInt(req.params.id);
    const index = auteurs.findIndex((auteur) => auteur.id === auteurId);

    if (index !== -1) {
        auteurs.splice(index, 1);
        res.json({ message: `auteur ${auteurId} supprimé` });
    } else {
        res.status(404).json({ message: `auteur ${auteurId} pas trouvé` });
    }
});

api.listen(4001, () => {
    console.log('auteurs service start sur le port 4001');
});