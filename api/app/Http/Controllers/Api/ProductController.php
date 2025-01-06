<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    // Mostrar todos los productos
    public function index()
    {
        return Product::all();  // Devuelve todos los productos
    }

    // Crear un nuevo producto
    public function store(Request $request)
    {
        $product = new Product();
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->save();
        return response()->json($product, 201);
    }

    // Mostrar un producto específico por ID
    public function show($id)
    {
        $product = Product::findOrFail($id);  // Obtiene el producto por ID
        return response()->json($product);
    }

    // Actualizar un producto específico
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'stock' => 'required|integer|min:0',
        ]);

        $product = Product::findOrFail($id);  // Encuentra el producto por ID
        $product->update($validated);  // Actualiza el producto

        return response()->json(['message' => 'Producto actualizado', 'product' => $product]);
    }

    // Eliminar un producto específico
    public function destroy($id)
    {
        $product = Product::findOrFail($id);  // Encuentra el producto por ID
        $product->delete();  // Elimina el producto

        return response()->json(['message' => 'Producto eliminado']);
    }
}
