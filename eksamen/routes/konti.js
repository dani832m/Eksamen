var express = require('express');
var router = express.Router();

// Inkluderer database og angiver port til forbindelse
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

/*
  1. Komplet liste over konti i databasen indsat i HTML-tabel
*/
router.get('/', function (req, res, next) { // Route handler på roden
  MongoClient.connect(url, function (err, db) { // Connecter til DB via MongoClient
    if (err) throw err; // Viser fejlbesked, hvis der opstår error
    var dbo = db.db("CryptoBank"); // Henviser til databasens navn
    // Leder i collection og tilføjer til array
    dbo.collection("Konti").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {}; // Nyt objekt uden indhold
      obj.title = 'Crypto Bank | Tabel over alle konti i systemet';
      obj.konti = result; // Angiver, at respons fra DB skal tilføjes objektet
      res.render('konti', obj); // Renderer objektets indhold til endpoint
      db.close(); // Lukker forbindelse til database
    });
  });
});

/*
  2. Komplet liste over alle konti vist som array i JSON-format (GET request)
*/
router.get('/json', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("CryptoBank");
    dbo.collection("Konti").find({}).toArray(function (err, result) {
      if (err) throw err;
      var obj = {};
      obj.konti = result;
      res.json(obj); // Her fortæller vi, at den skal rendere indholdet af objektet som JSON
      console.log("Komplet liste over alle brugere/konti vises som JSON.");
      db.close();
    });
  });
});

/*
  3. Opretter en ny bruger i databasen (POST request)
*/
router.post('/post', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("CryptoBank");
    var konto = {};
    // Kobler de nye keys med brugerindtastningen
    konto.Uid = Number(req.body.Uid);
    konto.kodeord = req.body.kodeord;
    konto.cpr = Number(req.body.cpr);
    konto.fornavn = req.body.fornavn;
    konto.efternavn = req.body.efternavn;
    dbo.collection("Konti").insertOne(konto, function (err, res) {
      if (err) throw err;
      console.log("Bruger blev tilføjet til den valgte collection.");
      db.close();
    });
    // Videresender til den samlede oversigt
    res.redirect("/konti");
  });
});

/*
  4. Fjerner en specifik bruger/konto fra databasen (DELETE request)
*/
router.post('/delete/:Uid', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("CryptoBank");
    var Uid = Number(req.params.Uid);
    dbo.collection("Konti").deleteOne({Uid}, function (err, res) {
      if (err) throw err;
      var obj = {};
      obj.konto = res;
      console.log("Konto/bruger blev fjernet fra den valgte collection.");
      db.close();
    });
    res.redirect("/konti");
  });
});

/*
  5. Redigerer en specifik bruger/konto fra databasen (PUT Request)
*/
router.post('/put', function (req, res) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("CryptoBank");
    var Uid = Number(req.body.Uid);
    var oldValues = { Uid: Uid };
    var newValues = { $set: {Uid: Number(req.body.Uid), kodeord: req.body.kodeord, cpr: Number(req.body.cpr), fornavn: req.body.fornavn, efternavn: req.body.efternavn, adresse: req.body.adresse, kontonummer: Number(req.body.kontonummer), kundeId: Number(req.body.kundeId), valuta: req.body.valuta, saldo: Number(req.body.saldo)} };
    dbo.collection("Konti").updateOne(oldValues, newValues, function (err, res) {
      if (err) throw err;
      console.log("Data for den specifikke bruger/konto er nu ændret.");
      db.close();
    });
    res.redirect("/konti");
  });
});

/*
  6. Viser et specifikt element fra databasen i JSON (GET Request)
*/
router.get('/json/:Uid', function (req, res, next) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("CryptoBank");
    var Uid = Number(req.params.Uid);
    dbo.collection("Konti").findOne({Uid}, function (err, result) {
      if (err) throw err;
      var obj = {};
      obj.json = result;
      res.json(obj.json);
      console.log("Enkel bruger/konto fra DB vises som JSON.");
      db.close();
    });
  });
});

module.exports = router;