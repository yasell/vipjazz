jQuery(document).ready(function($) {;
    (function(element) {
        var $element = $(element);
        $('.ca-tooltip', $element).tooltip();
        var $form = $('#el_ctajax_form', $element);
        var $ajax_url = 'zvonite575a.html?contact_ajax=2786441473773288&amp;ctajax_modid=106'
        var $name = $('#cainput_name', $element);
        var $email = $('#cainput_email', $element);
        var $subject = $('#cainput_subject', $element);
        var $message = $('#cainput_message', $element);
        var $captcha = $('#cainput_captcha', $element);
        var $recaptcha = $('#dynamic_recaptcha_1', $element);
        var $smail_copy = $('#contact_email_copy', $element);

        var $ca_submit = $('#cainput_submit', $element);
        var $image_load = $('.el-ctajax-loadding', $element);
        var $notice_return = $('.el-ctajax-return', $element);
        var $return_error = $('.return-error', $element);
        var $return_success = $('.return-success', $element);


        function validateInput(input, type) {
            var validationResult = validation(input, type);
            checkFormValidationState();
            return validationResult.valid;
        }

        function validation(input, type) {
            var result = new Object();
            result.valid = true;
            result.mes = "The field is valid";
            var value = $(input).val();
            switch (type) {
                case "name":
                case "subject":
                    if (value.length == '') {
                        result.valid = false;
                        result.mes = "Please enter a valid!";
                    }

                    saveValidationState(input, result.valid);
                    showValidationMessage(input, result);
                    break;
                case "message":
                    if (value.length == '' || value.length <= 5) {
                        result.valid = false;
                        result.mes = "Please enter a valid!";
                    }

                    saveValidationState(input, result.valid);
                    showValidationMessage(input, result);
                    break;
                case "email":
                    var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
                    if (!re.test(value)) {
                        result.valid = false;
                        result.mes = "Please enter a valid email!";
                    }
                    saveValidationState(input, result.valid);
                    showValidationMessage(input, result);
                    break;
                case 'captchaCode':
                    if (value.length == '' || value.length < 6) {
                        result.valid = false;
                        result.mes = "Please enter a valid!";
                        saveValidationState(input, false);
                        showValidationMessage(input, result);
                    } else {
                        saveValidationState(input, false);
                        $(input).parent().removeClass('ctajax-error').removeClass('ctajax-ok');
                        $('.el-captcha-loadding', $element).css('display', 'inline-block');
                        $ca_submit.addClass('check-captcha');
                        $.ajax({
                            type: 'POST',
                            url: $ajax_url,
                            data: {
                                captcha: value,
                                task: 'checkcaptcha'
                            },
                            dataType: 'json',
                            success: function(data) {
                                $('.el-captcha-loadding', $element).css('display', 'none');
                                $ca_submit.removeClass('check-captcha');
                                saveValidationState(input, data.valid);
                                showValidationMessage(input, data);
                                checkFormValidationState();
                            }
                        });
                    }
                    break;
                default:
                    break;
            }

            return result;
        }

        function saveValidationState(input, validationState) {
            $(input).data("validated", validationState);
        }

        function checkFormValidationState() {
            var nameValid = $name.data("validated");
            var emailValid = $email.data("validated");
            var subjectValid = $subject.data("validated");
            var messageValid = $message.data("validated");
            var captchaValid = $captcha.data("validated");
            var check_valid = '';
            check_valid = nameValid && emailValid && subjectValid && messageValid && captchaValid;
            if (check_valid) {
                return true;
            } else {
                return false;
            }
        }

        function showValidationMessage(input, validationResult) {
            if (validationResult.valid === false) {
                $(input).parent().addClass('ctajax-error').removeClass('ctajax-ok');
            } else {
                $(input).parent().removeClass('ctajax-error').addClass('ctajax-ok');
            }
        }

        var timer0 = 0;
        $name.on("keyup", function(e) {
            if (timer0) {
                clearTimeout(timer0);
                timer0 = 0;
            }
            timer0 = setTimeout(function() {
                validateInput($name, "name");
            }, 1000);
        });

        var timer1 = 0;
        $email.on("keyup", function(e) {
            if (timer1) {
                clearTimeout(timer1);
                timer1 = 0;
            }
            timer1 = setTimeout(function() {
                validateInput($email, "email");
            }, 1000);
        });

        var timer2 = 0;
        $subject.on("keyup", function(e) {
            if (timer2) {
                clearTimeout(timer2);
                timer2 = 0;
            }
            timer2 = setTimeout(function() {
                validateInput($subject, "subject");
            }, 1000);
        });

        var timer3 = 0;
        $message.on("keyup", function(e) {
            if (timer3) {
                clearTimeout(timer3);
                timer3 = 0;
            }
            timer3 = setTimeout(function() {
                validateInput($message, "message");
            }, 1000);
        });

        var timer4 = 0;
        $captcha.on("keyup", function() {
            if (timer4) {
                clearTimeout(timer4);
                timer4 = 0;
            }
            timer4 = setTimeout(function() {
                validateInput($captcha, "captchaCode");
            }, 1000);
        });

        $('.el-captcha-refesh', $element).on('click.refesh', function() {
            $captcha.val('');
        });

        $form.on('submit', function() {
            var $name_value = $.trim($name.val());
            var $email_value = $.trim($email.val());
            var $subject_value = $.trim($subject.val());
            var $message_value = $.trim($message.val());
            var $captcha_value = $.trim($captcha.val());

            //Recaptcha.response ('recaptcha_response_field');
            var $smail_copy_value = $smail_copy.attr('checked') ? 1 : 0;
            var $check_empty = '';
            $check_empty = $name_value == '' || $subject_value == '' || $email_value == '' || $message_value == '' || $captcha_value == '';
            if (checkFormValidationState() == false || $check_empty) {
                if ($name_value == '') {
                    validateInput($name, "name");
                }
                if ($email_value == '') {
                    validateInput($email, "email");
                }
                if ($subject_value == '') {
                    validateInput($subject, "subject");
                }
                if ($message_value == '' || $message_value.length <= 5) {
                    validateInput($message, "message");
                }
                if ($captcha_value == '') {
                    validateInput($captcha, "captchaCode");
                }
                return false;
            } else {
                if ($ca_submit.hasClass('check-captcha') || $ca_submit.hasClass('ca-sending')) {
                    return false;
                } else {
                    $ca_submit.addClass('ca-sending');
                    $image_load.css('display', 'inline-block');
                    $.ajax({
                        type: 'POST',
                        url: $ajax_url,
                        data: {
                            name: $name_value,
                            email: $email_value,
                            message: $message_value,
                            subject: $subject_value,
                            send_copy: $smail_copy_value,
                            task: 'sendmail'
                        },
                        success: function(data) {
                            $image_load.css('display', 'none');
                            //$return_success.css('display','inline-block');
                            if (data.status == 1) {
                                $return_success.css('display', 'inline-block');
                            } else {
                                $return_error.css('display', 'inline-block');
                            }
                        },
                        complete: function(data) {
                            $form.each(function() {
                                this.reset();
                            });
                            $notice_return.delay(3000).fadeOut();
                            $('.el-control').each(function() {
                                $(this).removeClass('ctajax-ok');
                            });
                            $ca_submit.removeClass('ca-sending');
                            $url = 'zvonite6031.png?displayCaptcha=True&amp;instanceCaptcha=106&amp;time=' + new Date().getTime();
                            $('#el_captcha106', $element).attr("src", $url);
                        },
                        dataType: 'json',
                    });
                }
            }
            return false;
        });
    })('#contact_ajax14737732881985051480')
});
