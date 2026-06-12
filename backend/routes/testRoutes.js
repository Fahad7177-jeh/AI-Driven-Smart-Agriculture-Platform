const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/sendEmail");

router.get("/send-email", async (req, res) => {
    try {

        await sendEmail({
            email: "shaikfahadjahangir251008@gmail.com",
            subject: "Smart AI Farming Test",
            message: "Email service is working successfully!"
        });

        res.json({
            message: "Email sent successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

module.exports = router;