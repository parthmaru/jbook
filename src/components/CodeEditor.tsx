import { useRef } from "react";
import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
// import "bulmaswatch/darkly/bulmaswatch.min.css";
import "./CodeEditorStyle.css";

interface CodeEditorProps {
  initialValue: string;
  onValueChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue,
  onValueChange,
}) => {
  const valRef = useRef<any>();

  const handleEditorMount: OnMount = (editor, monaco) => {
    valRef.current = editor;
  };

  const handleEditorChange: OnChange = (value, event) => {
    if (value) {
      onValueChange(value);
    }
  };

  const handleFormatClick = () => {
    // get current value

    const unformatted = valRef.current.getValue();

    // format value

    const formatted = prettier
      .format(unformatted, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");

    // set formatted value back in to the editor
    valRef.current.setValue(formatted);
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-link is-small"
        onClick={handleFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        onMount={handleEditorMount}
        onChange={handleEditorChange}
        defaultValue={initialValue}
        theme="vs-dark"
        language="javascript"
        height="100%"
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
