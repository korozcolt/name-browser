import {
  Builder,
  By,
  Key,
  ThenableWebDriver,
  WebDriver,
} from 'selenium-webdriver';

import { Injectable } from '@nestjs/common';
import { Options } from 'selenium-webdriver/firefox';

@Injectable()
export class ServidorNombresService {
  questions = [
    { question: '¿ Cuanto es 4 + 3 ?', answer: '7' },
    { question: '¿ Cuanto es 6 + 2 ?', answer: '8' },
    { question: '¿ Cuanto es 5 + 3 ?', answer: '8' },
    {
      question: '¿ Cual es la Capital de Colombia (sin tilde)?',
      answer: 'bogota',
    },
    { question: '¿ Cual es la Capital del Vallle del Cauca?', answer: 'cali' },
    { question: '¿ Cuanto es 3 - 2 ?', answer: '1' },
    { question: '¿ Cuanto es 9 - 2 ?', answer: '7' },
    { question: '¿ Cual es la Capital del Atlantico?', answer: 'barranquilla' },
    {
      question: '¿ Cual es la Capital de Antioquia (sin tilde)?',
      answer: 'medellin',
    },
  ];

  async getName(dni: number): Promise<string> {
    const options = new Options().headless();
    const driver: WebDriver = await new Builder()
      .forBrowser('firefox')
      .setFirefoxOptions(options)
      .build();

    try {
      await driver.get(process.env.API_NAMES);

      const tipoIds = await driver.findElement(By.id('ddlTipoID'));
      await tipoIds.sendKeys('Cédula de ciudadanía', Key.RETURN);

      const numId = await driver.findElement(By.id('txtNumID'));
      await numId.sendKeys(dni);

      let found = false;
      let pregunta;
      let validate;

      while (!found) {
        const labelPregunta = await driver.findElement(By.id('lblPregunta'));
        pregunta = await labelPregunta.getAttribute('innerHTML');
        validate = this.buscarDicc(this.questions, 'question', pregunta);
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

      const consultarButton = await driver.findElement(By.id('btnConsultar'));
      await consultarButton.click();

      await driver.sleep(1000);

      const consulta = await driver.findElement(
        By.className('datosConsultado'),
      );
      const data = await consulta.getAttribute('innerHTML');
      const name = data
        .match(/<span>(.+?)<\/span>/g)
        .join(' ')
        .replace(/<\/?span>/g, '');

      return name;
    } finally {
      await driver.quit();
    }
  }

  buscarDicc<T>(it: T[], clave: keyof T, valor: T[keyof T]): T | null {
    for (const item of it) {
      if (item[clave] === valor) {
        return item;
      }
    }
    return null;
  }
}
