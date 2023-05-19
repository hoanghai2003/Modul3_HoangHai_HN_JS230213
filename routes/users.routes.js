const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

const fs = require("fs");
// Doc tat ca du lieu
router.get("/", (req, res) => {
  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    res.json(data);
  } catch (error) {
    res.json(error);
  }
});
//Doc mot du lieu theo id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/users.json"));

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
  const uuid = uuidv4();
  let { name, username, email, street } = req.body;
  try {
    if (!name || !username || !email || !street) {
      res.json({ mess: "khong hop le" });
    } else {
      let Result = {
        id: uuid,
        name: name,
        username: username,
        email: email,
        address: {
          street: street,
          suite: "Suite 847",
          city: "Ha Noi",
          zipcode: "59590-4157",
          geo: {
            lat: Math.floor(Math.random() * -100000),
            lng: Math.floor(Math.random() * -100000),
          },
        },
        phone: null,
        website: null,
        company: {
          name: name,
          catchPhrase: "Face to face bifurcated interface",
          bs: "e-enable strategic applications",
        },
      };

      let data = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
      data.push(Result);
      fs.writeFileSync("./user-post-api/users.json", JSON.stringify(data));
      res.json({ mess: "success" });
    }
  } catch (error) {
    res.json(error);
  }
});

// put

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { name, username, email } = req.body;

  try {
    let data = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    let dataFindex = data.findIndex((e) => e.id === +id);

    if (dataFindex === -1) {
      res.json({ mess: "not found" });
    } else {
      data[dataFindex] = {
        ...data[dataFindex],
        name,
        username,
        email,
      };

      fs.writeFileSync("./user-post-api/users.json", JSON.stringify(data));
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
    let data = JSON.parse(fs.readFileSync("./user-post-api/users.json"));
    let findDelete = data.filter((e) => e.id !== parseInt(id));
    fs.writeFileSync("./user-post-api/users.json", JSON.stringify(findDelete));
    res.json({ mess: "success" });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
