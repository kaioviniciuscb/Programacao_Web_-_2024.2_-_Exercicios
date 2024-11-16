const app = require('./app');
const port = 3030;
const cors = require('cors');
const animeController = require('./controllers/animeController');

app.use(cors());

app.listen(port, () => {
    console.log(`HTTP server running at http://localhost:${port}`);
});

app.get('/animes', animeController.getAll);
app.get('/animes/:id', animeController.getById);
app.post('/animes', animeController.add);
app.put('/animes/:id', animeController.update);
app.delete('/animes/:id', animeController.delete);