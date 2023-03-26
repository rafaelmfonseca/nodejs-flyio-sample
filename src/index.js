import serveIndex from 'serve-index';
import express from 'express';
import dotenv from 'dotenv';

const app = express();
app.use('/public', express.static('public'), serveIndex('public', { icons: true }));

dotenv.config();

function getEnvsWithPrefix(prefix) {
    const reduceFn = function(obj, key) {
        obj[key] = process.env[key];
        return obj;
    };

    return Object.keys(process.env).filter(key => key.startsWith(prefix)).reduce(reduceFn, {});
}

app.get('/hello-world', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/secrets', (req, res) => {
    res.send(/* html */ `
        <section>
            <strong>secrets fly.io:</strong>
            <pre><code>${JSON.stringify(getEnvsWithPrefix('FLYIO_'))}</pre></code>
        </section>
        <section>
            <strong>secrets Dockerfile:</strong>
            <pre><code>${JSON.stringify(getEnvsWithPrefix('DOCKERFILE_'))}</pre></code>
        </section>
        <section>
            <strong>secrets .env:</strong>
            <pre><code>${JSON.stringify(getEnvsWithPrefix('DOTENV_'))}</pre></code>
        </section>
        <section>
            <strong>secrets fly.toml:</strong>
            <pre><code>${JSON.stringify(getEnvsWithPrefix('FLYTOMLENV_'))}</pre></code>
        </section>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000 🚀');
});
