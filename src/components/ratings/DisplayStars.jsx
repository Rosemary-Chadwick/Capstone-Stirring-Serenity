export const DisplayStars = ({ rating }) => {
  return (
    <span>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${star <= rating ? "bi-star-fill" : "bi-star"}`}
          style={{
            color: star <= rating ? "var(--accent)" : "var(--text)",
            fontSize: "1rem",
          }}
        ></i>
      ))}
    </span>
  );
};
