const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 设置静态文件目录
app.use(express.static(path.join(__dirname)));
app.use(express.json());

// 处理根路径请求
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 处理注册请求
app.post('/register', (req, res) => {
  const { name, user_account, password, email } = req.body;

  // 读取现有数据
  const filePath = 'account.json';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件时发生错误：', err);
      res.status(500).send('读取文件时发生错误');
      return;
    }

    // 解析现有数据为JavaScript对象
    const existingData = JSON.parse(data);

    // 构建要保存的数据对象
    const newData = {
      name,
      user_account,
      password,
      email
    };

    // 将新的注册数据添加到现有数据
    existingData.push(newData);

    // 将更新后的数据转换为 JSON 字符串
    const jsonData = JSON.stringify(existingData);

    // 写入更新后的数据到 JSON 文件
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('写入文件时发生错误：', err);
        res.status(500).send('写入文件时发生错误');
        return;
      }
      console.log('数据已成功写入 JSON 文件。');
      res.send('注册成功！');
    });
  });
});


let loggedIn = false;
app.post('/login', (req, res) => {
  const { user_account, password } = req.body;

  // 读取现有数据
  const filePath = 'account.json';
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('读取文件时发生错误：', err);
      res.status(500).send('读取文件时发生错误');
      return;
    }

    // 解析现有数据为JavaScript对象
    const accounts = JSON.parse(data);

    // 验证用户名和密码
    const account = accounts.find((acc) => acc.user_account === user_account && acc.password === password);
    if (account) {
      console.log('登录成功');
      loggedIn = true;
      const indexPath = path.join(__dirname, 'index.html');
      const indexGoodfriendPath = path.join(__dirname, 'index-goodfriend.html');
      fs.readFile(indexPath, 'utf8', (err, indexContent) => {
        if (err) {
          console.error('读取文件时发生错误：', err);
          res.status(500).send('读取文件时发生错误');
          return;
        }
        const updatedContent = indexContent.replace(/(<p id="welcomeMessage">)([^<]*)(<\/p>)/, '<p id="welcomeMessage">' + account.name + '，歡迎!</p>');

        fs.readFile(indexGoodfriendPath, 'utf8', (err, indexGoodfriendContent) => {
          if (err) {
            console.error('读取文件时发生错误：', err);
            res.status(500).send('读取文件```javascript时发生错误');
            return;
          }

          const updatedGoodfriendContent = indexGoodfriendContent.replace(/(<p id="welcomeMessage">)([^<]*)(<\/p>)/, '<p id="welcomeMessage">' + account.name + '，歡迎!</p>');

          fs.writeFile(indexPath, updatedContent, (err) => {
            if (err) {
              console.error('写入文件时发生错误：', err);
              res.status(500).send('写入文件时发生错误');
              return;
            }

            fs.writeFile(indexGoodfriendPath, updatedGoodfriendContent, (err) => {
              if (err) {
                console.error('写入文件时发生错误：', err);
                res.status(500).send('写入文件时发生错误');
                return;
              }

              console.log('index.html 和 index-goodfriend.html 已更新');
              res.send({ name: account.name });
            });
          });
        });
      });
    } else {
      console.log('登录失败');
      res.status(401).send('用户名或密码错误');
    }
  });
});

// 处理登出请求
app.get('/logout', async (req, res) => {
  loggedIn = false;

  const indexPath = path.join(__dirname, 'index.html');
  const indexGoodfriendPath = path.join(__dirname, 'index-goodfriend.html');

  try {
    const indexContent = await fs.promises.readFile(indexPath, 'utf8');
    const updatedContent = indexContent.replace(/(<p id="welcomeMessage">)[^<]*(<\/p>)/, '$1浪人算命，讓你好命$2');
    await fs.promises.writeFile(indexPath, updatedContent);
    console.log('index.html 已更新aaaaa');
  } catch (err) {
    console.error('处理 index.html 文件时发生错误：', err);
    res.status(500).send('处理 index.html 文件时发生错误');
    return;
  }

  try {
    const indexGoodfriendContent = await fs.promises.readFile(indexGoodfriendPath, 'utf8');
    const updatedGoodfriendContent = indexGoodfriendContent.replace(/(<p id="welcomeMessage">)[^<]*(<\/p>)/, '$1浪人算命，讓你好命$2');
    await fs.promises.writeFile(indexGoodfriendPath, updatedGoodfriendContent);
    console.log('index-goodfriend.html 已更新');
  } catch (err) {
    console.error('处理 index-goodfriend.html 文件时发生错误：', err);
    res.status(500).send('处理 index-goodfriend.html 文件时发生错误');
    return;
  }

  res.redirect('/');
  return;
});


app.get('/check-login', (req, res) => {
  res.send(loggedIn ? 'true' : 'false');
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

