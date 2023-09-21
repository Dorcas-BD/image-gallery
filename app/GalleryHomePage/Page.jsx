// pages/index.js
import React, { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
import DragAndDrop from "../components/DragAndDrop";
import fetchImages from "../utils/fetchImages";
import "../styles/GalleryHomepage.css";

const categories = [
  "Nature",
  "Animals",
  "Architecture",
  "Travel",
  "Food",
  "People",
];

const GalleryHomepage = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImagesData = async () => {
      setLoading(true);
      let fetchedImages = [];
      if (selectedCategory) {
        fetchedImages = await fetchImages(selectedCategory);
      } else {
        fetchedImages = await fetchImages();
      }
      setImages(fetchedImages);
      setFilteredImages(fetchedImages);
      setLoading(false);
    };

    fetchImagesData();
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearch = async (term) => {
    setSearchTerm(term.toLowerCase());
    let filtered;

    const categoryMatch = categories.find(
      (category) => category.toLowerCase() === term.toLowerCase()
    );

    if (categoryMatch) {
      const categoryImages = await fetchImages(categoryMatch);
      setFilteredImages(categoryImages);
    } else {
      filtered = images.filter((image) =>
        image.tag.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredImages(filtered);
    }
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <ImageGallery
        images={filteredImages}
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
      <DragAndDrop />
    </div>
  );
};

export default GalleryHomepage;
