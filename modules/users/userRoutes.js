// TODO: 1. შექმენით user-ების store
// TODO: 2. user-ს უნდა ქონდეს id, firstName, lastName, nickName, password, isDeleted ფილდები
// TODO: 3. გააკეთეთ CRUD ოპერაციები მათზე (CREATE, UPDATE, DELETE, GET)
// TODO: 4. გამოიყენეთ express.Router() http მეთოდების ჰენდლინგისთვის
const router = require("express").Router();
const usersStore = require("./usersStore");

router.get("/", (req, res) => {
  return res.json(usersStore.filter((user) => user.isDeleted === 0));
});
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  console.log(userId);
  if (!usersStore.find((user) => user.id === parseInt(userId))) {
    return res.json(`User id doesn't exist`);
  }
  return res.json({
    user: usersStore.find((user) => user.id === parseInt(userId)),
  });
});
router.post("/", (req, res) => {
  const { id, firstName, lastName, nickName, password, isDeleted } = req.body;

  const user = usersStore.find((user) => user.id === parseInt(id));

  if (user) {
    return res.status(403).json("User alraedy exists");
  }

  usersStore.push({
    id: id,
    firstName: firstName,
    lastName: lastName,
    nickName: nickName,
    password: password,
    isDeleted: isDeleted,
  });
  return res.json({
    message: "CREATED",
    updatedUsersArr: usersStore,
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = usersStore.find((user) => user.id === parseInt(id));

  if (user) {
    user.isDeleted = true;
    return res.json({
      message: "DELETED",
      updatedUsersArr: usersStore,
    });
  }
  return res.status(404).json({
    message: "NOT_FOUND",
  });
});
router.put("/:paramId", (req, res) => {
  const { paramId } = req.params;
  const { id, firstname, lastName, nickName, password, isDeleted } = req.body;
  const user = usersStore.find((user) => user.id === parseInt(paramId));
  const info = {
    id: title,
    firstname: firstname,
    lastName: lastName,
    nickName: nickName,
    password: password,
    isDeleted: isDeleted,
  };

  if (!user) {
    return res.status(404).json(`User doesn't exist`);
  } else {
    usersStore.splice(usersStore.indexOf(user), 1, info);
    return res.status(200).json({
      message: "User was succesfully updated",
      updatedUsersList: usersStore,
    });
  }
});
module.exports = router;
