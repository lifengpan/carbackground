const home = require('../updata/login')

const loading = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    console.log(post)
    const x = await home.login(req, res, post)
    if (x.success === true) {
      res.set("Authorization", x.data.username);
      x.data.token = x.data.username
    }
    console.log(x)
    res.set("content-type","application/json;charset = utf-8");
    const data = JSON.stringify(x)
    console.log(data)
    res.send(data)
  })
}

const register = async (req, res) => {
  var post = ''
  req.on('data', async function(chunk) {
    post += chunk
    post = JSON.parse(post)
    console.log(post)
    if (post.username === '') {
      res.set("content-type","application/json;charset = utf-8");
      res.send("post为空")
      return
    }
    const x = await home.register(req, res, post)
    console.log(x)
    res.set("content-type","application/json;charset = utf-8");
    const data = JSON.stringify(x)
    console.log(data)
    res.send(data)
  })
}

module.exports = {
  loading,
  register
}