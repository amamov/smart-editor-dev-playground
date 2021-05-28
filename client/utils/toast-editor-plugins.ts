import { v4 as uuidV4 } from "uuid";

/*
```youtube
Zl07LUsR6P0
```
*/

const renderYoutube = (wrapperId: string, youtubeId: string): void => {
  const element = document.getElementById(wrapperId);
  //* 황금비율 계산 : https://voidism.net/metalli
  const width: string = "600";
  const height: string = "371";
  if (element !== null) {
    element.innerHTML = `<iframe align="center" width=${width} height=${height} src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  }
};

export const youtubePlugin = (editor) => {
  const { codeBlockManager } = Object.getPrototypeOf(editor).constructor;
  codeBlockManager.setReplacer("youtube", (youtubeId: string): string => {
    const id = uuidV4();
    const wrapperId: string = `yt${id}`;
    setTimeout(renderYoutube.bind(null, wrapperId, youtubeId), 0);
    return `<div style="text-align: center" class="youtube_container" id="${wrapperId}"></div>`;
  });
};
