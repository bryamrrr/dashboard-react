import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.static('dist/statics'));

app.listen(8081);
