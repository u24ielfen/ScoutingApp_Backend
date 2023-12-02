const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "192.168.68.151",
  port: "3306",
  user: "root",
  password: "",
  database: "test",
});
app.get("/getAverageStats", (req, res) => {
  db.query("SELECT * FROM pitscout", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getAverageAutoBallSuccess/:team_number", (req, res) => {
  const team_number = req.params.team_number;
  db.query(
    `SELECT AVG(auto_Balls_success) FROM matchscout WHERE team_number = '${team_number}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getAverageAutoBallShot/:team_number", (req, res) => {
  const team_number = req.params.team_number;
  db.query(
    `SELECT AVG(auto_Balls_shot) FROM matchscout WHERE team_number = '${team_number}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getAverageTeleopBallSuccess/:team_number", (req, res) => {
  const team_number = req.params.team_number;
  db.query(
    `SELECT AVG(teleop_Balls_success) FROM matchscout WHERE team_number = '${team_number}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/getAverageTeleopBallShot/:team_number", (req, res) => {
  const team_number = req.params.team_number;
  db.query(
    `SELECT AVG(teleop_Balls_shot) FROM matchscout WHERE team_number = '${team_number}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/getAverageClimbTime/:team_number", (req, res) => {
  const team_number = req.params.team_number;
  db.query(
    `SELECT AVG(climb_time) FROM matchscout WHERE team_number = '${team_number}'`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/putMatch", (req, res) => {
  const matchType = req.body.match_type;
  const matchNumber = req.body.match_number;
  const blue_1 = req.body.blue_1;
  const blue_2 = req.body.blue_2;
  const blue_3 = req.body.blue_3;
  const red_1 = req.body.red_1;
  const red_2 = req.body.red_2;
  const red_3 = req.body.red_3;
  const SQL =
    "INSERT INTO `matches` (`match_type`, `match_number`, `blue_1`, `blue_2`, `blue_3`, `red_1`, `red_2`, `red_3`) VALUES (?, ?, ?, ?, ?, ?, ?, ? )";
  db.query(
    SQL,
    [matchType, matchNumber, blue_1, blue_2, blue_3, red_1, red_2, red_3],
    (err, result) => {}
  );
});
app.get("/getMatchList", (req, res) => {
  db.query("SELECT * FROM matches", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// app.get("/getOneMatch"){
//   db.query("SELECT * FROM `matches`")
// }

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

app.get("/getOneMatch/:id", (req, res) => {
  const id = req.params.id;
  const SQL = `SELECT * FROM matches WHERE id = '${id}'`;
  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/getTeamFromMatchSelect/:id", (req, res) => {
  const team_number = req.params.id;
  const SQL = `SELECT * FROM teams WHERE team_number = '${team_number}'`;
  db.query(SQL, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/addTeam", (req, res) => {
  const team_name = req.body.team_name;
  const team_number = req.body.team_number;
  const SQL = "INSERT INTO `teams`(`team_name`, `team_number`) VALUES (?, ?)";
  db.query(SQL, [team_name, team_number], (err, result) => {});
});

app.post("/putPit", (req, res) => {
  const team_number = req.body.team_number;
  const auto_points = req.body.auto_points;
  const teleop_points = req.body.teleop_points;
  const climb_level = req.body.climb_level;
  const drive_train = req.body.drive_train;
  const drive_motors = req.body.drive_motors;
  const climb_consistency = req.body.climb_consistency;
  const point_consistency = req.body.point_consistency;
  const team_name = req.body.team_name;
  const is_DefenseBot = req.body.is_DefenseBot;
  const shoot_height = req.body.shoot_height;
  const notes = req.body.notes;
  const SQL =
    "INSERT INTO `pitscout` (`team_number`, `auto_points`, `teleop_points`, `climb_level`, `drive_train`, `drive_motors`, `point_consistency`, `climb_consistency`, `team_name`, `is_DefenseBot`, `shoot_height`, `notes`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      team_name,
      is_DefenseBot,
      shoot_height,
      notes,
    ],
    (err, result) => {}
  );
});

app.post("/putMatchBot", (req, res) => {
  const match_id = req.body.match_id;
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
    "INSERT INTO `matchscout`(`match_number`, `team_number`, `auto_Balls_shot`, `auto_Balls_success`, `teleop_Balls_shot`, `teleop_Balls_success`, `was_Defense`, `climb_height`, `climb_time`, `went_To_Enemy`, `notes`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    SQL,
    [
      match_id,
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

app.listen(process.env.PORT || 3002, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});
