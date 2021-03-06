const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const AppRouter = require('./routes/AppRouter');

const PORT = process.env.PORT || 4000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (process.env.NODE_ENV && process.env.NODE_ENV !== 'development') {
	app.get('*', (req, res) => {
		res.sendFile('build/index.html', { root: __dirname })
	})
}

app.use('/', AppRouter);

// Implement route for errors
app.use((err, req, res, next) => {
	console.error(err.stack)
	res.status(500).send('Something broke!')
})

// Start express app
app.listen(PORT, function () {
	console.log(`Server is running on: ${PORT}`)
})