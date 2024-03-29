const router = require("express").Router();
const User = require("../model/User");
// const Comment = require("../model/Comment");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { registerValidation, loginValidation } = require("../validation")




router.post("/register", async (req, res) => {

    //validation before create user
    const { error } = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //checking if the user is already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists!");

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);


    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
});

//Login
router.post("/login", async (req, res) => {

    //validation before login user
    const { error } = loginValidation(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    
    console.log(req.body);
    //checking if the user is registered in the database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(402).send("User does not exists!");

    //Password  is Correct
    user.password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(403).send("Email or password does not exists!");

    //Create and assign a jwt
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    // res.header("auth-token", token).send(token);
    res.json({ token: token });

});

// // GET isteği: Belirli bir bookId'ye sahip yorumları getirir
// router.get('/comments/:bookId', (req, res) => {
//     const bookId = req.params.bookId;
  
//     Comment.find({ bookId })
//       .then(comments => {
//         res.json(comments);
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'Yorumlar alınırken bir hata oluştu.' });
//       });
//   });



//   router.post('/comments', (req, res) => {
//     const { bookId, commentator, rate } = req.body;
  
//     const newComment = new Comment({
//       bookId,
//       commentator,
//       rate
//     });
  
//     newComment.save()
//       .then(comment => {
//         res.json(comment);
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'Yorum eklenirken bir hata oluştu.' });
//       });
//   });

module.exports = router;