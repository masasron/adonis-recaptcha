'use strict'

/**
 * adonis-recaptcha
 *
 * (c) Ron Masas <ronmasas@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Client {

  /**
   * @param   {Env}  env
   * @return  {void}
   *
   * @public
   */
  constructor(env) {
    this._recaptcha_site_key = env.get('RECAPTCHA_SITE_KEY')
  }

  get script() {
    return '<script src="https://www.google.com/recaptcha/api.js" async defer></script>'
  }

  get field() {
    return `<div class="g-recaptcha" data-sitekey="${this._recaptcha_site_key}"></div>`
  }

}

module.exports = Client
