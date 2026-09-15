import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import path from 'path';
import { postContactForm } from './src/controllers/contactFormController.js';
import { postPortfolioForm, getHomePage } from './src/controllers/portfolioDataController.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.resolve('src', 'static')));
app.use(expressLayouts);

app.set("view engine", "ejs");
app.set('views', path.resolve('src', 'views'));
app.set('layout', 'layout');

app.get('/', getHomePage);
app.get('/portfolio-form', (req, res) => {
    res.render('portfolioForm', { css: 'portfolioForm.css', title: 'Edit Portfolio', page: 'form' });
}); 
app.get('/contactForm', (req, res) => {
    res.render('contact', { css: 'contact.css', title: 'Contact', page: 'contact' });
});

app.post('/contactForm', postContactForm);
app.post('/portfolioForm', postPortfolioForm);


const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`Server is listening at ${PORT}`);
})