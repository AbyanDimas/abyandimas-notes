'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../libs/supabaseClient';

const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export default function Home() {
  const [notes, setNotes] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await supabase.from('notes').select('*');
      if (error) console.error('Error fetching notes:', error);
      else setNotes(data || []);
    };
    fetchNotes();
  }, []);

  const openNoteDetail = (note: any) => {
    const slug = createSlug(note.title);
    router.push(`/note/${slug}`);
  };

  return (
    <div className="flex">
      <main className="flex-grow p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Notes</h1>
        {notes.length > 0 ? (
          <ul className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {notes.map((note) => (
              <li
                key={note.id}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                onClick={() => openNoteDetail(note)}
              >
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {note.title}
                </h2>
                <p className="text-gray-600 line-clamp-3">{note.content}</p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600 text-lg italic">
              No notes found. Create your first note!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
