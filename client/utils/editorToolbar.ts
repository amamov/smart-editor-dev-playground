import axios from "axios";
import emojis from "./emojis";

const uploadImageCallBack = async (file: File) => {
  //* test img api
  // return new Promise((resolve, reject) => {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open(
  //     "POST",
  //     "https://api.imgbb.com/1/upload?expiration=600&key=d514b116513eaea253f92712e8eadeec"
  //   );
  //   const data = new FormData();
  //   data.append("image", file);
  //   xhr.send(data);
  //   xhr.addEventListener("load", () => {
  //     const response = JSON.parse(xhr.responseText);
  //     console.log(response);
  //     resolve(response);
  //   });
  //   xhr.addEventListener("error", () => {
  //     const error = JSON.parse(xhr.responseText);
  //     console.log(error);
  //     reject(error);
  //   });
  // });
  try {
    const form = new FormData();
    form.append("image", file);
    const response = await axios.post(
      "http://localhost:5000/upload/img",
      form,
      { withCredentials: true }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const toolbar = {
  options: [
    "inline",
    "blockType",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "embedded",
    "image",
    "link",
    "emoji",
  ],
  inline: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
    // bold: { icon: bold, className: undefined },
    // italic: { icon: italic, className: undefined },
    // underline: { icon: underline, className: undefined },
    // strikethrough: { icon: strikethrough, className: undefined },
    // monospace: { icon: monospace, className: undefined },
    // superscript: { icon: superscript, className: undefined },
    // subscript: { icon: subscript, className: undefined },
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
    // unordered: { icon: unordered, className: undefined },
    // ordered: { icon: ordered, className: undefined },
  },
  textAlign: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
    // left: { icon: left, className: undefined },
    // center: { icon: center, className: undefined },
    // right: { icon: right, className: undefined },
    // justify: { icon: justify, className: undefined },
  },
  colorPicker: {
    // icon: color,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ],
  },
  link: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    // link: { icon: link, className: undefined },
    // unlink: { icon: unlink, className: undefined },
    linkCallback: undefined,
  },
  // history: { inDropdown: true },
  emoji: {
    // icon: emoji,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: emojis,
  },
  embedded: {
    // icon: embedded,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    embedCallback: undefined,
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
  image: {
    // icon: image,
    inDropdown: true,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    urlEnabled: false,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: uploadImageCallBack,
    previewImage: true,
    inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
    alt: { present: true, mandatory: false },
    defaultSize: {
      height: "auto",
      width: "auto",
    },
  },
};

export default toolbar;
