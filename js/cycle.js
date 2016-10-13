var vtemtabs = jQuery.noConflict();
(function($) {
	$(document).ready(function() {
		$('#vtemtabsid96-tabs').cycle({
			activePagerClass: 'active-tab',
			fit: 1,
			width: '900px',
			height: '410px',
			fx: 'fade',
			speed: 'fast',
			prev: '#vtemtabsid96-tabsprev',
			next: '#vtemtabsid96-tabsnext',
			pause: 1,
			pagerEvent: 'mouseenter',
			timeout: 0,
			pager: '#tabsid96 .vtemtabsnav',
			pagerAnchorBuilder: function(idx, slide) {
				return '#tabsid96 .vtemtabsnav li:eq(' + idx + ') a';
			}
		});
	});
})(jQuery);
