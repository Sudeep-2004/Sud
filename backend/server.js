const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/run", (req, res) => {
    const { language, code } = req.body;
    
    let filename, command;

    if (language === "python") {
        filename = "temp.py";
        command = `python3 ${filename}`;
    } else if (language === "javascript") {
        filename = "temp.js";
        command = `node ${filename}`;
    } else if (language === "cpp") {
        filename = "temp.cpp";
        command = `g++ ${filename} -o temp && ./temp`;
    } else {
        return res.json({ error: "Unsupported language" });
    }

    // Write code to a file
    fs.writeFileSync(filename, code);

    // Execute the code
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.json({ error: stderr || error.message });
        } else {
            res.json({ output: stdout });
        }
        
        // Delete the temp file
        fs.unlinkSync(filename);
    });
});

// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
