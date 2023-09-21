import React, { useState, useEffect } from "react";
import ImageGallery from "../components/ImageGallery";
import Loading from "../components/Loading";
import SearchBar from "../components/SearchBar";
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
    if (category === selectedCategory) {
      setSelectedCategory(null); // Toggle off the selected category
      setSearchTerm(""); // Clear the search term when toggling off category
    } else {
      setSelectedCategory(category);
      setSearchTerm(""); // Clear the search term when selecting a new category
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term.toLowerCase());
    let filtered;

    if (selectedCategory === null || selectedCategory === "All") {
      filtered = images.filter((image) =>
        image.tag.toLowerCase().includes(term.toLowerCase())
      );
    } else {
      filtered = images.filter(
        (image) => image.tag.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    setFilteredImages(filtered);
  };

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <ImageGallery
        images={filteredImages}
        categories={categories}
        onCategoryClick={handleCategoryClick}
      />
    </div>
  );
};

export default GalleryHomepage;
