import React, { useEffect, useRef } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const BlockEmbed = Quill.import("blots/block/embed");
const Delta = Quill.import("delta");

class VideoBlot extends BlockEmbed {
  static create(url) {
    const node = super.create();
    node.setAttribute("src", url);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", true);
    node.setAttribute("width", "560");
    node.setAttribute("height", "315");
    return node;
  }

  static value(node) {
    return node.getAttribute("src");
  }
}

VideoBlot.blotName = "video";
VideoBlot.tagName = "iframe";
VideoBlot.className = "ql-video";

Quill.register(VideoBlot);

const getYoutubeEmbedUrl = (url) => {
  /* eslint-disable no-useless-escape */
  const regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  } else {
    return null;
  }
};

const QuillEditor = ({ value, onChange }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    const quill = quillRef.current.getEditor();

    quill.clipboard.addMatcher(Node.TEXT_NODE, function (node, delta) {
      const url = node.data;
      const embedUrl = getYoutubeEmbedUrl(url);
      if (embedUrl) {
        const newDelta = new Delta()
          .retain(delta.length())
          .delete(delta.length())
          .insert({ video: embedUrl });
        return newDelta;
      }
      return delta;
    });
    const urlMatcher = (node, delta) => {
      const urlRegex = /(https?:\/\/[^\s]+)/g;
      const urlMatches = node.data.match(urlRegex);
      if (urlMatches) {
        let ops = [];
        let str = node.data;
        urlMatches.forEach((url) => {
          const split = str.split(url);
          ops.push({ insert: split.shift() });
          ops.push({ insert: url, attributes: { link: url } });
          str = split.join(url);
        });
        ops.push({ insert: str });
        delta.ops = ops;
      }
      return delta;
    };

    quill.clipboard.addMatcher(Node.TEXT_NODE, urlMatcher);

    const deleteHandler = (range, context) => {
      const [blot] = quill.getLeaf(range.index);
      if (blot && blot.domNode.tagName === "IFRAME") {
        quill.deleteText(range.index, 1, Quill.sources.USER);
      }
      return true;
    };

    quill.keyboard.addBinding({ key: "Backspace" }, deleteHandler);
    quill.keyboard.addBinding({ key: "Delete" }, deleteHandler);
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        [{ color: [] }, { background: [] }],
      ],
    },
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
};

export default QuillEditor;
