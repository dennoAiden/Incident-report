import { Upload, Image, Film, X } from 'lucide-react';

export default function MediaUpload() {
  return (
    <div className="p-3 sm:p-6 max-w-6xl mx-auto text-white w-full overflow-x-hidden">
      {/* Heading */}
      <h1 className="text-xl sm:text-3xl font-bold mb-6 text-center sm:text-left">
        Upload Media
      </h1>

      {/* Card */}
      <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg w-full">
        {/* Upload Section */}
        <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 sm:p-10 text-center flex flex-col items-center justify-center">
          <Upload className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-base sm:text-lg font-medium mb-2">
            Drag and drop files here
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-4">or</p>
          <button className="px-4 sm:px-6 py-2 bg-yellow-500 text-gray-900 font-medium rounded-lg hover:bg-yellow-600 transition-colors text-sm sm:text-base">
            Browse Files
          </button>
        </div>

        {/* Uploaded Files Section */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-medium mb-4 text-center sm:text-left">
            Uploaded Files
          </h3>

          {/* Uploaded Files List */}
          <div className="flex flex-col gap-4">
            {['image1.jpg', 'video1.mp4'].map((file, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-700 p-4 rounded-lg gap-3 sm:gap-6"
              >
                {/* File Info */}
                <div className="flex items-center gap-3 overflow-hidden">
                  {file.endsWith('.jpg') ? (
                    <Image className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  ) : (
                    <Film className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  )}
                  <span className="truncate text-sm sm:text-base">{file}</span>
                </div>

                {/* Remove Button */}
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
