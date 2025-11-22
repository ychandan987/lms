import { useState } from 'react';
import { CornerDownLeft, Info } from 'lucide-react';

export default function WebContent() {
  const [url, setUrl] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 p-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Webpage unit</h1>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="relative mb-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste the URL of the webpage you want"
            className="w-full bg-transparent text-gray-900 placeholder-gray-600 outline-none pr-10 text-base"
          />
          <button className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <CornerDownLeft size={20} />
          </button>
        </div>

        <div className="flex items-start gap-2 text-sm text-gray-700">
          <Info size={16} className="mt-0.5 flex-shrink-0" />
          <p>Use URLs from: Wistia, Wikipedia, Scribd, Prezi, Flickr</p>
        </div>
      </div>
    </div>
  );
}


