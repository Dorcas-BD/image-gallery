import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGallery = ({ images, categories, onCategoryClick }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [galleryImages, setGalleryImages] = useState(images);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryClick(category);
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedImages = Array.from(galleryImages);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    // Update the state with the reordered images
    setGalleryImages(reorderedImages);
  };

  return (
    <div className="image-gallery">
      <div className="categories">
        <button
          onClick={() => handleCategoryClick(null)}
          className={!selectedCategory ? "active" : ""}
        >
          All
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => handleCategoryClick(category)}
            className={selectedCategory === category ? "active" : ""}
          >
            {category}
          </button>
        ))}
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="image-gallery">
          {(provided) => (
            <div
              className="image-cards"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {galleryImages.map((image, index) => (
                <Draggable
                  key={image.id}
                  draggableId={`image-${image.id}`}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="image-card">
                        <img
                          src={image.src}
                          alt={`Image ${index}`}
                          className="image"
                        />
                        <span className="image-tag">{image.tag}</span>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ImageGallery;
