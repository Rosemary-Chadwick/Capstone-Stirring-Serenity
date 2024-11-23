import { useState, useEffect } from "react";
import {
  getFriendsNotesByRecipeId,
  deleteFriendsNote,
} from "../../services/noteService";
import { getRecipeById } from "../../services/recipeService";
import { AddNote } from "./AddNote";
import { EditNote } from "./EditNote";
import { NoteCard } from "./NoteCard";
import { useRecipePermissions } from "../../hooks/useRecipePermissions";

export const NotesList = ({ recipeId }) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [recipe, setRecipe] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("recipe_user"));
  const { isOwner, canComment } = useRecipePermissions(recipe);

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
        <h4 className="card-title mb-4">Recipe Notes</h4>
        {canComment && <AddNote recipeId={recipeId} onNoteAdded={loadNotes} />}
        <div className="notes-list">
          {notes.map((note) =>
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
