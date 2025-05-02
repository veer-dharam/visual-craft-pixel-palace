
import React from 'react';
import { Crop, RotateCw, Sun, Image, ImageDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
  const tools = [
    {
      id: 'resize' as Tool,
      icon: <Image size={20} />,
      label: 'Resize Dimensions',
    },
    {
      id: 'compress' as Tool,
      icon: <ImageDown size={20} />,
      label: 'Compress File Size',
    },
    {
      id: 'crop' as Tool,
      icon: <Crop size={20} />,
      label: 'Crop',
    },
    {
      id: 'rotate' as Tool,
      icon: <RotateCw size={20} />,
      label: 'Rotate',
    },
    {
      id: 'background' as Tool,
      icon: <Image size={20} />,
      label: 'Remove Background',
    },
    {
      id: 'adjust' as Tool,
      icon: <Sun size={20} />,
      label: 'Adjustments',
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
    <div className="flex items-center justify-center gap-1 bg-white p-1 rounded-lg shadow-sm">
      {tools.map((tool) => (
        <Tooltip key={tool.id}>
          <TooltipTrigger asChild>
            <Button
              variant={selectedTool === tool.id ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleToolClick(tool.id)}
              disabled={!hasImage}
              className={selectedTool === tool.id ? 'text-white' : 'text-gray-700'}
            >
              {tool.icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{tool.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};

export default EditToolbar;
