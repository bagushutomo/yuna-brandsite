(function(jq) {
	$('#js_nav_expand').click(function(){
		$(this).toggleClass('open');
		$('#js_nav').toggleClass('collapsed');
	});
})(jQuery);