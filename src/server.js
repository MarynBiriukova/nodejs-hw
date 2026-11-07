import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import pino from 'pino-http';

const app = express();

const PORT = process.env.PORT ?? 3000;

// Middleware для парсингу JSON
app.use(express.json());
app.use(cors()); // Дозволяє запити з будь-яких джерел
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);


app.get('/notes', (req, res) => {
  res.status(200).json({
    message: "Retrieved all notes",
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { id_param } = req.params.noteId;
  res.status(200).json({ "message": `Retrieved note with ID: ${id_param}` });
});

// Маршрут для тестування middleware помилки
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});


// Middleware 404 (після всіх маршрутів)
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware для обробки помилок (останнє)
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
    ? "Something went wrong. Please try again later."
    :  err.message,
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
