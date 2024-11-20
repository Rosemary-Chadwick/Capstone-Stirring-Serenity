export const RatingStars = ({ currentRating, onRatingChange }) => {
  return (
    <div className="d-flex align-items-center mb-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className="btn btn-link p-0 me-2"
          onClick={() => onRatingChange(star)}
        >
          <i
            className={`bi ${
              star <= currentRating ? "bi-star-fill" : "bi-star"
            }`}
            style={{
              color: star <= currentRating ? "var(--accent)" : "var(--text)",
              fontSize: "1.5rem",
            }}
          ></i>
        </button>
      ))}
    </div>
  );
};
