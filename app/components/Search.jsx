'use client'
import { useState } from "react";

const SearchI = ({ data = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };


  const filteredData = data.filter((item) =>
    item.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 border rounded-lg bg-white shadow-md absolute z-10 w-full flex ">
      <input
        type="text"
        placeholder="Search products by title..."
        value={searchTerm}
        onChange={handleSearch}
        className="border p-2 rounded w-full mb-4"
      />
      <ul>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <li key={item.id} className=" p-2 border-b">
              {item.attributes.title} 
            </li>
          ))
        ) : (
          <li>No products found</li>
        )}
      </ul>
    </div>
  );
};

export default SearchI;
