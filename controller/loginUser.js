import bcrypt from 'bcrypt';
import User from '../model/userSchema.js';

const loginUser = async (req, res) => {
    const body = req.body;
    const user = await User.findOne({ email: body.email });
    if (user) {
      const validPassword = await bcrypt.compare(body.password, user.password);
      if (validPassword) {
        //body.loggedIn= true;
        res.status(200).json({ message: "Logged in successfully - Valid password" });
        //console.log(body.loggedIn);


      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "User does not exist" });
    }
  };

  export default loginUser;