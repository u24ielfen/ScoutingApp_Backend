const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "",
  database: "robotics",
});

app.post("/putPit", (req, res) => {
  const team_number = req.body.team_number;
  const team_name = req.body.team_name;
  const auto_points = req.body.auto_points;
  const teleop_points = req.body.teleop_points;
  const climb_level = req.body.climb_level;
  const drive_train = req.body.drive_train;
  const drive_motors = req.body.drive_motors;
  const point_consistency = req.body.point_consistency;
  const climb_consistency = req.body.climb_consistency;
  // const starting_pos = req.body.starting_pos;
  const is_DefenseBot = req.body.is_DefenseBot;
  const shoot_height = req.body.shoot_height;
  const notes = req.body.notes;
  const SQL =
    "INSERT INTO `pitscout`(`team_number`, `auto_points`, `teleop_points`, `climb_level`, `drive_train`, `drive_motors`, `point_consistency`, `climb_consistency`, `team_name`, `is_DefenseBot`, `shoot_height`, `notes`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    SQL,
    [
      team_number,
      auto_points,
      teleop_points,
      climb_level,
      drive_train,
      drive_motors,
      point_consistency,
      climb_consistency,
      // starting_pos,
      team_name,
      is_DefenseBot,
      shoot_height,
      notes,
    ],
    (err, result) => {}
  );
});
app.get("/getPitStats", (req, res) => {
  db.query("SELECT * FROM pitscout", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getTeams", (req, res) => {
  const SQL = "SELECT * FROM pitscout ORDER BY team_number ASC";
  db.query(SQL, (err, result) => {
    res.send(result);
  });
});

app.get("/getPreTeam/:id", (req, res) => {
  const id = req.params.id;
  const SQL = `SELECT * FROM pitscout WHERE team_number = '${id}'`;
  db.query(SQL, (err, result) => {
    res.send(result);
  });
});

app.get("/getMatchTeam/:id", (req, res) => {
  const id = req.params.id;
  const SQL = `SELECT * FROM matchscout WHERE team_number = '${id}'`;
  db.query(SQL, (err, result) => {
    res.send(result);
  });
});

app.post("/putMatch", (req, res) => {
  const match_number = req.body.match_number;
  const team_name = req.body.team_name;
  const team_number = req.body.team_number;
  const auto_Balls_shot = req.body.auto_Balls_shot;
  const auto_Balls_success = req.body.auto_Balls_success;
  const teleop_Balls_shot = req.body.teleop_Balls_shot;
  const teleop_Balls_success = req.body.teleop_Balls_success;
  const was_Defense = req.body.was_Defense;
  const climb_height = req.body.climb_height;
  const climb_time = req.body.climb_time;
  const went_To_Enemy = req.body.went_To_Enemy;
  const notes = req.body.notes;
  const SQL =
    "INSERT INTO `matchscout`(`match_number`, `team_name`, `team_number`, `auto_Balls_shot`, `auto_Balls_success`, `teleop_Balls_shot`, `teleop_Balls_success`, `was_Defense`, `climb_height`, `climb_time`, `went_To_Enemy`, `notes`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? )";
  db.query(
    SQL,
    [
      match_number,
      team_name,
      team_number,
      auto_Balls_shot,
      auto_Balls_success,
      teleop_Balls_shot,
      teleop_Balls_success,
      was_Defense,
      climb_height,
      climb_time,
      went_To_Enemy,
      notes,
    ],
    (err, result) => {}
  );
});
app.listen(process.env.PORT || 3000, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
