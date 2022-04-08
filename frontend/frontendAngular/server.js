const express = require('express');
const app = express();
const appName = 'frontend-angular';
const outputPath = `${__dirname}/dist/${appName}`;

app.use(express.static(outputPath));
app.get('/*', (req, resp) => {
    res.sendFile(`${outputPath}/index.html`);
});
app.listen(process.env.PORT);