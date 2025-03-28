const express = require("express");
const router = express.Router();
const Game = require("../models/Game");

router.post("/add", async (req, res) => {
    try {
        const { title, iframe_url, thumbnail } = req.body;
        const newGame = await Game.create({
            title,
            iframe_url,
            thumbnail
        });
        res.json({
            message: "Thêm game thành công!",
            game: newGame
        });
    } catch (error) {
        console.error("Lỗi khi thêm game:", error);
        res.status(500).json({ error: "Không thể thêm game!" });
    }
});

router.get("/get", async (req, res) => {
    try {
        const gameId = req.query.id; // Lấy id từ query string

        if (gameId) {
            const game = await Game.findOne({ where: { id: gameId } });

            if (!game) {
                return res.status(404).json({ error: "Game không tồn tại!" });
            }

            return res.json(game); // Trả về game có id tương ứng
        }

        const games = await Game.findAll();
        res.json(games); // Nếu không có id, trả về tất cả game
    } catch (error) {
        console.error("Lỗi khi lấy danh sách game:", error);
        res.status(500).json({ error: "Không thể lấy danh sách game!" });
    }
});


module.exports = router;