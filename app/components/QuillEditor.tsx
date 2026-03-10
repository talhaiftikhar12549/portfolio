"use client";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
        ["clean"],
    ],
};

const formats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "blockquote", "code-block",
    "link", "image", "color", "background",
];

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export default function QuillEditor({ value, onChange }: Props) {
    return (
        <div className="quill-dark">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder="Write your blog content here…"
            />
            <style>{`
                .quill-dark .ql-toolbar {
                    background: #0d0d2b;
                    border: 1px solid #1e1e4a;
                    border-radius: 12px 12px 0 0;
                    border-bottom: 1px solid #2c2ebf40;
                }
                .quill-dark .ql-container {
                    background: #0d0d2b;
                    border: 1px solid #1e1e4a;
                    border-top: none;
                    border-radius: 0 0 12px 12px;
                    min-height: 400px;
                    font-size: 15px;
                    color: #e0e0f0;
                }
                .quill-dark .ql-editor {
                    min-height: 400px;
                    color: #e0e0f0;
                    line-height: 1.7;
                }
                .quill-dark .ql-editor.ql-blank::before {
                    color: #3a3a5c;
                    font-style: italic;
                }
                .quill-dark .ql-toolbar .ql-stroke {
                    stroke: #9898b5;
                }
                .quill-dark .ql-toolbar .ql-fill {
                    fill: #9898b5;
                }
                .quill-dark .ql-toolbar .ql-picker-label {
                    color: #9898b5;
                }
                .quill-dark .ql-toolbar button:hover .ql-stroke,
                .quill-dark .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #6b6dff;
                }
                .quill-dark .ql-toolbar button:hover .ql-fill,
                .quill-dark .ql-toolbar button.ql-active .ql-fill {
                    fill: #6b6dff;
                }
                .quill-dark .ql-toolbar .ql-picker-label:hover,
                .quill-dark .ql-toolbar .ql-picker-item:hover {
                    color: #6b6dff;
                }
                .quill-dark .ql-toolbar .ql-picker-options {
                    background: #0d0d2b;
                    border: 1px solid #1e1e4a;
                    border-radius: 8px;
                }
                .quill-dark .ql-snow.ql-toolbar button:hover,
                .quill-dark .ql-snow .ql-toolbar button:hover {
                    background: #1e1e4a;
                    border-radius: 4px;
                }
                .quill-dark .ql-editor h1,
                .quill-dark .ql-editor h2,
                .quill-dark .ql-editor h3 { color: #ffffff; font-weight: 700; }
                .quill-dark .ql-editor a { color: #6b6dff; }
                .quill-dark .ql-editor blockquote {
                    border-left: 3px solid #2c2ebf;
                    color: #9898b5;
                    padding-left: 1rem;
                }
                .quill-dark .ql-editor pre {
                    background: #060614;
                    border: 1px solid #1e1e4a;
                    border-radius: 8px;
                    color: #6b6dff;
                }
                .quill-dark .ql-editor code {
                    background: #1a1a4e;
                    color: #6b6dff;
                    padding: 2px 6px;
                    border-radius: 4px;
                }
            `}</style>
        </div>
    );
}
