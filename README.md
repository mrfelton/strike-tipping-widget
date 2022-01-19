# Strike Tipping Widget

> Simple proof of concept that demonstrates how a no-code Strike tipping widget could be built.

- [Usage](#usage)
- [Installation](#installation)
- [Build](#build)
- [Test](#test)
- [Development](#development)
- [Suggested Improvements](#suggested-improvements)


**WARNING: This is a proof of concept and is designed to be embedded directly in client side code. Please ensure that the
Strike API key you use allows for limited access only.**

**REQUIRED API SCOPES:**
- `partner.invoice.quote.generate`
- `partner.invoice.read`
- `partner.invoice.create-for-receiver`
- `partner.account.profile.read`

## Usage

1. Load the javascript into you html page
2. Create a div with the id `strke-widget`
3. set `data-apikey` to your Strike API key
3. set `data-handle` to the strike username to tip
3. set `data-amount` to the amount to tip

```html
<script type="text/javascript" src="/path/to/js/bundle.js" defer></script>

<div class="strike-widget"
  data-apikey="[YOUR LIMITED SCOPE API KEY HERE]"
  data-handle="[STRIKE USERNAME TO TIP]"
  data-amount="[AMOUNT TO TIP]"
  data-theme="default"/>
```

## Installation

Install dependencies:

```sh
npm install
```

## Build

Build the widget:

```sh
npm run build:widget
```

This will create javascript and css bundles and copy them to the `widget` directory.

## Test

After building, you can test the build by serving the js and css bundles and then opening the example app:

```sh
npx serve widget
```

Then in a new tab, open the example page in your browser:
```sh
open example/index.html
```

## Development

The code is essentially a very basic react app which you can start like so:

```sh
npm start
```

This will start a local server on port 3000 which will run the app in development mode. Changes made to files in the `src` directory will be reflected in the browser in realtime.


## Suggested Improvements

- Where to start?!...
- Make it look better
- Add support for themeing
- Reduce the final javascript bundle size
- Add more configuration options
- Add support for Strike sandbox environments
- Provide a hosted version
- Wrap it up in a wordpress plugin
- ...etc
