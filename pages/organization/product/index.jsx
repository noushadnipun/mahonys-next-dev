import React, { useState } from 'react';
import ProductList from "@/pages/organization/product/list";
import ProductEditModal from "@/pages/organization/product/edit";
import ProductAddModal from "@/pages/organization/product/add";

const Home = () => {
    const [products, setProducts] = useState([
        { id: 1, name: 'Product 1', price: 10 },
        { id: 2, name: 'Product 2', price: 20 },
    ]);

    const [editingProduct, setEditingProduct] = useState(null);
    const [addingProduct, setAddingProduct] = useState(false);

    const handleEditClick = (product) => {
        setEditingProduct(product);
    };

    const handleAddClick = () => {
        setAddingProduct(true);
    };

    const handleSaveProduct = (editedProduct) => {
        // Update the product in the state or send a request to your API.
        // Handle saving logic here.
        if (editingProduct) {
            const updatedProducts = products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
            );
            setProducts(updatedProducts);
        }
    };

    const handleAddProduct = (newProduct) => {
        // Add the new product to the state or send a request to your API.
        // Handle adding logic here.
        const updatedProducts = [...products, { id: Date.now(), ...newProduct }];
        setProducts(updatedProducts);
    };

    return (
        <div>
            <ProductList products={products} onEditClick={handleEditClick} />
            <button onClick={handleAddClick}>Add Product</button>

            <ProductEditModal
                show={editingProduct !== null}
                onHide={() => setEditingProduct(null)}
                product={editingProduct}
                onSave={handleSaveProduct}
            />

            <ProductAddModal
                show={addingProduct}
                onHide={() => setAddingProduct(false)}
                onAdd={handleAddProduct}
            />
        </div>
    );
};

export default Home;
