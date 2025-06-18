import app from './app';

const port: number = 3000;

app.listen(port, (): void => {
    console.log();
    console.log(`Escutando na porta ${port}`);
    console.log(`CTRL + Clique em http://localhost:${port}`);
});