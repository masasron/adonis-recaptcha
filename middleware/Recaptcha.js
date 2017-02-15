'use strict'

/**
 * adonis-recaptcha
 *
 * (c) Ron Masas <ronmasas@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

class Recaptcha {

  /**
   * @param {RecaptchaApi} recaptchaApi
   * @return {void}
   *
   * @public
   */
  constructor(recaptchaApi) {
    this._recaptchaApi = recaptchaApi
  }

  /**
   *
   * Handle an incoming request.
   *
   * @param   {Request}     request
   * @param   {Response}    response
   * @param   {Function}    next
   * @return  {Response|Function}
   *
   * @public
   */
  * handle(request, response, next) {
    const input = request.only('g-recaptcha-response')
    if (!input['g-recaptcha-response']) {
      return this._handleErrorResponse(request, response)
    }
    const success = yield this._recaptchaApi.verify(input['g-recaptcha-response'])
    if (success !== true) {
      return this._handleErrorResponse(request, response)
    }
    yield next
  }

  /**
   *
   * Handle error response
   *
   * @param   {Request}     request
   * @param   {Response}    response
   * @return  {Response}
   *
   * @private
   */
  _handleErrorResponse(request, response) {
    const error_message = 'Invalid captcha.'
    response.status(401)
    if (request.is(['json'])) {
      return response.json({
        error_message: error_message
      });
    }
    return response.send(error_message)
  }

}

module.exports = Recaptcha
