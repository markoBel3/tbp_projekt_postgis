const {Pool, Client} = require('pg')

const pool = new Pool({
user: "admin_k",
host: "localhost",
database: "projekt",
password: "marko12215",
port: "5432"
})


async function ulogiraj(email,lozinka){
    try{
    let res = await pool.query(`SELECT * from korisnik where email='${email}' and lozinka='${lozinka}'`)
    if ((res.rows).length > 0){
        return res.rows[0].id;
      }
      else
        return -1;
    }catch(err){
        console.log(err.stack)
        return -1;
    }
}

async function registriraj(ime,email,lozinka){
    try{
    let res = await pool.query(`INSERT INTO korisnik(ime,email,lozinka) VALUES
     ('${ime}','${email}','${lozinka}') RETURNING id`)
    if ((res.rows).length > 0){
        return res.rows[0].id;
      }
      else
        return -1;
    }catch(err){
        console.log(err.stack)
        return -1;
    }
}

async function dodajPutovanje(lat,lng,user_id,datum){
    try{
    let res = await pool.query(`INSERT INTO korisnik_posjetio(mjesto,vrijeme,id_korisnika) VALUES
     (ST_GeomFromText('POINT(${lng} ${lat})',4326),'${datum}',${user_id}) RETURNING id`)
    if ((res.rows).length > 0){
        return res.rows[0].id;
      }
      else
        return -1;
    }catch(err){
        console.log(err.stack)
        return -1;
    }
}

async function dohvatiPutovanja(korisnik_id){
    try{
    let res = await pool.query(`SELECT ST_X(mjesto), ST_Y(mjesto) FROM korisnik_posjetio where id_korisnika=${korisnik_id}`)
    if ((res.rows).length > 0){
        return res.rows;
      }
      else
        return -1;
    }catch(err){
        console.log(err.stack)
        return -1;
    }
}

async function dodajZnamenitost(lat,lng,user_id,drzava,naziv){
    try{
    let res = await pool.query(`insert into znamenitosti (mjesto,drzava_id,dodano_od,naziv) values 
    (ST_GeomFromText('POINT(${lng} ${lat})',4326),${drzava},${user_id},'${naziv}') RETURNING id`)
    if ((res.rows).length > 0){
        return res.rows[0].id;
      }
      else
        return -1;
    }catch(err){
        console.log(err.stack)
        return err.code;
    }
}

async function dohvatiDrzave(){
    try{
    let res = await pool.query(`SELECT * FROM drzave`)
    if ((res.rows).length > 0){
        return res.rows;
      }
      else
        return -1;
    }catch(err){
        console.log(err.stack)
        return err.stack;
    }
}


exports.ulogiraj = ulogiraj;
exports.registriraj = registriraj;
exports.dodajPutovanje = dodajPutovanje;
exports.dohvatiPutovanja = dohvatiPutovanja;
exports.dodajZnamenitost = dodajZnamenitost;
exports.dohvatiDrzave = dohvatiDrzave;
