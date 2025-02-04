
export const updateEditorContent = (
  content: string,
  setEditorContent: React.Dispatch<React.SetStateAction<string>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: (name: string, value: any, options?: any) => void
) => {
    setEditorContent(content);
    setValue("description", content, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  