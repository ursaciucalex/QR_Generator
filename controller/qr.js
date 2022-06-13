
import qr from 'qrcode';
import User from '../model/userSchema.js'
import open from 'open'


const qrcode = (req, res) => {
    var authheader=req.headers.authorization;
    console.log(authheader)
    if(!authheader){
        
        var err=new Error("You are not authenticated")
        // Set the header for the response
        res.setHeader("WWW-Authenticate",'Basic')
        err.status=401
    
    }
    console.log(authheader)
    let data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        sex: req.body.sex,
        lastSchool: req.body.lastSchool
    };
    
    let strData = JSON.stringify(data)

    
    qr.toDataURL(strData, function (err,code){
       if(err) {
        return console.log("error occurred");
       }
       open(code);

       res.status(200).send(code);

    })    
}

export default  qrcode;



