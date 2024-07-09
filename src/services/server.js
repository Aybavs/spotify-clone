const express = require("express");
const mysql = require("mysql");
const bcrypt = require("bcryptjs");
const http = require("http");
const cors = require("cors");

const port = 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    credentials: true,
  })
);

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "password",
  database: "spoticlone",
};

const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("MySQL veritabanına bağlanırken bir hata oluştu:", err);
    return;
  }
  console.log("MySQL veritabanına başarıyla bağlanıldı");
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(query, [email, hashedPassword], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Bir hata oluştu" });
      return;
    }
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu" });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Bir hata oluştu" });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ message: "Hatalı şifre veya E-posta" });
      return;
    }
    const user = result[0];
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json({ message: "Hatalı şifre veya E-posta" });
      return;
    }
    res.status(200).json({ message: "Başarıyla giriş yapıldı" });
  });
});

app.get("/playlists", (req, res) => {
  const query = "SELECT * FROM playlists";
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Bir hata oluştu" });
      return;
    }
    res.status(200).json(result);
  });
});

app.get("/playlist/:id/songs", (req, res) => {
  const playlistId = req.params.id;
  const query =
    "SELECT * FROM songs s INNER JOIN playlist_songs ps ON s.id = ps.song_id WHERE ps.playlist_id = ?";
  db.query(query, [playlistId], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Bir hata oluştu" });
      return;
    }
    res.status(200).json(result);
  });
});

app.post(
    "/addSong",
    upload.fields([
        { name: "image", maxCount: 1 },
        { name: "song", maxCount: 1 },
    ]),
    (req, res) => {
        const { title, artist_id, album_id } = req.body;

        // First, add the song to the database
        const query =
            "INSERT INTO songs (title, artist_id, album_id) VALUES (?, ?, ?)";
        const values = [title, artist_id, album_id];

        db.query(query, values, (err, result) => {
            if (err) {
                console.error("An error occurred while adding the song:", err);
                return res.status(500).send("An error occurred while adding the song.");
            }

            const songId = result.insertId; // The inserted song's ID

            // Generate file names with the song ID
            const imageFileName = `image_${songId}.jpg`;
            const songFileName = `song_${songId}.mp3`;

            // Rename and save the files to the correct locations
            const oldImagePath = req.files.image[0].path;
            const oldSongPath = req.files.song[0].path;

            const newImagePath = path.join(__dirname, "images", imageFileName);
            const newSongPath = path.join(__dirname, "songs", songFileName);

            fs.rename(oldImagePath, newImagePath, (err) => {
                if (err) {
                    console.error("An error occurred while renaming the image file:", err);
                    return res.status(500).send("An error occurred while renaming the image file.");
                }

                fs.rename(oldSongPath, newSongPath, (err) => {
                    if (err) {
                        console.error("An error occurred while renaming the song file:", err);
                        return res.status(500).send("An error occurred while renaming the song file.");
                    }

                    // Determine the relative file paths
                    const relativeImagePath = path.join("../assets", imageFileName);
                    const relativeSongPath = path.join("../assets", songFileName);

                    // Update the file names in the database
                    const updateQuery =
                        "UPDATE songs SET image = ?, audio_file_url = ? WHERE id = ?";
                    const updateValues = [relativeImagePath, relativeSongPath, songId];

                    db.query(updateQuery, updateValues, (err) => {
                        if (err) {
                            console.error("An error occurred while updating the file names:", err);
                            return res.status(500).send("An error occurred while updating the file names.");
                        }

                        res.status(201).send("Song and details added successfully.");
                    });
                });
            });
        });
    }
);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API çalışıyor: http://localhost:${port}`);
});
