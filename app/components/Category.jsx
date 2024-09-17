import React from 'react'

const Category = ({ onCategorySelect }) => {

    const handleCategory = (category) => {
        onCategorySelect(category); 
    };

    return (
        <div>
        <nav aria-label="Breadcrumb" className="flex">
            <ol className="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
            <li className="flex items-center">
                <button
                onClick={() => handleCategory('security ')}
                className="flex h-10 items-center gap-1.5 bg-gray-100 px-4 transition hover:text-gray-900"
                >
                <span className="text-xs font-medium"> Security </span>
                </button>
            </li>

            <li className="relative flex items-center">
                <button
                onClick={() => handleCategory('tech')}
                className="flex h-10 items-center bg-white px-5 text-xs font-medium transition hover:text-gray-900"
                >
                Tech
                </button>
            </li>

            <li className="relative flex items-center">
                <button
                onClick={() => handleCategory('marketing')}
                className="flex h-10 items-center bg-gray-100 px-5 text-xs font-medium transition hover:text-gray-900"
                >
                Marketing
                </button>
            </li>
            </ol>
        </nav>
        </div>
    );
};

export default Category;
