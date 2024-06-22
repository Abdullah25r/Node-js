import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
const password = "bhatti2739";
app.use(bodyParser.urlencoded({extended: true}));
let isAuthorized = false;
app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html");
})
app.use(checkAuthenitcation)

function checkAuthenitcation(req,res,next){
    let incomingPass = req.body["password"];
    if(incomingPass == password){
            isAuthorized = true;
    }else{
    res.send("invalid password");
    res.sendFile(__dirname + "/index.html");
    }
    next()
}
app.post("/submit",(req,res)=>{
    if (isAuthorized) {
        res.sendFile(__dirname + "/secret.html")
    }else
     res.send("<h1>Invalid Pasword!!!</h1>")
})




app.listen(port, (req, res) => {
  console.log(`Server is listening from port${port}`);
});
