import { useState } from "react";
import { addFriendsNote } from "../../services/noteService";
import { useRecipePermissions } from "../../hooks/useRecipePermissions";

export const AddNote = ({ recipeId, onNoteAdded }) => {
  const [newNote, setNewNote] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
  const { canComment } = useRecipePermissions(recipeId);

  if (!canComment) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const noteData = {
      recipeId: parseInt(recipeId),
      userId: currentUser.id,
      comment: newNote.trim(),
      dateCreated: new Date().toISOString(),
    };

    await addFriendsNote(noteData);
    setNewNote("");
    onNoteAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-group">
        <textarea
          className="form-control mb-2"
          rows="3"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a note..."
        ></textarea>
        <button type="submit" className="btn btn-primary">
          Add Note
        </button>
      </div>
    </form>
  );
};
