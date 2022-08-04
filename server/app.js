const express = require('express');
const app = express();
const port = 3003;
const cors = require('cors');
app.use(cors());
const mysql = require('mysql');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'colt',
});

// keliai (routai)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// READ
// SELECT column1, column2, ... (id, type, title, ...)
// FROM table_name;

// arba

// SELECT * FROM table_name;

// JOIN
// SELECT column_name(s)
// FROM table1
// LEFTJOIN table2
// ON table1.column_name = table2.column_name;

app.get('/coltai', (req, res) => {
  const sql = `
    SELECT
    registrationCode, isBusy, lastUseTime, totalRideKilometres, p.id, color, GROUP_CONCAT(k.com, '-^o^-') AS comments, GROUP_CONCAT(k.id) AS coms_id
    FROM paspirtukai AS p
    LEFT JOIN spalvos AS s
    ON p.colt_id = s.id
    LEFT JOIN komentarai AS k
    ON k.pasp_id = p.id
    GROUP BY p.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// READ COLORS

app.get('/spalvos', (req, res) => {
  const sql = `
    SELECT
    s.color, s.id, COUNT(p.id) AS total
    FROM paspirtukai AS p
    RIGHT JOIN spalvos AS s
    ON p.colt_id = s.id
    GROUP BY s.id
    ORDER BY s.color
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// FRONT COLORS

app.get('/front/spalvos', (req, res) => {
  const sql = `
    SELECT
    s.color, s.id, COUNT(p.id) AS total, GROUP_CONCAT(p.registrationCode) as pasp_nr
    FROM paspirtukai AS p
    RIGHT JOIN spalvos AS s
    ON p.colt_id = s.id
    GROUP BY s.id
    ORDER BY s.color
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// FRONT COLTS

// app.get('/front/coltai', (req, res) => {
//   const sql = `
//     SELECT
//     registrationCode, isBusy, lastUseTime, totalRideKilometres, p.id, color
//     FROM paspirtukai AS p
//     LEFT JOIN spalvos AS s
//     ON p.colt_id = s.id
//     `;
//   con.query(sql, (err, result) => {
//     if (err) throw err;
//     res.send(result);
//   });
// });

app.get('/front/coltai', (req, res) => {
  const sql = `
    SELECT
    registrationCode, isBusy, lastUseTime, totalRideKilometres, p.id, color, GROUP_CONCAT(k.com, '-^o^-') AS comments
    FROM paspirtukai AS p
    LEFT JOIN spalvos AS s
    ON p.colt_id = s.id
    LEFT JOIN komentarai AS k
    ON k.pasp_id = p.id
    GROUP BY p.id
    `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE
// INSERT INTO table_name (column1, column2, column3, ....
// VALUES (value1, value2, value3, ...)

app.post('/coltai', (req, res) => {
  const sql = `
  INSERT INTO paspirtukai
  (registrationCode, isBusy, lastUseTime, totalRideKilometres, colt_id)
  VALUES (?, ?, ?, ?, ?)
  `;
  con.query(
    sql,
    [
      req.body.registrationCode,
      req.body.isBusy,
      req.body.lastUseTime,
      req.body.totalRideKilometres,
      req.body.color !== '0' ? req.body.color : null,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

// CREATE COLORS

app.post('/spalvos', (req, res) => {
  const sql = `
  INSERT INTO spalvos
  (color)
  VALUES (?)
  `;
  con.query(sql, [req.body.color], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE COMMENTS

app.post('/front/komentarai', (req, res) => {
  const sql = `
  INSERT INTO komentarai
  (com, pasp_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.com, req.body.coltId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE
// DELETE FROM table_name WHERE condition;

app.delete('/coltai/:coltId', (req, res) => {
  const sql = `
  DELETE FROM paspirtukai
  WHERE id = ?
  `;
  con.query(sql, [req.params.coltId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE COLORS

app.delete('/spalvos/:colorId', (req, res) => {
  const sql = `
  DELETE FROM spalvos
  WHERE id = ?
  `;
  con.query(sql, [req.params.colorId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE COMMENTS

app.delete('/komentarai/:comId', (req, res) => {
  const sql = `
  DELETE FROM komentarai
  WHERE id = ?
  `;
  con.query(sql, [req.params.comId], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// EDIT
// // UPDATE table_name
// SET column1 = value1, column2 = value2, ...
// WHERE condition;

app.put('/coltai/:coltId', (req, res) => {
  const sql = `
   UPDATE paspirtukai
   SET registrationCode = ?, isBusy = ?, lastUseTime= ?, totalRideKilometres= ?, colt_id= ?
   WHERE id = ?
    `;
  con.query(
    sql,
    [
      req.body.registrationCode,
      req.body.isBusy,
      req.body.lastUseTime,
      req.body.totalRideKilometres,
      req.body.color,
      req.params.coltId,
    ],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(port, () => {
  console.log(`Koltai rieda ant ${port} porto.`);
});
