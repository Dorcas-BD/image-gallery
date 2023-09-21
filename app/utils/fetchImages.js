const fetchImages = async (category) => {
  let url = "https://api.pexels.com/v1/curated?per_page=10&page=1";

  if (category) {
    url = `https://api.pexels.com/v1/search?query=${category}&per_page=10&page=1`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: "EIwEtriHw5aVrxRLKDKmazbzUYGVcU2dUml5R2XppQUUyevUY4Id6tCE",
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const images = data.photos.map((photo) => ({
    id: photo.id,
    src: photo.src.medium,
    tag: category ? category : "ALL",
  }));

  return images;
};

export default fetchImages;
