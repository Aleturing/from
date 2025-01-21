import React, { useState, useEffect } from "react";
import LeftSideBar from "../organism/LeftSideBar";
import axios from "axios";
import ArticleForm from "./ArticleForm"; // Importar el formulario

function Products({ setOnLogin }) {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  // Obtener los productos desde la API
  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/productos");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  // funcion para enviar un producto nuevo a la api
  const postProduct = async (nombre, descripcion, precio, stock, foto) => {
    const data = { nombre, descripcion, precio, stock, foto };
    return await postRequest("/productos", data);
  };

  // funcion para editar un producto
  const editProduct = async (id, updatedProduct) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/productos/${id}`,
        updatedProduct
      );
      // actualizar la lista de productos después de la edicion
      getProducts();
      setIsEditing(false); // cerrar el formulario de edicion
      setCurrentProduct(null); // limpiar el producto actual
    } catch (error) {
      console.error("Error al editar el producto:", error);
    }
  };

  // funcion para eliminar un producto del api
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/productos/${id}`);
      // Una vez eliminado, se actualiza la lista de productos
      getProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  // Agregar un artículo a la lista
  const addArticle = async (articleData) => {
    try {
      await postProduct(
        articleData.nombre,
        articleData.descripcion,
        parseFloat(articleData.precio),
        parseInt(articleData.stock),
        articleData.foto
      );
      getProducts(); // Actualizar la lista de productos después de agregar el nuevo
    } catch (error) {
      console.error("Error al agregar el artículo:", error);
    }
  };

  // Función genérica para realizar peticiones POST con Axios
  const postRequest = async (url, data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api" + url,
        data
      );
      return response.data; // Devuelve los datos de la respuesta
    } catch (error) {
      console.error(`Error en POST a ${url}:`, error);
      throw error;
    }
  };

  // Función para manejar el formulario de edición
  const handleEditFormSubmit = (updatedProduct) => {
    if (currentProduct) {
      // Asegúrate de que el precio sea un número con decimales si es necesario
      const updatedProductWithNumbers = {
        ...updatedProduct,
        precio: updatedProduct.precio % 1 === 0 ? parseInt(updatedProduct.precio) : parseFloat(updatedProduct.precio),
        stock: parseInt(updatedProduct.stock),
      };
  
      editProduct(currentProduct.id, updatedProductWithNumbers);
    }
  };
  

  return (
    <div className="hide-print flex flex-row h-screen antialiased text-blue-gray-800">
      <LeftSideBar setOnLogin={setOnLogin}/>
      <div className="flex flex-row justify-between w-full px-8 py-4">
        {/* Columna para el formulario de creación de artículos */}
        <div className="w-1/3 max-h-screen overflow-y-auto">
          <ArticleForm addArticle={addArticle} />
        </div>

        <div className="w-2/3">
          {/* Formulario de Edición */}
          {isEditing && currentProduct && (
            <EditProductForm
              product={currentProduct}
              onSubmit={handleEditFormSubmit}
            />
          )}

          {/* Lista de productos */}
          <ProductList
            products={products}
            onEdit={(product) => {
              setCurrentProduct(product);
              setIsEditing(true);
            }}
            onDelete={deleteProduct}
          />
        </div>
      </div>
    </div>
  );
}

// Separado el componente de lista de productos
function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Artículos</h2>
      {products.length === 0 ? (
        <p>No hay artículos todavía.</p>
      ) : (
        products.map((article) => (
          <div
            key={article.id}
            className="p-4 border-b flex justify-between items-center"
          >
            <div>
              <h3 className="text-xl font-semibold">{article.descripcion}</h3>
              <p className="mt-2">{article.precio}</p>
            </div>
            <div>
              <button
                onClick={() => onEdit(article)}
                className="bg-yellow-500 text-white p-2 rounded mr-2"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(article.id)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// Formulario de edición de producto separado
function EditProductForm({ product, onSubmit }) {
  return (
    <div className="mt-8 p-4 border rounded">
      <h2 className="text-2xl font-semibold mb-4">Editar Artículo</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({
            nombre: e.target.nombre.value,
            descripcion: e.target.descripcion.value,
            precio: parseFloat(e.target.precio.value),
            stock: parseInt(e.target.stock.value),
            foto: e.target.foto.value,
          });
        }}
      >
        <div>
          <label htmlFor="nombre" className="block text-lg">
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            defaultValue={product.nombre}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="descripcion" className="block text-lg">
            Descripción
          </label>
          <input
            id="descripcion"
            type="text"
            defaultValue={product.descripcion}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="precio" className="block text-lg">
            Precio
          </label>
          <input
            id="precio"
            type="number"
            defaultValue={product.precio || 0} // Asegúrate de que el valor sea un número
            step="any" // Esto permite tanto números enteros como decimales
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
            defaultValue={product.stock}
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
            defaultValue={product.foto}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
        >
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}

export default Products;
