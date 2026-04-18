const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());

// Images folder ko server se connect karne ke liye
app.use('/images', express.static(path.join(__dirname, 'images')));

app.get('/api/products', (req, res) => {
    const dir = path.join(__dirname, 'images');
    if (!fs.existsSync(dir)) return res.status(404).json([]);

    fs.readdir(dir, (err, files) => {
        if (err) return res.status(500).send("Folder nahi mila");
        // Sirf images uthayega
        const images = files.filter(f => f.match(/\.(jpg|jpeg|png|gif)$/i));
        res.json(images);
    });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Zohaib Traders Server Live on Port ${PORT}`));