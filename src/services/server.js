import express from "express";
import cors from "cors";
import mysql from "mysql";
import bcrypt from "bcrypt";
import http from "http";
import fs from "fs";
import path from "path";
import multer from "multer";
const upload = multer({ dest: 'uploads/' });

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

      // Önce şarkıyı veritabanına ekleyin
      const query =
          "INSERT INTO songs (title, artist_id, album_id) VALUES (?, ?, ?)";
      const values = [title, artist_id, album_id];

      db.query(query, values, (err, result) => {
          if (err) {
              console.error("Şarkı eklenirken bir hata oluştu:", err);
              return res.status(500).send("Şarkı eklenirken bir hata oluştu.");
          }

          const songId = result.insertId; // Eklenen şarkının ID'si

          // Şarkı ID'si ile dosya adları oluşturun
          const imageFileName = `image_${songId}.jpg`;
          const songFileName = `song_${songId}.mp3`;

          // Dosyaları doğru konumlara yeniden adlandırarak kaydedin
          const oldImagePath = req.files.image[0].path;
          const oldSongPath = req.files.song[0].path;

          const newImagePath = path.join(__dirname, "src", "components", imageFileName);
          const newSongPath = path.join(__dirname, "src", "components", songFileName);

          fs.rename(oldImagePath, newImagePath, (err) => {
              if (err) {
                  console.error("Görsel dosyası yeniden adlandırılırken bir hata oluştu:", err);
                  return res.status(500).send("Görsel dosyası yeniden adlandırılırken bir hata oluştu.");
              }

              fs.rename(oldSongPath, newSongPath, (err) => {
                  if (err) {
                      console.error("Şarkı dosyası yeniden adlandırılırken bir hata oluştu:", err);
                      return res.status(500).send("Şarkı dosyası yeniden adlandırılırken bir hata oluştu.");
                  }

                  // Göreli dosya yollarını belirleyin
                  const relativeImagePath = path.join("src", "components", imageFileName);
                  const relativeSongPath = path.join("src", "components", songFileName);

                  // Dosya adlarını veritabanında güncelleyin
                  const updateQuery =
                      "UPDATE songs SET image = ?, audio_file_url = ? WHERE song_id = ?";
                  const updateValues = [relativeImagePath, relativeSongPath, songId];

                  db.query(updateQuery, updateValues, (err) => {
                      if (err) {
                          console.error("Dosya adları güncellenirken bir hata oluştu:", err);
                          return res.status(500).send("Dosya adları güncellenirken bir hata oluştu.");
                      }

                      res.status(201).send("Şarkı ve detaylar başarıyla eklendi.");
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
