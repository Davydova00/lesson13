// @ts-check
const { test, expect } = require('@playwright/test');
const { deleteFile } = require('../helperss/helper');
const {parse} = require ('csv-parse');
const readline = require('readline');
const fs = require('fs');
const path = require('path');


test.describe("Загрузка файла, проверка, что в файле есть ссылка", ()=>{

  test('Тест файла', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');
    const downloadPromise = page.waitForEvent('download');
    await page.getByText('BrowserStack - List of devices to test on.csv').click();

    const download = await downloadPromise;
    const path = `./downloads/${download.suggestedFilename()}`;

    await download.saveAs(path);
 await page.pause();

    const stream = fs.createReadStream(path);
    const reader = readline.createInterface({
       input: stream,
       crlfDelay: Infinity
 });

 reader.on('line', (line)=> {
  const columns = line.split(',');
  console.log(columns);
 })

 reader.on('close', ()=> {
 deleteFile(path);
 })

 function checkForSpecificString(filePath, specificLink) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return fileContent.includes(specificLink);
  } catch (error) {
    console.error('Ошибка:', error);
    return false;
  }
}

 const filePath = './downloads/BrowserStack - List of devices to test on.csv'; 
 const specificLink = 'https://browserstack.com/test-on-the-right-mobile-devices'; 

 if (checkForSpecificString(filePath, specificLink)) {
  console.log('Ссылка:' + " " + specificLink + " " + 'найдена в файле');
} else {
  console.log('Ссылка:'  + " " + specificLink + " " + 'не найдена в файле');
}
});



test('Загрузка файла', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/download');
  const downloadPromise = page.waitForEvent('download');
    await page.getByText('BrowserStack - List of devices to test on.csv').click();
    const download = await downloadPromise;
    const path = `./downloads/${download.suggestedFilename()}`;
  });


  test('Загрузка файла c папки downloads', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');
    await page.pause();
    await page.locator('//input[@id="file-upload"]').setInputFiles(path.join(__dirname, 'downloads','BrowserStack - List of devices to test on.csv'));
    await page.pause();
    });
  })