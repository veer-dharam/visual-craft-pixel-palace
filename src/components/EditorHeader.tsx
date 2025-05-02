
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EditorHeaderProps {
  currentImageBlob: Blob | null;
  formatFileSize: (bytes: number) => string;
  onQuickDownload: () => void;
  onResetEditor: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  currentImageBlob,
  formatFileSize,
  onQuickDownload,
  onResetEditor,
}) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Edit Image</h2>
      <div className="flex items-center gap-2">
        {currentImageBlob && (
          <span className="text-sm text-gray-500">
            {formatFileSize(currentImageBlob.size)}
          </span>
        )}
        {currentImageBlob && (
          <Button
            variant="outline"
            size="sm"
            onClick={onQuickDownload}
            className="flex items-center gap-1"
          >
            <Download size={16} /> Download
          </Button>
        )}
        <button
          onClick={onResetEditor}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default EditorHeader;
