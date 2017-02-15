# Adonis Recaptcha

### Installation

To get the latest version of Adonis Recaptcha, simply run

```
npm install adonis-recaptcha --save
```

Once Adonis Recaptcha is installed, you need to register the service provider.
Open up bootstrap/app.js and add the following to the providers key.

```js
// bootstrap/app.js
const providers = [
  ...,
  'adonis-recaptcha/providers/RecaptchaProvider',
]
```

You can register the Recaptcha facade in the aliases key of your bootstrap/app.js file if you like.

```js
// bootstrap/app.js
const aliases = {
  ...,
  Recaptcha: 'Adonis/Addons/Recaptcha'
}
```

Enable the recaptcha middleware inside `app/Http/kernel.js` file.

```js
// app/Http/kernel.js

const namedMiddleware = {
  ...,
  recaptcha: 'Adonis/Middleware/Recaptcha'
}
```

Add your site key and secret to your .env file using the following keys:

```
RECAPTCHA_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
RECAPTCHA_SITE_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

(keys can be generated here https://www.google.com/recaptcha/admin)

### Usage

#### Middleware

Use the recaptcha middleware to require catpcha solution for a given route.

```js
Route.post('register','GuestController.register').middleware('recaptcha')
```

#### Display Recaptcha Widget

```html
{% set recaptcha = use('Recaptcha') %}
<html>
<head>
  <!-- Generate script tag. -->
  {{ recaptcha.script | safe }}
</head>
<body>
  <!-- ... -->
  <form>
    <!-- Generate recaptcha field -->
    {{ recaptcha.field | safe }}
    <button>Submit</button>
  </form>
  <!-- ... -->
</body>
</html>
```
