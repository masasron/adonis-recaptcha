'use strict'

/**
 * adonis-recaptcha
 *
 * (c) Ron Masas <ronmasas@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const ServiceProvider = require('adonis-fold').ServiceProvider

const Recaptcha = require('../src/Recaptcha')
const RecaptchaMiddleware = require('../middleware/Recaptcha')

class RecaptchaProvider extends ServiceProvider {

  * register() {
    this.app.singleton('Adonis/Addons/Recaptcha', function(app) {
      return new Recaptcha.Client(app.use('Env'))
    })
    this.app.singleton('Adonis/Addons/RecaptchaApi', function(app) {
      return new Recaptcha.Api(app.use('Env'))
    })
    this.app.bind('Adonis/Middleware/Recaptcha', function(app) {
      return new RecaptchaMiddleware(app.use('Adonis/Addons/RecaptchaApi'))
    })
  }

}

module.exports = RecaptchaProvider
