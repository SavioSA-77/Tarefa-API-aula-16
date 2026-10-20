const express = require('express')
const app = express()
const PORT = 8000
app.set('json spaces', 4);
app.use(express.urlencoded({ extended: true }));

const greetings = {
    'pt-br': {
        world: 'Olá, mundo!',
        user: name => `Olá, ${name.toUpperCase()}!`,
        post: name => `Olá, ${name.toUpperCase()} via POST!`,
        missingName: 'O campo name é obrigatório'
    },
    es: {
        world: '¡Hola, mundo!',
        user: name => `¡Hola, ${name.toUpperCase()}!`,
        post: name => `¡Hola, ${name.toUpperCase()} desde POST!`,
        missingName: 'El campo name es obligatorio'
    },
    en: {
        world: 'Hello, world!',
        user: name => `Hello, ${name.toUpperCase()}!`,
        post: name => `Hello, ${name.toUpperCase()} from POST!`,
        missingName: 'The name field is required'
    }
};

function sendJson(req, res, status, output) {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp}, ${req.originalUrl}, ${JSON.stringify(output)}`);
    return res.status(status).json(output);
}

app.use('/v2', (req, res, next) => {
    const requestedLanguage = req.query.lang ?? req.body?.lang ?? 'pt-br';

    if (typeof requestedLanguage !== 'string') {
        return sendJson(req, res, 400, {
            error: 'lang must be one of: pt-br, es, en'
        });
    }

    const language = requestedLanguage.toLowerCase();
    if (!Object.prototype.hasOwnProperty.call(greetings, language)) {
        return sendJson(req, res, 400, {
            error: 'lang must be one of: pt-br, es, en'
        });
    }

    res.locals.language = language;
    next();
});

app.listen(PORT, ()=> {
    const msg = `Hello API running on PORT ${PORT}`
    const link = `http://localhost:${PORT}`
    const flink = `\x1b[1m${link}\x1b[0m`
    console.log(msg + '\n' + flink)
})

app.get('/v1/hi', function(req, res) {
    const out = {
        msg: "Hello, world!"
    }
    sendJson(req, res, 200, out)
})

app.get('/v1/hi/user/:name', function(req, res) {
    const out = {
        msg: "Hello, " + req.params.name.toUpperCase()
    }
    sendJson(req, res, 200, out)
})

app.post('/v1/hi', (req, res) => {
    const { name } = req.body;

    if (!name) {
        return sendJson(req, res, 400, { error: "Name is required" });
    }

    const out = {
        msg: `Hello, ${name.toUpperCase()} from POST!`,
    };
    sendJson(req, res, 200, out);
});

app.get('/v2/hi', (req, res) => {
    const out = {
        msg: greetings[res.locals.language].world
    };
    sendJson(req, res, 200, out);
});

app.get('/v2/hi/user/:name', (req, res) => {
    const out = {
        msg: greetings[res.locals.language].user(req.params.name)
    };
    sendJson(req, res, 200, out);
});

app.post('/v2/hi', (req, res) => {
    const { name } = req.body ?? {};
    const messages = greetings[res.locals.language];

    if (!name) {
        return sendJson(req, res, 400, { error: messages.missingName });
    }

    const out = {
        msg: messages.post(name)
    };
    sendJson(req, res, 200, out);
});

// express v4 use '/*'
// express v5 use '/*splat'
app.get('/*splat', function(req, res) {
    const err = {
        error: 'Invalid endpoint'
    }
    sendJson(req, res, 200, err)
})