/**
 * DeepQA API
 */
import request from 'superagent';
import config from '../config/environment';

function getAnswer(question: string) {
  return "echo " + question;
}

export default { getAnswer: getAnswer }