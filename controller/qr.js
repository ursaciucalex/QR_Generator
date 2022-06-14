
import qr from 'qrcode';
import User from '../model/userSchema.js'
import open from 'open'


const  qrcode = async (req, res) => {
    
    let user = await User.findById(req.decoded.authToken.id);
    let data = {
        firstName: user.firstName,
        lastName:user.lastName,
        age:user.age,
        sex: user.sex,
        lastSchool: user.lastSchool
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



