import express from 'express';

const app = express();

app.get('/', (_, res) => {
	res.send('Hello!');
});

app.listen(3333, () => {
	console.log('Server started on port 3333');
});
