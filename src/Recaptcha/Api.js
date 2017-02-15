'use strict'

/**
 * adonis-recaptcha
 *
 * (c) Ron Masas <ronmasas@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const Request = require('request')

class RecaptchaApi {

  /**
   * @param   {Env}  env
   * @return  {void}
   *
   * @public
   */
  constructor(env) {
    this._host = 'https://www.google.com/recaptcha/api/siteverify'
    this._secret = env.get('RECAPTCHA_SECRET')
  }

  /**
   * Set recaptcha secret param.
   *
   * @param  {String} secret
   * @return {RecaptchaApi}
   *
   * @public
   */
  setSecret(secret) {
    this._secret = secret
    return this
  }

  /**
   * Verify recaptcha.
   *
   * @param  {String} response
   * @return {Promise}
   *
   * @public
   */
  verify(response) {
    return new Promise((resolve, reject) => {
      Request({
        url: this._host,
        method: 'POST',
        json: true,
        form: {
          secret: this._secret,
          response: response
        }
      }, function(error, respose, body) {
        console.log(body);
        if (error) {
          return reject(error)
        }
        resolve(body.success == true)
      })
    })
  }

}

module.exports = RecaptchaApi
