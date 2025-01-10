import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api';

const ShowProducts = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await axios.get(`${endpoint}/products`);
        setProducts(response.data); // Asegúrate de que response.data sea correcto
    };

    const deleteProduct = async (id) => {
        await axios.delete(`${endpoint}/product/${id}`);
        getAllProducts();
    };

    return (
        <div>
            <div className="container mt-5">
                <h1 className="text-center">CRUD con Tabla</h1>
                <form id="crudForm" className="mb-4">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input type="text" className="form-control" id="name" placeholder="Nombre" required />
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control" id="email" placeholder="Correo Electrónico" required />
                        </div>
                        <div className="col-md-4">
                            <button type="submit" className="btn btn-primary w-100">Agregar</button>
                        </div>
                    </div>
                </form>
                <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Descripcion</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`} className="btn btn-warning">Edit</Link>
                                        <button onClick={() => deleteProduct(product.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowProducts;