const router = require("express").Router();
const Comment = require("../model/Comment");


  router.post('/addComment', (req, res) => {
    const { bookId, commentator, comment,rate } = req.body;
  
    const newComment = new Comment({
      bookId,
      commentator,
      comment,
      rate
    });
  
    newComment.save()
      .then(newComment => {
        res.json(newComment);
      })
      .catch(err => {
        res.status(500).json({ error: 'Yorum eklenirken bir hata oluştu.' });
      });
  });

  
// GET isteği: Belirli bir bookId'ye sahip yorumları getirir
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

router.get('/comments/:bookId', (req, res) => {
    const bookId = req.params.bookId;
  
    Comment.find({ bookId })
      .then(comments => {
        // Map içinde liste içinde map şeklinde düzenleme
        const formattedComments = comments.map(comment => ({
          id: comment._id,
          bookId: comment.bookId,
          commentator: comment.commentator,
          comment: comment.comment,
          rate: comment.rate,
          date: comment.date,
        }));
  
        res.json({ comments: formattedComments });
      })
      .catch(err => {
        res.status(500).json({ error: 'Yorumlar alınırken bir hata oluştu.' });
      });
  });

// router.get('/comments/:bookId', (req, res) => {
//     const bookId = req.params.bookId;
  
//     Comment.find({ bookId })
//       .then(comments => {
//         // Map içinde liste içinde map şeklinde düzenleme
//         const formattedComments = comments.reduce((acc, comment) => {
//           acc.push({
//             id: comment._id,
//             bookId: comment.bookId,
//             commentator: comment.commentator,
//             comment: comment.comment,
//             rate: comment.rate,
//             date: comment.date,
//           });
//           return acc;
//         }, []);
  
//         res.json(formattedComments);
//       })
//       .catch(err => {
//         res.status(500).json({ error: 'Yorumlar alınırken bir hata oluştu.' });
//       });
//   });
  
  
  
  
  
  
  


module.exports = router;