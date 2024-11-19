import { useState, useEffect } from "react";
import {
  getFriendsNotesByRecipeId,
  addFriendsNote,
  editFriendsNote,
  deleteFriendsNote,
} from "../../services/noteService";
import { getRecipeById } from "../../services/recipeService";

export const AddNote = ({ recipeId, onNoteAdded }) => {
  const [newNote, setNewNote] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    //If the note is empty after we erase the spaces, stop! This note isn’t allowed!

    const noteData = {
      recipeId: parseInt(recipeId),
      userId: currentUser.id,
      comment: newNote.trim(),
      dateCreated: new Date().toISOString(),
    };

    //     dateCreated: new Date().toISOString(),
    // 2024-11-19T14:30:00.000Z
    // time from the clock and formats it into a standard way that computers all around the world understand

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

// components/notes/EditNote.jsx
export const EditNote = ({ note, onCancel, onSave }) => {
  const [editedComment, setEditedComment] = useState(note.comment);

  const handleSave = async () => {
    await editFriendsNote(note.id, {
      ...note,
      comment: editedComment,
    });
    onSave();
  };

  return (
    <div>
      <textarea
        className="form-control mb-2"
        value={editedComment}
        onChange={(e) => setEditedComment(e.target.value)}
      ></textarea>
      <button className="btn btn-primary btn-sm me-2" onClick={handleSave}>
        Save
      </button>
      <button className="btn btn-secondary btn-sm" onClick={onCancel}>
        Cancel
      </button>
    </div>
  );
};

// components/notes/NotesList.jsx
export const NotesList = ({ recipeId }) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));

  const loadNotes = () => {
    getFriendsNotesByRecipeId(recipeId).then((data) => {
      setNotes(Array.isArray(data) ? data : []);
    });
  };

  useEffect(() => {
    getRecipeById(recipeId).then(setRecipe);
    loadNotes();
  }, [recipeId]);

  const handleDeleteNote = async (noteId) => {
    await deleteFriendsNote(noteId);
    loadNotes();
  };

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-2">Recipe Notes</h4>
        {recipe?.userId !== currentUser.id && (
          <AddNote recipeId={recipeId} onNoteAdded={loadNotes} />
        )}
        <div className="notes-list">
          {notes.map((note) => (
            <div key={note.id} className="card mb-3">
              <div className="card-body p-1">
                {editingNote?.id === note.id ? (
                  <EditNote
                    note={note}
                    onCancel={() => setEditingNote(null)}
                    onSave={() => {
                      setEditingNote(null);
                      loadNotes();
                    }}
                  />
                ) : (
                  <>
                    <p className="card-text">{note.comment}</p>
                    <p className="card-text">
                      <small className="text-muted">
                        By: {note.user.username}
                      </small>
                    </p>
                    {note.userId === currentUser.id && (
                      <div>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => setEditingNote(note)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-link text-danger"
                          onClick={() => handleDeleteNote(note.id)}
                        >
                          <i className="bi bi-trash fs-4"></i>
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
