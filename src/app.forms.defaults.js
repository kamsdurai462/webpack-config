/**
 * app.forms.default.js v###version###
 */
import $ from './jquery.js';
window.$=$;
import './select2.js';
// ensure that this script is executed only once!
/**var $body = $('body');
if ($body.data('app.forms.default') === 'loaded') {
    return true;
}

$body.data('app.forms.default', 'loaded');


 * Set default settings for jquery validate plugin
 * -------------------------------------------------------------------------------
 */
var svgAlertLabel = '<svg xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#alert-icon"/></svg>';
// var alertIcon = '<div class="alert-icon"><svg xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#alert-icon"/></svg></div>';
var alertIcon = '<div class="alert-icon"><svg xmlns:xlink="http://www.w3.org/1999/xlink"><use xlink:href="#error-icon-red"/></svg></div>';

/**
 * Set the defaults for jQuery Validate
 */
function setValidationDefaults() {
    if (!$.validator) {
        return false;
    }

    $.validator.setDefaults({
        errorClass: 'has-error',
        errorElement: 'div',
        highlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').addClass('has-error-fields');
            $(element).addClass(errorClass).removeClass(validClass);
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).closest('.form-group').removeClass('has-error-fields');
            $(element).removeClass(errorClass).addClass(validClass);
        },
        errorPlacement: function (error, element) {
            error.addClass('alert-label').append(svgAlertLabel);
            error.insertBefore(element);

            //$(alertIcon).insertBefore(error); //remove error icons not required as per futurenow design
        },
        debug: false
    });

    /**
     * Additional Validation Rules (extracted from additional-methods.js)
     */
    $.validator.addMethod('internetUserNameValidation', function (value, element) {
        return this.optional(element) || /^[a-z]+[0-9a-z]*$/g.test(value);
    }, 'Capital letters, space and special character are not allowed');
    /**
     * Additional Validation Rules (extracted from additional-methods.js)
     */
    $.validator.addMethod('alphanumeric', function (value, element) {
        return this.optional(element) || /^\w+$/i.test(value);
    }, 'Letters, numbers, and underscores only please');

    // $.validator.addMethod('etiname', function (value, element) {
    //   return this.optional(element) || /^[a-zA-Z\u0600-\u06FF\s]{1,248}\$/i.test(value);
    // }, 'Letters latin and arabic, numbers, and spaces only please');

    // accept only letters and digits, spaces, no underscore
    $.validator.addMethod('realalphanumeric', function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s0-9\-]+$/i.test(value);
    }, 'Letters, numbers, and spaces only please');

    // accept only letters and digits, spaces, no underscore
    $.validator.addMethod('realalphanumericnospace', function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9]+$/i.test(value);
    }, 'Letters and numbers only please');

    // accept only letters and spaces only
    $.validator.addMethod('realalphabetic', function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s]+$/i.test(value);
    }, 'Letters, and spaces only please');

    // accept only letters  spaces number and ?-.@,""() only
    $.validator.addMethod('richtext', function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\s\?@,!\.]+$/i.test(value);
    }, 'Please do not use special characters in your answers');

    // accept only letters, spaces, no underscore
    $.validator.addMethod('realalphabeticlatinarabic', function (value, element) {
        return this.optional(element) || /^[a-zA-Z\u0600-\u0660-\u0669\u06ff\u0750-\u077f\ufb50-\ufbc1\ufbd3-\ufd3f\ufd50-\ufd8f\ufd92-\ufdc7\ufe70-\ufefc\uFDF0-\uFDFD\s]+$/i.test(value);
    }, 'Letters, and spaces only please');

    // accept only letters, spaces, no underscore arabic no special letter
    $.validator.addMethod('simplealphabeticlatinarabic', function (value, element) {
        return this.optional(element) || /^[a-zA-Z\s\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]+$/i.test(value);
    }, 'Letters only please');

    // mobile number pattern
    $.validator.addMethod('mobile', function (value, element) {
        return this.optional(element) || /^(050|054|055|056|052)/i.test(value);
    }, 'Invalid format.');

    // mobile number pattern
    $.validator.addMethod('internationalmobile', function (value, element) {
        return this.optional(element) || /^(050|054|055|056|052)/i.test(value);
    }, 'Invalid format.');

    $.validator.addMethod('integer', function (value, element) {
        return this.optional(element) || /^-?\d+$/.test(value);
    }, 'A positive or negative non-decimal number please');

    $.validator.addMethod('lettersonly', function (value, element) {
        return this.optional(element) || /^[a-z]+$/i.test(value);
    }, 'Letters only please');

    $.validator.addMethod('letterswithbasicpunc', function (value, element) {
        return this.optional(element) || /^[a-z\-.,()'"\s]+$/i.test(value);
    }, 'Letters or punctuation only please');

    $.validator.addMethod('documentNumber', function (value, element) {
        return this.optional(element) || /^[^\/|\-][A-Za-z0-9/\-\s]+$/i.test(value);
    }, 'Please enter valid document number');

    $.validator.addMethod('passwordf', function (value, element) {
        return this.optional(element) || /^(?=.*[A-Za-z]{2})(?=.*\d{2})[A-Za-z\d]{8,}$/i.test(value);
    }, 'At least 2 numbers,  2 alphabets & no special characters');

    $.validator.addMethod('passwordfa', function (value, element) {
        return this.optional(element) || /^(?=.*[A-Za-z]{1})(?=.*\d{1})[A-Za-z\d]{8,}$/i.test(value);
    }, 'At least 1 numbers,  1 alphabets & no special characters');

    $.validator.addMethod('notEqualTo', function (value, element, param) {
        return this.optional(element) || !$.validator.methods.equalTo.call(this, value, element, param);
    }, 'Please enter a different value, values must not be the same.');

    $.validator.addMethod('internetUserId', function (value, element) {
        return this.optional(element) || /^[a-z]([0-9]|[a-z])+$/g.test(value);
    }, 'Not starts with a number and only contain letters or numbers');

    $.validator.addMethod('elifeUserId', function (value, element) {
        return this.optional(element) || /^[a-zA-Z0-9\@.-]+$/i.test(value);
    }, 'Letters, spaces and . - @ only please');

    // select2 require validaiton
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg !== value;
    }, "Value must not equal arg.");

    /**
     * Return true if the field value matches the given format RegExp
     *
     * @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
     * @result true
     *
     * @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
     * @result false
     *
     * @name $.validator.methods.pattern
     * @type Boolean
     * @cat Plugins/Validate/Methods
     */
    $.validator.addMethod('pattern', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        if (typeof param === 'string') {
            param = new RegExp('^(?:' + param + ')$');
        }
        return param.test(value);
    }, 'Invalid format.');

    $.validator.addMethod('MobilePattern', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        if (typeof param === 'string') {
            param = new RegExp('^(?:' + param + ')$');
        }
        return param.test(value);
    }, 'your customized message');
    $.validator.addMethod('mobPattern', function (value, element, param) {
        if (this.optional(element)) {
            return true;
        }
        if (typeof param === 'string') {
            param = new RegExp('^(?:' + param + ')$');
        }
        return param.test(value);
    }, 'Format 05X-XXXX-XXX.');

    /**
     * Return true, if the value is a valid date, also making this formal check dd/mm/yyyy.
     *
     * @example $.validator.methods.date("01/01/1900")
     * @result true
     *
     * @example $.validator.methods.date("01/13/1990")
     * @result false
     *
     * @example $.validator.methods.date("01.01.1900")
     * @result false
     *
     * @example <input name="pippo" class="{dateITA:true}" />
     * @desc Declares an optional input element whose value must be a valid date.
     *
     * @name $.validator.methods.dateITA
     * @type Boolean
     * @cat Plugins/Validate/Methods
     */
    $.validator.addMethod('dateITA', function (value, element) {
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        var adata;
        var gg;
        var mm;
        var aaaa;
        var xdata;
        if (re.test(value)) {
            adata = value.split('/');
            gg = parseInt(adata[0], 10);
            mm = parseInt(adata[1], 10);
            aaaa = parseInt(adata[2], 10);
            xdata = new Date(Date.UTC(aaaa, mm - 1, gg, 12, 0, 0, 0));
            if ((xdata.getUTCFullYear() === aaaa) && (xdata.getUTCMonth() === mm - 1) && (xdata.getUTCDate() === gg)) {
                check = true;
            } else {
                check = false;
            }
        } else {
            check = false;
        }
        return this.optional(element) || check;
    }, $.validator.messages.date);

    /**
     * Custom password rule that respect Etisalat rules
     */
    $.validator.addMethod('etipassword', function (value, element) {
        return this.optional(element) || /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9@._-]{5,248})/.test(value);
    }, 'Password not valid');

    /**
     * Custom password rule that respect Etisalat rules except captial letter optional
     */
    $.validator.addMethod('regpassword', function (value, element) {
        return this.optional(element) || /^(?=.*[0-9])(?=.*[a-z])[a-zA-Z0-9_@\-]{5,248}$/.test(value);
    }, 'Password invalid');

    /**
     * Custom username/userid rule that respect Etisalat rules
     */
    $.validator.addMethod('userid', function (value, element) {
        return this.optional(element) || /^(?=.*[0-9a-zA-Z])([a-zA-Z0-9@._-]{5,100})$/.test(value);
    }, 'Username not valid');

    /**
     * Mutual Exclusive fields validation
     */
    $.validator.addMethod('mutualex', function (value, element, param) {
        // Current value, Validated element, Parameters

        var target = $(param);
        var source = $(element);

        if (source.val().length === 0 && target.val().length === 0) {
            return false;
        }

        if (source.val().length > 0 && target.val().length > 0) {
            return false;
        }

        return true;
    }, 'These 2 fields cannot be filled simultaneausly');

    /**
     * Custom email validation
     */
    $.validator.addMethod('email2', function (value, element) {
        /* eslint-disable no-control-regex, max-len */
        return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
    }, 'Please enter a valid email address.');

    $.validator.addMethod('email', function (value, element) {
        /* eslint-disable no-control-regex, max-len */
        return this.optional(element) || /^\w+([-+.'][^\s]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i.test(value);
    }, 'Please enter a valid email address.');

    /**
     * Custom url validation
     */
    $.validator.addMethod('urlvalid', function (value, element) {
        /* eslint-disable no-control-regex, max-len */
        return this.optional(element) || /^[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi.test(value);
    }, 'Please enter a valid URL.');

    //

    // if the page is set for arabic language, then set the default messages for arabic
    if ($('html').attr('lang') === 'ar') {
        /*
         * Translated default messages for the jQuery validation plugin.
         * Locale: AR (Arabic; العربية)
         */
        $.extend($.validator.messages, {
            required: 'هذا الحقل إلزامي',
            remote: 'يرجى تصحيح هذا الحقل للمتابعة',
            email: 'رجاء إدخال عنوان بريد إلكتروني صحيح',
            email2: 'رجاء إدخال عنوان بريد إلكتروني صحيح',
            url: 'رجاء إدخال عنوان موقع إلكتروني صحيح',
            date: 'رجاء إدخال تاريخ صحيح',
            dateISO: 'رجاء إدخال تاريخ صحيح (ISO)',
            number: 'رجاء إدخال عدد بطريقة صحيحة',
            digits: 'رجاء إدخال أرقام فقط',
            creditcard: 'رجاء إدخال رقم بطاقة ائتمان صحيح',
            equalTo: 'رجاء إدخال نفس القيمة',
            realalphabeticlatinarabic:   ' الرجاء ادخال احرف و مسافة فقط ',
            alphanumeric: 'الحروف والأرقام والشرط فقط من فضلك',
            extension: 'رجاء إدخال ملف بامتداد موافق عليه',
            maxlength: $.validator.format('الحد الأقصى لعدد الحروف هو {0}'),
            minlength: $.validator.format('الحد الأدنى لعدد الحروف هو {0}'),
            rangelength: $.validator.format('عدد الحروف يجب أن يكون بين {0} و {1}'),
            range: $.validator.format('رجاء إدخال عدد قيمته بين {0} و {1}'),
            max: $.validator.format('رجاء إدخال عدد أقل من أو يساوي (0}'),
            min: $.validator.format('رجاء إدخال عدد أكبر من أو يساوي (0}')
        });
    }
}

setValidationDefaults();

function initSelect2AndFixFormFloatingLabels() {
    /**
     * Default Select2 settings and initialization
     */
    // initialize select 2
    var select2input = $('.floating-label-select select');
    select2input.each(function () {

        var $select = $(this);
        if ($select.hasClass('searchinSelect')) {
            $select.select2({
                width: '100%',
                dropdownParent: $select.parent('.floating-label-select')
            }).on('select2:opening', function () {
                $(this).closest('.floating-label-select').find('label').addClass('floating-label');
            }).on('select2:selecting', function () {
                $(this).closest('.floating-label-select').addClass('floating-label-selected');
            }).on('select2:close', function () {
                if (!$(this).closest('.floating-label-select').hasClass('floating-label-selected')) {
                    $(this).closest('.floating-label-select').find('label').removeClass('floating-label');
                }
            });
        } else {
            $select.select2({
                width: '100%',
                dropdownParent: $select.parent('.floating-label-select'),
                minimumResultsForSearch: Infinity
            }).on('select2:opening', function () {
                $(this).closest('.floating-label-select').find('label').addClass('floating-label');
            }).on('select2:selecting', function () {
                $(this).closest('.floating-label-select').addClass('floating-label-selected');
            }).on('select2:close', function () {
                if (!$(this).closest('.floating-label-select').hasClass('floating-label-selected')) {
                    $(this).closest('.floating-label-select').find('label').removeClass('floating-label');
                }
            });
        }

        // if a select has no selected option, then reset it
        if ($('option', $select).filter(':selected').text().trim() === '') {
            $select.closest('.floating-label-select').find('label').removeClass('floating-label');
        } else {
            // if there is an option already selected from start, then fix the label
            $select.addClass('selected').closest('.floating-label-select').find('label').addClass('floating-label');
        }

    });

    // control empty :not(:required) inputs
    var $inputNotRequired = $('input:not(:required)');
    $inputNotRequired.each(function () {
        if ($(this).val()) {
            $(this).siblings('label').addClass('floating-label');
        }
    });

    // control empty :not(:required) inputs on focus/blur
    $inputNotRequired.focus(function () {
        $(this).siblings('label').removeClass('floating-label');
    }).blur(function () {
        if ($(this).val()) {
            $(this).siblings('label').addClass('floating-label');
        }
    });
}

initSelect2AndFixFormFloatingLabels();

var OWCS = {}
 || OWCS;
OWCS.initSelect2AndFixFormFloatingLabels = initSelect2AndFixFormFloatingLabels;

// disable paste on password and masked inputs
var $passwords = $('input[type="password"], input.input-masked[type="text"]');
$passwords.on('paste', function () {
    return false;
});

// caps lock warning
var CapsLock = {
    $el: $passwords,
    isShift: false,
    isCaps: false,
    charLen: parseInt(0),
    errors: {},
    init: function () {
        this.capsEvents();
    },
    capsEvents: function () {

        this.$el.on('keypress', function (e) {
            var s = String.fromCharCode(e.which);
            var kc = e.keyCode;
            var errors;
            var isUp = !!(kc >= 65 && kc <= 90);
            var isLo = !!(kc >= 97 && kc <= 122);
            var isMac = /Mac/.test(navigator.platform);

            if ($(this).parent().find('caps-warn')) {
                $(this).parent().find('.caps-warn').remove();
            }

            if (isUp && !e.shiftKey || isLo && e.shiftKey) {
                $(this).addClass('caps-on');
                $(this).parent('.form-group').prepend('<div class="caps-warn">CAPS ON</div>');
            } else {
                $(this).removeClass('caps-on');
                $(this).parent().find('.caps-warn').remove();
            }

        });

        this.$el.blur(function (e) {
            $(this).parent().find('.caps-warn').remove();
        });

    }
};
CapsLock.init();

/**
 * activate forms
 */
$(document).on('click', '.step-node', function () {
    var countNode = $(this).prevAll('.step-node').length;
    $('.config-accordion-wrapper').eq(countNode).find('.config-accordion').trigger('click');

})
$(document).ready(function () {

    function initSelect2AndFixFormFloatingLabels() {
        /**
         * Default Select2 settings and initialization
         */
        // initialize select 2
        var select2input = $('.floating-label-select select');
        select2input.each(function () {

            var $select = $(this);

            if ($select.hasClass('searchinSelect')) {
                $select.select2({
                    width: '100%',
                    dropdownParent: $select.parent('.floating-label-select')
                }).on('select2:opening', function () {
                    $(this).closest('.floating-label-select').find('label').addClass('floating-label');
                }).on('select2:selecting', function () {
                    $(this).closest('.floating-label-select').addClass('floating-label-selected');
                }).on('select2:close', function () {
                    if (!$(this).closest('.floating-label-select').hasClass('floating-label-selected')) {
                        $(this).closest('.floating-label-select').find('label').removeClass('floating-label');
                    }
                });
            } else {
                $select.select2({
                    width: '100%',
                    dropdownParent: $select.parent('.floating-label-select'),
                    minimumResultsForSearch: Infinity
                }).on('select2:opening', function () {
                    $(this).closest('.floating-label-select').find('label').addClass('floating-label');
                }).on('select2:selecting', function () {
                    $(this).closest('.floating-label-select').addClass('floating-label-selected');
                }).on('select2:close', function () {
                    if (!$(this).closest('.floating-label-select').hasClass('floating-label-selected')) {
                        $(this).closest('.floating-label-select').find('label').removeClass('floating-label');
                    }
                });
            }

            // if a select has no selected option, then reset it
            if ($('option', $select).filter(':selected').text().trim() === '') {
                $select.closest('.floating-label-select').find('label').removeClass('floating-label');
            } else {
                // if there is an option already selected from start, then fix the label
                $select.addClass('selected').closest('.floating-label-select').find('label').addClass('floating-label');
            }

        });

        // control empty :not(:required) inputs
        var $inputNotRequired = $('input:not(:required)');
        $inputNotRequired.each(function () {
            if ($(this).val()) {
                $(this).siblings('label').addClass('floating-label');
            }
        });

        // control empty :not(:required) inputs on focus/blur
        $inputNotRequired.focus(function () {
            $(this).siblings('label').removeClass('floating-label');
        }).blur(function () {
            if ($(this).val()) {
                $(this).siblings('label').addClass('floating-label');
            }
        });
    }

    initSelect2AndFixFormFloatingLabels();
    $('form:not(#search-form):not(#store-locator-form)').attr('data-active', 'true');

    $('.onlyletters').keypress(function (event) {
        var inputValue = event.which;
        var inputValueForArabic = event.key;
        var isArabic = /^[\u0600-\u06ff\u0750-\u077f\ufb50-\ufbc1\ufbd3-\ufd3f\ufd50-\ufd8f\ufd92-\ufdc7\ufe70-\ufefc\uFDF0-\uFDFD\s]/;

        // allow letters, whitespaces and arabic characters only.
        if (!(inputValue >= 65 && inputValue <= 122) && (inputValue !== 32 && inputValue !== 0) && !(isArabic.test(inputValueForArabic))) {
            event.preventDefault();
        }
    });

    $('.onlydigits').keypress(function (event) {
        var keys = ['+', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        if (event.keyCode !== 37 && event.keyCode !== 39 && event.keyCode !== 8 && event.keyCode !== 9 && event.keyCode !== 16) {
            return keys.indexOf(event.key) > -1;
        } else {
            return true;
        }
    });

    // masked input
    $('.masked-input').each(function () {
        var $maskedGroup = $(this);
        var inputPrefix = $maskedGroup.find('input.input-masked[type="text"]');
        var inputMasked = $maskedGroup.find('input.input-masked[type="password"]');
        var inputHidden = $maskedGroup.find('input:not(.input-masked)');
        var inputPrefixVal;
        var inputMaskedVal;
        var maskLength = 3;

        // calc the width of password field
        inputMasked.css('width', $maskedGroup.width() - inputPrefix.outerWidth() - 8);

        inputMasked.on('click', function () {
            if ($(this).val() === '') {
                inputPrefix.focus();
            }
        });

        $maskedGroup.find('input.input-masked[type="text"],input.input-masked[type="password"]').on('input', function () {
            inputPrefixVal = inputPrefix.val();
            inputMaskedVal = inputMasked.val();

            if (inputPrefixVal.length === maskLength) {
                if ($(this).attr('type') === 'text') {
                    inputMasked.focus();
                } else if (inputMaskedVal.length === 0) {
                    inputPrefix.focus();
                }
            }

            var mask = inputPrefixVal + inputMaskedVal;
            inputHidden.val(mask);
        });
    });

});
