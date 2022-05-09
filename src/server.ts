import app from '.';

const PORT = process.env.PORT ?? 3000;
const HOSTNAME = process.env.HOSTNAME ?? 'localhost';

app.listen(PORT, () =>
  console.log(
    `🚀 Running ${process.env.NODE_ENV} mode in http://${HOSTNAME}:${PORT}`
  )
);
