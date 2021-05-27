import { Router } from "express";
import { jwtAccess, onlyPrivate, onlyPublic } from "../controller/auth";
import { uploadImg } from "../middlewares/upload";
import Doc from "../schema/Doc";

const router = Router();

router.get("/", (req, res) => {
  res.send({ hello: "world" });
});

router.get("/favicon.ico", (req, res) => {
  res.status(200).send("favicon");
});

router.get("/test/jwt", jwtAccess, (req, res) => {
  console.log(req.user);
  res.send({ status: true, message: "success token access" });
});

router.get("/test/private", onlyPrivate, (req, res) => {
  console.log(req.user);
  res.send({ status: true, message: "private" });
});

router.get("/test/public", onlyPublic, (req, res) => {
  console.log(req.user);
  res.send({ status: true, message: "public" });
});

router.post("/doc", async (req, res) => {
  try {
    const { _id, data } = req.body;
    const doc = new Doc({ _id, data });
    await doc.save();
    res.send("wow");
  } catch (error) {
    console.error(error);
  }
});

router.get("/doc/:id", async (req, res, next) => {
  try {
    const docId = req.params.id;
    const doc = await Doc.findById(docId);
    if (doc === null) {
      throw new Error("not found that document");
    }
    res.send(doc);
  } catch (error) {
    next(error);
  }
});

router.post("/upload/img", uploadImg, (req, res) => {
  const fieldname: string = req.file.fieldname; // folder이름
  const filename: string = req.file.filename;
  res.send({
    link: `http://localhost:5000/media/${fieldname}/${filename}`,
  });
});

export default router;
