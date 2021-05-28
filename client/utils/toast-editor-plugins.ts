import ToastEditor from "@toast-ui/editor";
import { v4 as uuidV4 } from "uuid";

const renderYoutube = (wrapperId: string, youtubeId: string): void => {
  const element = document.getElementById(wrapperId);
  if (element !== null) {
    element.innerHTML = `<iframe width="640" height="450" src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
};

export const youtubePlugin = () => {
  ToastEditor.codeBlockManager.setReplacer(
    "youtube",
    (youtubeId: string): string => {
      console.log(youtubeId);
      // Indentify multiple code blocks
      const id = uuidV4();
      const wrapperId: string = `yt${id}`;
      // Avoid sanitizing iframe tag
      setTimeout(renderYoutube.bind(null, wrapperId, youtubeId), 0);
      return `<div style="text-align: center" id="${wrapperId}"></div>`;
    }
  );
};
