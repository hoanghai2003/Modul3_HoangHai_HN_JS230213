const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
// Doc tat ca du lieu
router.get("/", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});
//Doc mot du lieu theo id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));

    let findData = data.find((e) => e.id === +id);
    if (findData) {
      res.json(findData);
    } else {
      res.json({ mess: "not found" });
    }
  } catch (error) {
    res.json(error);
  }
});
// Post
router.post("/", (req, res) => {
  let { title, body } = req.body;
  try {
    if (!title || !body) {
      res.json({ mess: "khong hop le" });
    } else {
      let ide = Math.floor(Math.random() * 999);
      let Result = {
        userId: ide,
        id: ide,
        title: title,
        body: body,
      };

      let data = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
      data.push(Result);
      fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(data));
      res.json({ mess: "success" });
    }
  } catch (error) {
    res.json(error);
  }
});

// put

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { title, body } = req.body;

  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    let dataFindex = data.findIndex((e) => e.id === +id);

    if (dataFindex === -1) {
      res.json({ mess: "not found" });
    } else {
      data[dataFindex] = {
        ...data[dataFindex],
        title,
        body,
      };

      fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(data));
      res.json({ mess: "success" });
    }
  } catch (error) {
    res.json(error);
  }
});

// delete

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/posts.json"));
    let findDelete = data.filter((e) => e.id !== parseInt(id));
    fs.writeFileSync("./user-post-api/posts.json", JSON.stringify(findDelete));
    res.json({ mess: "success" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
