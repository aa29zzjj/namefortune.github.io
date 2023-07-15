const fs = require('fs');

function writeToJSONFile(user_name, user_account, pwd, email) {
  // 要寫入的 JSON 資料
  var data = {
    name: user_name,
    user_account: user_account,
    password: pwd,
    email: email
  };

  // 讀取已有的 JSON 檔案
  fs.readFile('account.json', 'utf8', (err, fileData) => {
    if (err) {
      console.error(err);
      return;
    }

    // 將已有的 JSON 字串轉換為物件
    var existingData = JSON.parse(fileData);

    // 將新資料合併到已有的資料中
    var mergedData = { ...existingData, ...data };

    // 將合併後的資料轉換為 JSON 字串
    var jsonData = JSON.stringify(mergedData);

    // 將更新後的 JSON 資料寫入檔案
    fs.writeFile('account.json', jsonData, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('資料已成功寫入檔案。');
    });
  });
}
