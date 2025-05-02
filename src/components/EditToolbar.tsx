
import React from 'react';
import { 
  Crop, 
  RotateCw, 
  Sun, 
  ImageDown, 
  Maximize,
  Wand
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipTrigger 
} from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

type Tool = 'resize' | 'crop' | 'rotate' | 'background' | 'adjust' | 'compress';

interface EditToolbarProps {
  selectedTool: Tool | null;
  onSelectTool: (tool: Tool | null) => void;
  hasImage: boolean;
}

const EditToolbar: React.FC<EditToolbarProps> = ({
  selectedTool,
  onSelectTool,
  hasImage,
}) => {
  const isMobile = useIsMobile();
  
  const tools = [
    {
      id: 'resize' as Tool,
      icon: <Maximize size={isMobile ? 18 : 20} />,
      label: 'Resize',
      description: 'Change image width and height'
    },
    {
      id: 'compress' as Tool,
      icon: <ImageDown size={isMobile ? 18 : 20} />,
      label: 'Compress',
      description: 'Reduce image file size'
    },
    {
      id: 'crop' as Tool,
      icon: <Crop size={isMobile ? 18 : 20} />,
      label: 'Crop',
      description: 'Crop image to selected area'
    },
    {
      id: 'rotate' as Tool,
      icon: <RotateCw size={isMobile ? 18 : 20} />,
      label: 'Rotate',
      description: 'Rotate image left or right'
    },
    {
      id: 'background' as Tool,
      icon: <Wand size={isMobile ? 18 : 20} />,
      label: 'BG Remove',
      description: 'Remove image background'
    },
    {
      id: 'adjust' as Tool,
      icon: <Sun size={isMobile ? 18 : 20} />,
      label: 'Adjust',
      description: 'Adjust brightness and contrast'
    },
  ];
  
  const handleToolClick = (tool: Tool) => {
    if (selectedTool === tool) {
      onSelectTool(null);
    } else {
      onSelectTool(tool);
    }
  };
  
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-medium text-gray-600">Edit Tools</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-white p-2 sm:p-3 rounded-lg shadow-sm overflow-x-auto">
        {tools.map((tool) => (
          <div key={tool.id} className="min-w-fit">
            <Tooltip delayDuration={isMobile ? 1000 : 300}>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedTool === tool.id ? 'default' : 'ghost'}
                  size={isMobile ? "sm" : "default"}
                  onClick={() => handleToolClick(tool.id)}
                  disabled={!hasImage}
                  className={`flex flex-col items-center justify-center p-1 sm:p-2 h-auto w-full ${
                    selectedTool === tool.id 
                      ? 'bg-editor-purple text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tool.icon}
                  <span className="text-xs mt-1 line-clamp-1">{tool.label}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{tool.description}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditToolbar;
