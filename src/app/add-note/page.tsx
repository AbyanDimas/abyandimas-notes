'use client';

import { useState } from 'react';
import { supabase } from '../../libs/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AddNote() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = await supabase.from('notes').insert([{ title, content }]);
      if (error) throw error;

      router.push('/');
    } catch (err) {
      console.error('Error adding note:', err);
      setError('Failed to add note. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <main className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Add New Note</h1>
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-600 mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter note title"
                required
              />
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-600 mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter note content"
                rows={6}
                required
              />
            </div>
            {error && <p className="text-red-600 font-medium">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ${
                loading && 'opacity-50 cursor-not-allowed'
              }`}
            >
              {loading ? 'Saving...' : 'Save Note'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
