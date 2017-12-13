(function(jq) {
	$('#js_nav_expand').click(function(){
		$(this).toggleClass('open');
		$('#js_nav').toggleClass('collapsed');
		$('body').toggleClass('is_menu_open');
	});

	$('.menu_item_link').click(function(e) {
		$('#js_nav_expand').toggleClass('open');
		$('#js_nav').toggleClass('collapsed');
		$('body').toggleClass('is_menu_open');
		return true;
	});
})(jQuery);