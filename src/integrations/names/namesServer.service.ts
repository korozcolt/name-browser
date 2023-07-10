import { Builder, By, Key, WebDriver } from 'selenium-webdriver';

import { Injectable } from '@nestjs/common';
import { Options } from 'selenium-webdriver/firefox';
import { questions } from '../../utils/constants';

@Injectable()
export class NamesServerService {
  async getName(dni: number): Promise<string> {
    const options = new Options().headless();
    const driver: WebDriver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();

    try {
      await driver.get(process.env.API_NAMES);

      const typeIds = await driver.findElement(By.id('ddlTipoID'));
      await typeIds.sendKeys('Cédula de ciudadanía', Key.RETURN);

      const numId = await driver.findElement(By.id('txtNumID'));
      await numId.sendKeys(dni);

      let found = false;
      let pregunta;
      let validate;

      while (!found) {
        const labelPregunta = await driver.findElement(By.id('lblPregunta'));
        pregunta = labelPregunta.getAttribute('innerHTML');
        validate = this.searchDictionary(questions, 'question', pregunta);
        if (validate) {
          found = true;
        } else {
          found = false;
          const refreshButton = await driver.findElement(By.id('ImageButton1'));
          await refreshButton.click();
          await driver.sleep(1000);
        }
      }

      const respuestaPregunta = await driver.findElement(
        By.id('txtRespuestaPregunta'),
      );
      await respuestaPregunta.sendKeys(validate.answer);

      const consultButton = await driver.findElement(By.id('btnConsultar'));
      await consultButton.click();

      await driver.sleep(1000);

      const consult = await driver.findElement(By.className('datosConsultado'));
      const data = consult.getAttribute('innerHTML');
      return data
        .match(/<span>(.+?)<\/span>/g)
        .join(' ')
        .replace(/<\/?span>/g, '');
    } finally {
      await driver.quit();
    }
  }

  searchDictionary<T>(it: T[], clave: keyof T, valor: T[keyof T]): T | null {
    for (const item of it) {
      if (item[clave] === valor) {
        return item;
      }
    }
    return null;
  }
}
