import { v4 as uuidV4 } from "uuid";

/*
```youtube
6VPsZOQ6Mkw
```
```source-mp4
http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4
```
*/

type VideoMap = {
  youtube: "https://www.youtube.com/embed/";
  "source-mp4": string;
  "source-avi": string;
};

const videoMap: VideoMap = {
  youtube: "https://www.youtube.com/embed/",
  "source-mp4": "",
  "source-avi": "",
};

const renderVideo = (
  wrapperId: string,
  sourceId: string,
  videoType: string,
  videoMap: VideoMap
) => {
  const element = document.getElementById(wrapperId);
  const url = videoMap[videoType];
  const width: string = "600";
  const height: string = "371";
  if (url) {
    //* 황금비율 계산 : https://voidism.net/metalli
    element.innerHTML = `<iframe align="center" width=${width} height=${height} src="${url}${sourceId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (/^source-/.test(videoType)) {
    const type = videoType.replace("source-", "");
    element.innerHTML = `<video width=${width} height=${height} controls src="${sourceId}" type="video/${type}"></video>`;
  }
};

function videoPlugin(editor) {
  const { codeBlockManager } = Object.getPrototypeOf(editor).constructor;
  Object.keys(videoMap).forEach((videoType) => {
    codeBlockManager.setReplacer(videoType, (sourceId: string) => {
      if (!sourceId) return;
      const id = uuidV4();
      const wrapperId: string = `${videoType}${id}`;
      setTimeout(
        renderVideo.bind(null, wrapperId, sourceId, videoType, videoMap),
        0
      );
      return `<div style="text-align:center" class="video_container" id="${wrapperId}"></div>`;
    });
  });
}

export default videoPlugin;
