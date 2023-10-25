import React from 'react';

const ProductList = ({ products, onEditClick }) => {
    return (
        <div>
            <h2>Product List</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name}
                        <button onClick={() => onEditClick(product)}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;