/**
 * DeepQA API
 */
import request = require('superagent');

export class DavidAPI {

    constructor(private baseUrl: string, private username: string, private password: string) {

    }

    public getAnswer(question: string) {
        const apiEndpoint: string = `${this.baseUrl}/api/v1/question`;
        return new Promise((resolve, reject) => {
            request.post(apiEndpoint)
                .set('Content-Type', 'application/json')
                .auth(this.username, this.password)
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
}

export default {};