"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Editor({
  content,
  setContent,
}: {
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <ReactQuill
      theme="snow"
      value={content}
      onChange={setContent}
      className="border-none border-gray-300 rounded-md "
      scrollingContainer="true"
      style={{
        border: "none",
      }}
    />
  );
}

export default Editor;
