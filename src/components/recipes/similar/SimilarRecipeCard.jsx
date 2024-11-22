export const SimilarRecipeCard = ({ recipe, onViewRecipe }) => {
  const similarityPercent = Math.round(recipe.similarityScore * 100);

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="card h-100">
        {recipe.thumbnailUrl && (
          <img
            src={recipe.thumbnailUrl}
            className="card-img-top"
            alt={recipe.title}
            style={{ height: "200px", objectFit: "cover" }}
          />
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{recipe.title}</h5>
          <p className="card-text">
            <small className="text-muted">By: {recipe.user?.username}</small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Cooking Time: {recipe.cookingTime} minutes
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Method: {recipe.cookingMethod?.name}
            </small>
          </p>
          <p className="card-text">
            <small className="text-muted">
              Similarity: {similarityPercent}%
            </small>
          </p>
          <button className="btn btn-primary mt-auto" onClick={onViewRecipe}>
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
};
