const http = require('http');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'admin',
  host: '163.123.183.79',
  database: 'table',
  password: '12345678',
  port: 17477,
});

const host = 'localhost';
const port = 8000;

let totalCount = 0;

const requestListener = async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', 'GET');
  res.setHeader('Access-Control-Request-Headers', 'Content-Type');
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  const pageNumber = Object.fromEntries(new URLSearchParams(req.url.replace('/', ''))).page;

  if (totalCount === 0) {
    const data = await pool.query(`SELECT * FROM data`);
    totalCount = data.rows.length;
  }
  res.setHeader('X-Total-Count', totalCount);

  if (pageNumber) {
    const firstId = 1 * (20 * (Number(pageNumber) - 1));
    const lastId = 1 * (20 * Number(pageNumber));

    const data = await pool.query(`SELECT * FROM data WHERE ID >= ${firstId} AND ID < ${lastId}`);

    res.end(JSON.stringify(data.rows));
  } else {
  }

  res.statusCode = 200;
  res.end();
};
const server = http.createServer(requestListener);

//start server and connect database
async function start() {
  try {
    await pool.connect();

    server.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
