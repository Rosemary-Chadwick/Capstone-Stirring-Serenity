import { useState } from "react";
import { editFriendsNote } from "../../services/noteService";

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
