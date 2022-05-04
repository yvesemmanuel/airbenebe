import express = require('express');
import cors = require('cors');
import { User } from "../airbenebe/src/app/interfaces/User";
import { UserRegister } from "./userRegister";

const PORT = 3000;
const app = express();

var registers: UserRegister = new UserRegister();

app.use(express.json());
app.use(cors());

app.post('/user', function (req: express.Request, res: express.Response) {
  var user: User = <User>req.body;
  
  user = registers.create(user);
  if (user) {
    res.send({ "success": "O usuário foi cadastrado com sucesso" });
  } else {
    res.send({ "failure": "O usuário não pode ser cadastrado" });
  }
})

app.get('/users', function (req, res) {
  console.log('GET /users: ' + req)
  res.send(JSON.stringify(registers.getUsers()));
})

app.listen(PORT, function () {
  console.log('Example app listening on port ' + PORT + '!')
})

export { app }