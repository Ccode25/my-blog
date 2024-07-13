// import express, { urlencoded } from "express";
// import bodyParser from "body-parser";


// const app = express();
// const port = 3000;



// app.use(bodyParser.urlencoded({extended: true}))
// app.set('view engine', 'ejs');
// app.use(express.static("public"))



// app.get("/", (req, res) => {
//   res.render('index.ejs');
// })

// app.get("/about", (req, res) => {
//   res.render('about.ejs');
// })

// app.get("/post", (req, res) => {
//   res.render('post.ejs');
// })


// app.get("/contact", (req, res) => {
//   res.render('contact.ejs');
// })

// app.get("/form", (req, res) => {
//   res.render('blog.ejs');
// })

// app.post("/form", (req, res) => {
//   let title = req.body["blogTitle"]
//   console.log(title);
//   res.render("post.ejs", {titlePost: title})
  
// })




// app.listen(port, () => {
//   console.log(`Server running on ${port}.`)
// })
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let postData = {
  titlePost: "Featured Blog",
  subTitlePost: "Subtitle",
  contentPost: ""
};

// Define the cards array at the top
let cards = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // To parse JSON bodies
app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index.ejs', postData);
});

app.get("/about", (req, res) => {
  res.render('about.ejs', postData);
});

app.get("/post", (req, res) => {
  res.render('post.ejs', postData);
});

app.get("/contact", (req, res) => {
  res.render('contact.ejs', postData);
});

app.get("/form", (req, res) => {
  res.render('blog.ejs');
});

app.post("/", (req, res) => {
  const title = req.body.blogTitle;
  const subTitle = req.body.blogSubTitle;
  const content = req.body.blogContent;

  postData = {
    titlePost: title,
    subTitlePost: subTitle, 
    contentPost: content
  };
  
  console.log(title, subTitle, content);
  res.render('index.ejs', postData);
});

app.get('/cards', (req, res) => {
  res.render('cards', { cards });
});

app.get('/cards-data', (req, res) => {
  res.json(cards);
});

app.post('/add-card', (req, res) => {
  const newCard = req.body;
  newCard.id = Date.now(); // Assign a unique ID to each card
  cards.push(newCard);
  res.json({ success: true, id: newCard.id });
});

// New endpoint to handle deleting a card
app.delete('/delete-card/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  cards = cards.filter(card => card.id !== cardId);
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Server running on ${port}.`);
});



