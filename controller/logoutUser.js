
const logoutUser = (req,res) => {
    req.session.destroy(() => {
     req.logout();
    });
   }

export default logoutUser;
