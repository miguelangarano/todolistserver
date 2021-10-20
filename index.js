const express = require('express')
const router = new express.Router()
const bodyParser = require('body-parser')
const admin = require("firebase-admin");
require('dotenv').config()
var cors = require('cors')

var serviceAccount = {
    "type": "service_account",
    "project_id": "jiggergames-17edd",
    "private_key_id": "e5ff664740237b5f647b4476bc38cf393a75fd05",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvHLJQIeYIktah\nm8Xa85DDBruHTsu3Jp8j4ROFWwUSKy4BnevdG6faE/YpvKYKa0CwqFPv+ooGuymY\nSI03vPpmOGuzRrv2GKRKCQpfCAy7YVZhm832cMi/eG4qTaWwUmwjQfr86uyOnFoL\ns+CifkJwYSJYZz2eXixPbqeVRvN89HhCDAi0xaHdasPw0vY8I+/JhrFYS2Oa9sve\nIq1X1L+7Kw5FBsV2cKQ38B+1wXRgi4cQztqbhoD+ilPkiiopw2oHSCNLfAYA6tGz\nOFK0nT1pgpRtJAqE82OblrJHvyeQDf2QH1rC8tnq2eSiTWtbfa62AmvRYr7ZU7LZ\ngMt3sgqhAgMBAAECggEAOVQEPn6ykAj+kl7sie9ma6rXFwehYt8Wh4kGuohfYyDW\nyXm5f6QvshIJ64USuON/BLa+8BhOOsDob64E6YQJWBDNlZ4pJ/rOQlyuVAlPHcNS\no9b9uVoYJrMXIetUvKJnO628rTN96XxfcGhduOTr/F2YgGegQSokiIa5/4GAcl4N\n/TKHi6yuwpydoCHYmeXsBSpUBBhkNFiVxXRq3VQklhNXJqTW4EBmlzyxRHtuPADD\nr1k2mblvDBAxW7u0u8vDhi3ij4HGj94qof/xywCV1J6ZiDlOGyHBMut66BGh2G2x\n48lj5JXxiuQk7Ai8I7djcEzBh8+PYounAalNIFkH/wKBgQDd90SJ7qYqspjQDYbg\nAfJ369bfa32pH75c8ewe9yeCTxWSjYh3TuWrvPVJp0Z9xrMkgAE5naYMO77FraIE\no579wgIKTwTvOQ29G7RM5fZybTz2HM2z3Jh11MvQ34pL3VwZIPZ2Vk0tw1tfleSc\nuABC7Vgk2CUEfvoBhKIlLXG4dwKBgQDJ9kv+WE0TOVw/95x5Q2RsZIKyv5uIxvD8\nK1v20AjxGshJ4mNKr+41TnEE8ioCoP4KBPQMqfLw5GFDXjP5BlkfDjLD81DIEly7\nPtm8f+p3I54Scmd03o/8Kf8KuEqZRg//5SqmanEWi4VrH/IVwIHmRzK95tjtRSQw\nwg8KfxUzpwKBgQCi1Ls96ImTtxLtRY8VE7iZCrTFj6hOgk/3BS4vhSZBrNxpd1SO\nGZ3Yv7S9hG3s5PAULac4ahMe1FFd2MOLXbDL/R/cCh3XlGYkvYcmBmklhkd7UKQC\ndyiNAD9IikR85PWkJY9IPoU9tht44pAj+8ONVWodFUcKpk+m/3KnjU/ofwKBgCN/\nXeYLoShy2YsIu4D43mrK08oVMYI97Vd1S4m7EQdHvNJ3rxoOiCDoc6b55XZm05/x\nNPAQ4vmCOrI7mYj4m6uAtF2Ko7U2vQPQTTb7iLt+ECeP4i1BfS9GNmSs9bew/9jr\nb66mYNAkn8Ovbr5yAqL1+q40KAa0M2M6iKhAo/pbAoGAeLb/X0oaQtYUXpnoHFBl\naazNA/BCq64nRRqCZvUJ0U5115VmY4immDiOeUZm0gG64FjQNJoicuUfrUi+L2Ed\nw2CwuIYUG/g7Jzd+VYcp+bLdoEaQ5DhJ5DN/2x5xZk3v+2OMDV/svWmC1IjW/ZYH\naZi7XhXDQoxMlK214I0FNpw=\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-x3auy@jiggergames-17edd.iam.gserviceaccount.com",
    "client_id": "106338605751773522418",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-x3auy%40jiggergames-17edd.iam.gserviceaccount.com"
};


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://jiggergames-17edd.firebaseio.com"
});

const app = express()
const port = process.env.PORT || 3333


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});
app.use(cors())


router.get('/list', async (req, res) => {
    let list = []
    let snapshot = await admin.database().ref(`todolist`).once("value")
    if (snapshot.val() != null) {
        let values = Object.values(snapshot.val())
        for (let i = 0; i < values.length; i++) {
            list.push(values[i])
        }
    }
    res.status(200).send({ "response": true, data: list });
});


router.post('/add', async (req, res) => {
    /*
        todoitem: string
    */
    let request = req.body;
    if (request.todoitem != null) {
        await admin.database().ref(`todolist`).push(request.todoitem)
        res.status(200).send({ "response": true, data: {} });
    } else {
        res.status(200).send({ "response": false, data: "Error. Debes enviar la propiedad 'todoitem'" });
    }
});

app.use(router)



app.listen(port, () => {
    console.log(`todolist corriendo en http://localhost:${port}`)
});