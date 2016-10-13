window.addEvent('load', function() {
	new JCaption('img.caption');
});
window.addEvent('domready', function() {

	SqueezeBox.initialize({});
	SqueezeBox.assign($$('a.modal'), {
		parse: 'rel'
	});
});
window.addEvent('domready', function() {
	$$('.hasTip').each(function(el) {
		var title = el.get('title');
		if (title) {
			var parts = title.split('::', 2);
			el.store('tip:title', parts[0]);
			el.store('tip:text', parts[1]);
		}
	});
	var JTooltips = new Tips($$('.hasTip'), {
		maxTitleChars: 50,
		fixed: false
	});
});
(function($) {
	window.addEvent('domready', function() {
		this.Slider133 = new DJImageSlider({
			id: '133',
			slider_type: 0,
			slide_size: 189,
			visible_slides: 5,
			show_buttons: 0,
			show_arrows: 2,
			preload: 100
		}, {
			auto: 1,
			transition: Fx.Transitions.linear,
			duration: 600,
			delay: 2600
		})
	});
})(document.id);
(function($) {
	window.addEvent('domready', function() {
		this.Slider115 = new DJImageSlider({
			id: '115',
			slider_type: 2,
			slide_size: 1900,
			visible_slides: 1,
			show_buttons: 0,
			show_arrows: 1,
			preload: 50
		}, {
			auto: 1,
			transition: Fx.Transitions.Cubic.easeIn,
			duration: 1500,
			delay: 4500
		})
	});
})(document.id);

$(document).ready(function() {

	setTimeout("$('.window_show').hide('drop');", 100);
	setTimeout("$('.window_show').show('drop');", 500);

	var $menu = $("#menu");

	$(window).scroll(function() {
		if ($(this).scrollTop() > 120 && $menu.hasClass("default")) {
			$menu.removeClass("default").addClass("fixed");
		} else if ($(this).scrollTop() <= 120 && $menu.hasClass("fixed")) {
			$menu.removeClass("fixed").addClass("default");
		}
	}); //scroll
});
