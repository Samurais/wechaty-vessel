/**
 * DeepQA API
 */
import request = require('superagent');
import config from '../config/environment';

function getAnswer(question: string) {
  return new Promise(function (resolve, reject) {
    request.post(`${config.davidapi.baseUrl}/api/v1/question`)
      .set('Content-Type', 'application/json')
      .auth(config.davidapi.username, config.davidapi.password)
      .set('Accept', 'application/json')
      .send({ "message": question })
      .end(function (err, res) {
        if (err) {
          reject(err);
        } else if (res.body && res.body.rc == 0) {
          resolve(res.body.msg);
        } else {
          reject(res.body);
        }
      });
  });
}

export default { getAnswer: getAnswer }