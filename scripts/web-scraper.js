const puppeteer = require("puppeteer");
const fs = require('fs');
(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    timeout: 100000,
    devtools: false
  });
  const page = await browser.newPage();

  await page.goto("http://www.ace-es.org.br/scripts/croquiteca.asp", {
    waitUntil: "domcontentloaded",
  });
  await page.setViewport({ width: 1080, height: 1024 });

  // Get page data
  const list = await page.evaluate(() => {
    const rowsEl = "body > table:nth-child(3) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > table > tbody > tr > td > form > table:nth-child(7) > tbody > tr";
    const rows = document.querySelectorAll(rowsEl);
    let routes = [];
    for (let index = 1; index < rows.length; index++) {
      const row = rows[index];
      const columnsEl = row.querySelectorAll('td.bordainferiorpretafina');
      const column = {
        city: columnsEl[0].innerText,
        rock: columnsEl[1].innerText,
        route: columnsEl[2].innerText,
        url: columnsEl[2].querySelector('a').href,
      }
      routes.push(column)
    }
    return routes;
  });
  for (const element of list) {
    try {
      console.log('URL: ', element.url);
      console.log('-------------');

      await page.goto(element.url, {
        waitUntil: "networkidle2",
        timeout: 100000,
      });
      const selectorsDelay = 1000;
      const graduationSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(2) > td:nth-child(2)"
      const sizeSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(3) > td:nth-child(2)";
      const pitchNumbersSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(4) > td:nth-child(2)";
      const requiredEquipmentsSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(5) > td:nth-child(2)";
      const dateOfConquerSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(6) > td:nth-child(2)";
      const conquerorsSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(7) > td:nth-child(2)";
      const descriptionSelector = "body > table:nth-child(3) > tbody > tr > td > table:nth-child(1) > tbody > tr > td > table > tbody > tr:nth-child(1) > td > form:nth-child(4) > table:nth-child(6) > tbody > tr > td > table > tbody > tr:nth-child(8) > td:nth-child(2)";

      await page.waitForSelector(graduationSelector, { timeout: selectorsDelay });
      await page.waitForSelector(sizeSelector, { timeout: selectorsDelay });
      await page.waitForSelector(pitchNumbersSelector, { timeout: selectorsDelay });
      await page.waitForSelector(requiredEquipmentsSelector, { timeout: selectorsDelay });
      await page.waitForSelector(dateOfConquerSelector, { timeout: selectorsDelay });
      await page.waitForSelector(conquerorsSelector, { timeout: selectorsDelay });
      await page.waitForSelector(descriptionSelector, { timeout: selectorsDelay });

      element.graduation = await page.$eval(graduationSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
      element.size = await page.$eval(sizeSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
      element.pitchNumbers = await page.$eval(pitchNumbersSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
      element.requiredEquipments = await page.$eval(requiredEquipmentsSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
      element.dateOfConquer = await page.$eval(dateOfConquerSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
      element.conquerors = await page.$eval(conquerorsSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
      element.description = await page.$eval(descriptionSelector, el => el.innerText, { timeout: selectorsDelay }) || 'Não disponível';
    } catch (error) {
      console.error(`Failed to load ${element.url}: ${error.message}`);
    }
  }
  
    fs.writeFile("./croquiteca.json", JSON.stringify(list), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
    });
  // Close the browser
  await browser.close();
})();   