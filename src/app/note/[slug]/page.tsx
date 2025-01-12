'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '../../../libs/supabaseClient';
import { ArrowLeft } from 'lucide-react';

const NoteDetail = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .filter('title', 'eq', decodeURIComponent(slug.replace(/-/g, ' ')))
        .single();

      if (error) console.error('Error fetching note:', error);
      else setNote(data);

      setLoading(false);
    };
    fetchNote();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>
      </div>

      {/* Note Detail */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-500"></div>
        </div>
      ) : note ? (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">{note.title}</h1>
          <p className="text-gray-600 text-lg leading-relaxed">{note.content}</p>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[50vh]">
          <p className="text-gray-600 italic text-lg">Note not found.</p>
        </div>
      )}
    </div>
  );
};

export default NoteDetail;
