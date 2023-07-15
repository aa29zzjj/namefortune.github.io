const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// 設定靜態文件目錄
app.use(express.static(path.join(__dirname, 'namefortune.github.io')));
app.use(express.json());

// 處理根路徑請求
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'namefortune.github.io', 'index.html'));
});

// 處理註冊請求
app.post('/register', (req, res) => {
  const { name, user_account, password, email } = req.body;

  // 讀取現有數據
  const filePath = path.join(__dirname, 'account.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('讀取文件時發生錯誤：', err);
      res.status(500).send('讀取文件時發生錯誤');
      return;
    }

    // 解析現有數據為 JavaScript 對象
    const existingData = JSON.parse(data);

    // 構建要保存的數據對象
    const newData = {
      name,
      user_account,
      password,
      email
    };

    // 將新的註冊數據添加到現有數據
    existingData.push(newData);

    // 將更新後的數據轉換為 JSON 字符串
    const jsonData = JSON.stringify(existingData);

    // 寫入更新後的數據到 JSON 文件
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('寫入文件時發生錯誤：', err);
        res.status(500).send('寫入文件時發生錯誤');
        return;
      }
      console.log('數據已成功寫入 JSON 文件。');
      res.send('註冊成功！');
    });
  });
});


let loggedIn = false;
app.post('/login', (req, res) => {
  const { user_account, password } = req.body;

  // 讀取現有數據
  const filePath = path.join(__dirname, 'account.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('讀取文件時發生錯誤：', err);
      res.status(500).send('讀取文件時發生錯誤');
      return;
    }

    // 解析現有數據為 JavaScript 對象
    const accounts = JSON.parse(data);

    // 驗證用戶名和密碼
    const account = accounts.find((acc) => acc.user_account === user_account && acc.password === password);
    if (account) {
      console.log('登錄成功');
      loggedIn = true;
      const indexPath = path.join(__dirname, 'namefortune.github.io', 'index.html');
      const indexGoodfriendPath = path.join(__dirname, 'namefortune.github.io', 'index-goodfriend.html');
      fs.readFile(indexPath, 'utf8', (err, indexContent) => {
        if (err) {
          console.error('讀取文件時發生錯誤：', err);
          res.status(500).send('讀取文件時發生錯誤');
          return;
        }
        const updatedContent = indexContent.replace(/(<p id="welcomeMessage">)([^<]*)(<\/p>)/, '<p id="welcomeMessage">' + account.name + '，歡迎!</p>');

        fs.readFile(indexGoodfriendPath, 'utf8', (err, indexGoodfriendContent) => {
          if (err) {
            console.error('讀取文件時發生錯誤：', err);
            res.status(500).send('讀取文件時發生錯誤');
            return;
          }

          const updatedGoodfriendContent = indexGoodfriendContent.replace(/(<p id="welcomeMessage">)([^<]*)(<\/p>)/, '<p id="welcomeMessage">' + account.name + '，歡迎!</p>');

          fs.writeFile(indexPath, updatedContent, (err) => {
            if (err) {
              console.error('寫入文件時發生錯誤：', err);
              res.status(500).send('寫入文件時發生錯誤');
              return;
            }

            fs.writeFile(indexGoodfriendPath, updatedGoodfriendContent, (err) => {
              if (err) {
                console.error('寫入文件時發生錯誤：', err);
                res.status(500).send('寫入文件時發生錯誤');
                return;
              }

              console.log('index.html 和 index-goodfriend.html 已更新');
              res.send({ name: account.name });
            });
          });
        });
      });
    } else {
      console.log('登錄失敗');
      res.status(401).send('用戶名或密碼錯誤');
    }
  });
});

// 處理登出請求
app.get('/logout', async (req, res) => {
  loggedIn = false;

  const indexPath = path.join(__dirname, 'namefortune.github.io', 'index.html');
  const indexGoodfriendPath = path.join(__dirname, 'namefortune.github.io', 'index-goodfriend.html');

  try {
    const indexContent = await fs.promises.readFile(indexPath, 'utf8');
    const updatedContent = indexContent.replace(/(<p id="welcomeMessage">)[^<]*(<\/p>)/, '$1浪人算命，讓你好命$2');
    await fs.promises.writeFile(indexPath, updatedContent);
    console.log('index.html 已更新');
  } catch (err) {
    console.error('處理 index.html 文件時發生錯誤：', err);
    res.status(500).send('處理 index.html 文件時發生錯誤');
    return;
  }

  try {
    const indexGoodfriendContent = await fs.promises.readFile(indexGoodfriendPath, 'utf8');
    const updatedGoodfriendContent = indexGoodfriendContent.replace(/(<p id="welcomeMessage">)[^<]*(<\/p>)/, '$1浪人算命，讓你好命$2');
    await fs.promises.writeFile(indexGoodfriendPath, updatedGoodfriendContent);
    console.log('index-goodfriend.html 已更新');
  } catch (err) {
    console.error('處理 index-goodfriend.html 文件時發生錯誤：', err);
    res.status(500).send('處理 index-goodfriend.html 文件時發生錯誤');
    return;
  }

  res.redirect('/');
  return;
});

app.get('/check-login', (req, res) => {
  res.send(loggedIn ? 'true' : 'false');
});

// 啟動伺服器
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
