import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Initial post data for rendering pages
let postData = {
  titlePost: "Featured Blog",
  subTitlePost: "Subtitle",
  contentPost: ""
};

// Define the cards array to store card data
let cards = [];

// Function to merge postData and cards into mergedData
const getMergedData = () => {
  let mergedData = [
    { id: 0, title: postData.titlePost, content: postData.contentPost }
  ];

  cards.forEach(card => {
    mergedData.push({
      id: card.id,
      title: card.title,
      content: card.content
    });
  });

  return mergedData;
};

console.log(getMergedData());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static("public"));

// Route to render the home page with post data
app.get("/", (req, res) => {
  res.render('index.ejs', postData);
});

// Route to render the about page with post data
app.get("/about", (req, res) => {
  res.render('about.ejs', postData);
});

// Route to render the post page with post data
app.get("/post", (req, res) => {
  res.render('post.ejs', postData);
});

// Route to render the contact page with post data
app.get("/contact", (req, res) => {
  res.render('contact.ejs', postData);
});

// Route to render the form page
app.get("/form", (req, res) => {
  res.render('blog.ejs');
});

// Route to handle form submissions and update post data
app.post("/", (req, res) => {
  const { blogTitle, blogSubTitle, blogContent } = req.body;

  postData = {
    titlePost: blogTitle,
    subTitlePost: blogSubTitle,
    contentPost: blogContent
  };

  console.log(blogTitle, blogSubTitle, blogContent);
  const mergeData = getMergedData();
  res.render('index.ejs', postData);
});

// Route to render the cards page with mergedData
// Route to render the cards page with mergedData
app.get('/cards', (req, res) => {
  const mergedData = getMergedData();
  res.render('cards', { cards: mergedData });
});


// API route to send card data as JSON
app.get('/cards-data', (req, res) => {
  res.json(cards);
});

// API route to add a new card
app.post('/add-card', (req, res) => {
  const newCard = req.body;
  newCard.id = Date.now(); // Assign a unique ID to the new card
  cards.push(newCard);
  res.json({ success: true, id: newCard.id });
});

// API route to delete a card by ID
app.delete('/delete-card/:id', (req, res) => {
  const cardId = parseInt(req.params.id, 10); // Get the card ID from the URL parameters and parse it as an integer
  cards = cards.filter(card => card.id !== cardId);
  res.json({ success: true });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
