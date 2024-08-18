import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add(req, res){
        const libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, ano_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [libro.nombre, libro.autor, libro.categoria, libro.ano_publicacion, libro.isbn]);
        res.json({"Id insertado": result.insertId});
    }

    async delete(req, res){
        const libro = req.body;
        const [result] = await pool.query(`DELETE FROM Libros WHERE isbn=(?)`, [libro.isbn]);
        res.json({"Registros eliminados": result.affectedRows});
    }

    async update(req, res){
        const libro = req.body;
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), ano_publicacion=(?), isbn=(?) WHERE id=(?)`, [libro.nombre, libro.autor, libro.categoria, libro.ano_publicacion, libro.isbn, libro.id]);
        res.json({"Registros actalizados": result.changedRows});
    }

    async getOne(req, res) {
        const { id } = req.params;
        try {
          const [result] = await pool.query("SELECT * FROM libros WHERE id = ?", [id,]);
        if (result.length === 0) {
            res.status(404).json({ message: "Libro no encontrado" });
        } else {
            res.json(result[0]);
        }
        } catch (error) {
        res.status(500).json({ message: "Error al obtener el libro", error });
        }
    }

}

export const libro = new LibroController();