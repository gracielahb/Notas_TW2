const express = require('express');
const mariadb = require('mariadb');

const app = express();
const hostname = '127.0.0.1';
const port = 3000;

const conecta = mariadb.createPool({
    host: 'localhost',
    user: 'umarino',
    password:'12345678',
    database: 'crud_phonebook',
    port: '3306'
})

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hi API with mariadb !!! 🎢');
})

// GET
app.get('/api/v1/phones', async (req, res) => {
    try {
        const result = await conecta.query("select * from phone_book");
        res.send(result);
    } catch (err) {
        throw err;
    }
});
//complementar las busquedas

app.get('/api/v1/phones/:id', async (req, res) => {
    try {
        const result = await conecta.query("select * from phone_book where id = ?", [req.params.id]);
        if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.send('Usuario no encontrado');
        }                
    } catch (err) {
        throw err;
    }
});


//------------------------------agregar 3 metodos más

app.get('/api/v1/phones/name/:name', async (req, res) => {
    try {
        const { name } = req.params; 
        const result = await conecta.query("SELECT * FROM phone_book WHERE name LIKE ?", [`%${name}%`]);

        if (result.length > 0) {
            res.status(200).json(result); 
        } else {
            res.status(404).send('No se encontraron usuarios con ese nombre');
        }
    } catch (err) {
        res.status(500).send('Error al procesar la solicitud');
        console.error(err); 
    }
});


app.get('/api/v1/phones/address/:address', async (req, res) => {
    try {
        const { address } = req.params; 
        const result = await conecta.query("SELECT * FROM phone_book where address = ?", [req.params.address]);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).send('No se encontraron usuarios con esa dirección');
        }
    } catch (err) {

        res.status(500).send('Error al procesar la solicitud');
        console.error(err);
    }
});

app.get('/api/v1/phones/phone/:phone', async (req, res) => {
    try {
        const { phone } = req.params; 

        const result = await conecta.query("SELECT * FROM phone_book WHERE phone LIKE ?", [`%${phone}%`]);

        if (result.length > 0) {

            res.status(200).json(result); 
        } else {
            res.status(404).send('No se encontraron usuarios con ese número de teléfono');
        }
    } catch (err) {
        res.status(500).send('Error al procesar la solicitud');
        console.error(err); 
    }
});

//--------------Agregrar
// POST
app.post('/api/v1/add/phone', async (req, res) => {
    try {
        const result = await conecta.query("insert into phone_book (name, phone, address) VALUES (?, ?, ?)", [ req.body.name, req.body.phone, req.body.address]);
        res.send('Insert operation successful !!! 👍');
    } catch (err) {
        throw err;
    }
});

//--------------Eliminación
app.delete('/api/v1/phones/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await conecta.query("DELETE FROM phone_book WHERE id = ?", [id]);
        result.affectedRows > 0 ? res.send(`ID ${id} eliminado`) : res.status(404).send('No encontrado');
    } catch (err) {
        res.status(500).send('Error al eliminar');
    }
});


//----Actualización
app.patch('/api/v1/phones/id/:id', async (req, res) => {
    try {
        const { id } = req.params;  
        const { name } = req.body;  
    
        if (!name || name.trim() === "") {
            return res.status(400).send('El nombre es obligatorio');
        }
        const result = await conecta.query("UPDATE phone_book SET name = ? WHERE id = ?", [name, id]);

        if (result.affectedRows > 0) {
            res.send(`El nombre del usuario con ID ${id} ha sido actualizado a ${name}`);
        } else {
            res.status(404).send('No se encontró el usuario con ese ID');
        }
    } catch (err) {
        res.status(500).send('Error al actualizar el registro');
        console.error(err);
    }
});

// POST-------------------
app.post('/api/v1/add/phone', async (req, res) => {
    try {
        const result = await conecta.query("insert into phone_book (name, phone, address) VALUES (?, ?, ?)", [ req.body.name, req.body.phone, req.body.address]);
        res.send('Insert operation successful !!! 👍');
    } catch (err) {
        throw err;
    }
});

app.listen(port, hostname, () => {
    console.log(`El servidor se está ejecutando en http://${hostname}:${port}/`);
})









