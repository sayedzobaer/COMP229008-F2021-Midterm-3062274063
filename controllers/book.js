// create a reference to the model
let Book = require("../models/book");

// Gets all books from the Database and renders the page to list all books.
module.exports.bookList = function (req, res, next) {
  Book.find((err, bookList) => {
    // console.log(bookList);
    if (err) {
      return console.error(err);
    } else {
      res.render("book/list", {
        title: "Book List",
        books: bookList,
      });
    }
  });
};

// Gets a book by id and renders the details page.
module.exports.details = (req, res, next) => {
  let id = req.params.id;

  Book.findById(id, (err, bookToShow) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      //show the edit view
      res.render("book/details", {
        title: "Book Details",
        book: bookToShow,
      });
    }
  });
};

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
  res.render("book/add_edit", {
    title: "Add Page",
    url: "/book/add",
    book: {
      _id: "",
      Title: "",
      Price: "",
      Description: "",
      Author: "",
      Genre: "",
    },
  });
};

// Processes the data submitted from the Add form to create a new book
module.exports.processAddPage = (req, res, next) => {
  let { id, ...body } = req.body;
  let book = new Book(body);
  book.save((err, data) => {
    if (err) res.send("error occured");
    res.redirect("/book/list");
  });
};

// Gets a book by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, data) => {
    if (err) res.send("error occured");
    res.render("book/add_edit", {
      title: "Edit book",
      url: "/book/edit/" + data._id,
      book: data,
    });
  });
};

// Processes the data submitted from the Edit form to update a book
module.exports.processEditPage = (req, res, next) => {
  let { id, ...body } = req.body;
  Book.findByIdAndUpdate(id, body, (err, data) => {
      if(err) res.send("error occured")
      else res.redirect("/book/list");
  })
};

// Deletes a book based on its id.
module.exports.performDelete = (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndRemove(id, (err, data) => {
      if(err) res.send("error occured");
      else res.redirect("/book/list");
  })
};
