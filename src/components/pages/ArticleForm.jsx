import React, { useState } from "react";

function ArticleForm({ addArticle }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [foto, setFoto] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre && descripcion && precio && stock && foto) {
      addArticle({ nombre, descripcion, precio, stock, foto });
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setStock("");
      setFoto("");
    } else {
      alert("Por favor, completa todos los campos.");
    }
  };

  return (
    <div className="p-4 border-b">
      <h2 className="text-2xl font-semibold">Crear Artículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="nombre" className="block text-lg">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Escribe el nombre del artículo"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-lg">
            Descripción
          </label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Escribe la descripción del artículo"
            className="w-full p-2 border rounded"
            rows="4"
          />
        </div>
        <div>
          <label htmlFor="precio" className="block text-lg">
            Precio
          </label>
          <input
            id="precio"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            placeholder="Escribe el precio del artículo"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block text-lg">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            placeholder="Escribe el stock disponible"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="foto" className="block text-lg">
            Foto
          </label>
          <input
            id="foto"
            type="text"
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
            placeholder="Escribe el nombre del archivo de la foto (ej. foto.jpg)"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Crear Artículo
        </button>
      </form>
    </div>
  );
}

export default ArticleForm;
