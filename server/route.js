// 其他路由配置
const {} = require('./utils.js');

// 有副作用的函数，给 server 上注册路由
module.exports = function mounted(server, DB) {
   server.post('/login', function (req, res) {
      const {username, password} = req.body;
      if (username.length > 2 && (password + '').length > 5) {
         res.status(200).json({
            success: true
         })
      } else {
         res.status(400).json({
            success: false
         })
      }
   })

   server.post('/testLogin/user', function (req, res) {
      try {
        const {username, password, email, tel} = req.body;
        console.log({username, password, email, tel});

        res.json({success: true});
      } catch(err) {
        res.status(400).send({success: false})
      }
   })
};
