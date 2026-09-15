import fs from 'fs';
import path from 'path';
const filePath = 'src/model/portfolioDataModel.json';

const REPEATER_FIELDS = ['education', 'projects', 'internships', 'achievements', 'certifications', 'activities'];

export const postPortfolioForm = (req, res) => {
    console.log('Received portfolio form submission:', req.body);

    const data = fs.readFileSync(filePath, 'utf8');
    const portfolioData = JSON.parse(data);

    const formData = { ...req.body };

    REPEATER_FIELDS.forEach((field) => {
        if (typeof formData[field] === 'string') {
            try {
                formData[field] = JSON.parse(formData[field] || '[]');
            } catch (err) {
                console.warn(`Failed to parse ${field}, defaulting to []:`, err.message);
                formData[field] = [];
            }
        }
    });

    formData.openToInternships = formData.openToInternships === 'on' || formData.openToInternships === true;

    const updatedData = { ...portfolioData, ...formData };

    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2));
    res.redirect('/');
};

export const getHomePage = (req, res) => {
    const filePath = path.resolve('src', 'model', 'portfolioDataModel.json');
    const data = fs.readFileSync(filePath, 'utf8');
    const portfolio = JSON.parse(data);
    res.render('home', { portfolio, css: 'home.css', title: portfolio.name || 'Portfolio', page: 'home' });
}