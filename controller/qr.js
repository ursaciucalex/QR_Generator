
import qr from 'qrcode';
import User from '../model/userSchema.js'
import open from 'open'


const qrcode = (req, res) => {
    
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



