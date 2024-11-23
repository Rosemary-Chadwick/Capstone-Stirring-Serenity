import { useState, useEffect } from "react";
import {
  getFriendsNotesByRecipeId,
  deleteFriendsNote,
} from "../../services/noteService";
import { getRecipeById } from "../../services/recipeService";
import { AddNote } from "./AddNote";
import { EditNote } from "./EditNote";
import { NoteCard } from "./NoteCard";

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

  // If user is the recipe author, show all notes in read-only mode
  if (recipe?.userId === currentUser.id) {
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title mb-4">Recipe Notes</h4>
          <div className="notes-list">
            {notes.map((note) => (
              <div key={note.id} className="card mb-3">
                <div className="card-body">
                  <p className="card-text">{note.comment}</p>
                  <p className="card-text">
                    <small className="text-muted">
                      By: {note.user.username}
                    </small>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h4 className="card-title mb-4">Recipe Notes</h4>
        <AddNote recipeId={recipeId} onNoteAdded={loadNotes} />
        <div className="notes-list">
          {notes
            .filter((note) => note.userId === currentUser.id)
            .map((note) =>
              editingNote?.id === note.id ? (
                <EditNote
                  key={note.id}
                  note={note}
                  onCancel={() => setEditingNote(null)}
                  onSave={() => {
                    setEditingNote(null);
                    loadNotes();
                  }}
                />
              ) : (
                <NoteCard
                  key={note.id}
                  note={note}
                  currentUser={currentUser}
                  onEdit={setEditingNote}
                  onDelete={handleDeleteNote}
                />
              )
            )}
        </div>
      </div>
    </div>
  );
};
