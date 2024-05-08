import 'dotenv/config';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';

const port = process.env.PORT;
const app = express();

app.use(helmet());
app.disable('x-powered-by');
app.use(compression());

app.get('/', (request, response) => {
  response.send("Hello");
});

app.use((request, response, next) => {
  response.status(404).send("Error: Not found");
});
app.use((error, request, response, next) => {
  console.error(error.stack);
  response.status(error.status || 500).send("Error: Something went wrong");
});

const server = app.listen(port, () => {
  console.log(`App listening on port ${ port }...`);
});

process.on('SIGTERM', () => {
  server.close(async () => {
    //
  });
});
