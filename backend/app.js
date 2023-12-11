require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const routeFilms = require('./routes/films');
const routeRealisateurs = require('./routes/realisateurs');
const routeSagas = require('./routes/sagas');
const routeSeries = require('./routes/series');
const routeSaisons = require('./routes/saisons');
const routeEpisodes = require('./routes/episodes');
const routeArtistes = require('./routes/artistes');


mongoose.connect(process.env.MONGOOSE_PASS,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(cors());
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use("/api/films", routeFilms)
app.use("/api/realisateurs", routeRealisateurs)
app.use("/api/sagas", routeSagas)
app.use("/api/series", routeSeries)
app.use("/api/saisons", routeSaisons)
app.use("/api/episodes", routeEpisodes)
app.use("/api/artistes", routeArtistes)

module.exports = app;