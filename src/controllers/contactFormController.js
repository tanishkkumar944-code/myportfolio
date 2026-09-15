export const postContactForm = (req, res) => {
    console.log(req.body);
    res.redirect('/contactForm?sent=true');
}