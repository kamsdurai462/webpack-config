
import $ from './jquery.js';
global.$=window.jQuery=$;
import './app.forms.defaults.js';
import "./jquery.validate.js";
import "./bootstrap.bundle.js";
import "./intlTelInput.js";
import "./lazysizes.js";
import "./moment-with-locales.min.js";
import "./swiper-bundle.js";
import "./app.core.js";
import "./picker.js";
const elvenSheildReceipe ={
    leatherStrips: 2,
    ironIngot:4,
    refineMoonStone:4,
}
const elvenTwoReceipe={
    ...elvenSheildReceipe,
    onekilowater:4,
    onion:8,
}
console.log(elvenSheildReceipe);
console.log(elvenTwoReceipe);

$( "#other" ).on( "click", function() {
    $( ".target" ).trigger( "change" );
  } );