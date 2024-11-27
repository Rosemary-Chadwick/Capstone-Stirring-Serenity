export const NoteCard = ({ note, currentUser, recipe, onEdit, onDelete }) => {
  const isUsersNote = note.userId === currentUser.id;
  const isNotRecipeOwner = recipe?.userId !== currentUser.id;

  return (
    <div className="card mb-3">
      <div className="card-body p-1">
        <p className="card-text">{note.comment}</p>
        <p className="card-text">
          <small className="text-muted">By: {note.user.username}</small>
        </p>
        {isUsersNote && isNotRecipeOwner && (
          <div>
            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => onEdit(note)}
            >
              Edit
            </button>
            <button
              className="btn btn-link text-danger"
              onClick={() => onDelete(note.id)}
            >
              <i className="bi bi-trash fs-4"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
