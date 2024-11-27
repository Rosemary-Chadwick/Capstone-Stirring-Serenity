//json-server --watch src/api/database.json --port 8088

const API_BASE = "http://localhost:8088";

export const getAllRecipes = () => {
  return fetch(`${API_BASE}/recipes?_expand=user&_expand=cookingMethod`).then(
    (res) => res.json()
  );
};

export const getRecipeById = (id) => {
  return fetch(
    `${API_BASE}/recipes/${id}?_expand=cookingMethod&_expand=user`
  ).then((res) => res.json());
};

export const createRecipeInfo = async (formData) => {
  try {
    // First, handle image upload to Cloudinary if it exists
    let imageUrls = {};
    const imageFile = formData.get("image");

    if (imageFile) {
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        }
      );

      const imageData = await cloudinaryResponse.json();

      imageUrls = {
        imageUrl: imageData.secure_url,
        thumbnailUrl: imageData.secure_url.replace(
          "/upload/",
          "/upload/w_300,h_300,c_fill/"
        ),
      };
    }

    // Create recipe object with image URLs if they exist
    const recipeData = {
      title: formData.get("title"),
      ingredients: formData.get("ingredients"),
      instructions: formData.get("instructions"),
      cookingTime: parseInt(formData.get("cookingTime")),
      cookingMethodId: parseInt(formData.get("cookingMethodId")),
      userId: formData.get("userId"),
      ...imageUrls,
    };

    const response = await fetch(`${API_BASE}/recipes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in createRecipeInfo:", error);
    throw error;
  }
};

export const getCookingMethods = () => {
  return fetch(`${API_BASE}/cookingMethods`).then((res) => res.json());
};

export const getUserRecipesById = (id) => {
  return fetch(`${API_BASE}/recipes?userId=${id}&_expand=cookingMethod`).then(
    (res) => res.json()
  );
};

export const deleteRecipe = (id) => {
  return fetch(`${API_BASE}/recipes/${id}`, {
    method: "DELETE",
  });
};

export const editRecipe = async (id, formData) => {
  try {
    const imageFile = formData.get("image");
    let recipeData = {};

    // Convert FormData to object first
    for (let [key, value] of formData.entries()) {
      if (key !== "image") {
        // Skip the file
        recipeData[key] = value;
      }
    }

    // Only handle image upload if a new image was provided
    if (imageFile && imageFile.size > 0) {
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`,
        {
          method: "POST",
          body: cloudinaryData,
        }
      );

      const imageData = await cloudinaryResponse.json();

      recipeData.imageUrl = imageData.secure_url;
      recipeData.thumbnailUrl = imageData.secure_url.replace(
        "/upload/",
        "/upload/w_300,h_300,c_fill/"
      );
    }
    console.log("Data being sent:", JSON.stringify(recipeData, null, 2));

    const response = await fetch(`${API_BASE}/recipes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    return await response.json();
  } catch (error) {
    console.error("Error in editRecipe:", error);
    throw error;
  }
};
