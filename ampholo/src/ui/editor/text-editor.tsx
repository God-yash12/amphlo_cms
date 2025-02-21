import React, { useRef, useMemo } from 'react';
import JoditEditor, { Jodit } from 'jodit-react';

interface TextEditorProps {
  placeholder?: string;
  value: string;
  onChange: (content: string) => void;
  onBlur?: (content: string) => void;
}

export const TextEditor: React.FC<TextEditorProps> = ({ placeholder, value, onChange, onBlur }) => {
  const editor = useRef<Jodit | null>(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || '',
    }),
    [placeholder]
  );

  return (
    <div 
    >
      <JoditEditor
        ref={editor}
        value={value}
        config={config}
        onBlur={(newContent: string) => {
          onBlur?.(newContent);
        }}
        onChange={(newContent: string) => {
          onChange(newContent);
        }}
      />
    </div>
  );
};