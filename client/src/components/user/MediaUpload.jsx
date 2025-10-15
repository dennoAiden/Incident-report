import { Upload, Image, Film, X } from 'lucide-react';

export default function MediaUpload() {
  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto text-white">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Upload Media
      </h1>

      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 sm:p-10 text-center">
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-medium mb-2">Drag and drop files here</h3>
          <p className="text-gray-400 mb-4">or</p>
          <button className="px-5 sm:px-6 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors">
            Browse Files
          </button>
        </div>

        {/* Uploaded Files Section */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-medium mb-4">Uploaded Files</h3>
          <div className="space-y-4">
            {['image1.jpg', 'video1.mp4'].map((file, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-700 p-4 rounded-lg gap-3"
              >
                <div className="flex items-center gap-3">
                  {file.endsWith('.jpg') ? (
                    <Image className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Film className="w-5 h-5 text-purple-400" />
                  )}
                  <span className="truncate">{file}</span>
                </div>
                <button className="p-1 hover:text-red-500 self-end sm:self-auto">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
