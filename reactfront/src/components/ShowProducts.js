import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { Link } from 'react-router-dom';

const endpoint = 'http://localhost:8000/api'

const ShowProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const response = await axios.get(`${endpoint}/products`)
        setProducts(response)
    }

    const deleteProduct = async (id) => {
        await axios.get(`${endpoint}/product/${id}`)
        getAllProducts()
    }

    return (
        <div>
            <div class="container mt-5">
                <h1 class="text-center">CRUD con Tabla</h1>
                <form id="crudForm" class="mb-4">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="name" placeholder="Nombre" required />
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="email" placeholder="Correo Electrónico" required />
                        </div>
                        <div class="col-md-4">
                            <button type="submit" class="btn btn-primary w-100">Agregar</button>
                        </div>
                    </div>
                </form>
                <table class="table table-bordered table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>Descripcion</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        {

                            products.map((product) => {
                                <tr key={product.id}>
                                    <th>{product.description}</th>
                                    <th>{product.price}</th>
                                    <th>{product.stock}</th>
                                    <th>
                                        <Link to={`/edit/${product.id}`} className='btn btn-warning'>Edit</Link>
                                        <button onClick={()=>deleteProduct(product.id)} className='btn btn-danger'>Delete</button>
                                    </th>
                                </tr>
                            })

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ShowProducts
