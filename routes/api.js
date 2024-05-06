var express = require('express');
var router = express.Router();
var path = require('path');
var fileUpload = require('express-fileupload');

router.use(fileUpload({
    safeFileNames: true,
    createParentPath: true,
    preserveExtension: true
}));
/* GET users listing. */
router.post('/', function (req, res, next) {
    let uploadPath;

    //console.log("req files : ", req.files.file);

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    uploadPath = path.join(__dirname, '../files', req.files.file.name);
    //console.log("path : ", uploadPath);
    //console.log("name files : ", req.files.file.name);

    // Use the mv() method to place the file somewhere on your server
    req.files.file.mv(uploadPath, function (err) {
        if (err) {
            console.log("error: ", err);
            return res.status(500).send(err);
        }
        console.info("File received: ", req.files.file.name);
        return res.status(201).send("File Uploaded Successfully.");
    });
});

module.exports = router;
