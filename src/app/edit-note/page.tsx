'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../libs/supabaseClient';

export default function EditNote() {
  const [notes, setNotes] = useState<any[]>([]);
  const [editingNote, setEditingNote] = useState<any | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch notes
  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select('*');
      if (error) console.error('Error fetching notes:', error);
      else setNotes(data || []);
    };
    fetchNotes();
  }, []);

  // Handle delete note
  const deleteNote = async () => {
    if (noteToDelete === null) return;

    const { error } = await supabase.from('notes').delete().eq('id', noteToDelete);
    if (error) {
      console.error('Error deleting note:', error);
    } else {
      setNotes(notes.filter((note) => note.id !== noteToDelete));
      setShowDeleteModal(false);
      setNoteToDelete(null);
    }
  };

  // Handle edit mode
  const startEditing = (note: any) => {
    setEditingNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  // Handle save edited note
  const saveNote = async () => {
    if (!editingNote) return;

    const { error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', editingNote.id);

    if (error) {
      console.error('Error updating note:', error);
    } else {
      setNotes(
        notes.map((note) =>
          note.id === editingNote.id ? { ...note, title, content } : note
        )
      );
      setEditingNote(null);
      setTitle('');
      setContent('');
    }
  };

  return (
    <div className="flex">
      <main className="flex-grow p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Edit Notes</h1>

        {/* Modal for delete confirmation */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to delete this note?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={deleteNote}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Form */}
        {editingNote ? (
          <div className="mb-6 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Note
            </h2>
            <input
              type="text"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex space-x-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={saveNote}
              >
                Save
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                onClick={() => setEditingNote(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
<ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
  {notes.map((note) => (
    <li
      key={note.id}
      className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
        {note.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{note.content}</p>
      <div className="flex space-x-4">
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => startEditing(note)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={() => {
            setShowDeleteModal(true);
            setNoteToDelete(note.id);
          }}
        >
          Delete
        </button>
      </div>
    </li>
  ))}
</ul>

        )}
      </main>
    </div>
  );
}
