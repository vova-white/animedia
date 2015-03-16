;(function(){

	// Эффект наведения для ссылки в промо блоке
	$('.promo__video__link').hover(function () {
		$('.promo__video').toggleClass('active');
	});

	// Смена класса для ссылок в главном меню
	var $mainNavItems = $('.main-navigation__item'),
		$firstMenuItem = $mainNavItems.eq(0),
		$firsActive = $('.main-navigation__item.active'),
		$searchLink = $('.search-link'),
		$searchPanel = $('.search-panel'),
		$scroller = $('.new-films-scroller');

		$mainNavItems.click(function (e) {
			var $item = $(this),
				dataShow = $searchLink.attr('data-show');

			$mainNavItems.removeClass('active');
			$item.addClass('active');
			$searchLink.attr('data-show','hidden');

			if ( $('body').hasClass('main-page') ) {
				if ( $item.hasClass('search-link') && dataShow === 'hidden') {
					e.preventDefault();
					$scroller.hide();
					$searchPanel.show();
					$firstMenuItem.removeClass('active').addClass('first-in-menu');
					$searchLink.attr('data-show','visible');
				}
				if ( $item.hasClass('search-link') && dataShow === 'visible' || $item.hasClass('first-in-menu') ) {
					e.preventDefault();
					$scroller.show();
					$searchPanel.hide();
					$firstMenuItem.removeClass('first-in-menu').addClass('active');
					$searchLink.attr('data-show','hidden').removeClass('active');
				}
			}
			else {
				if ( $item.hasClass('search-link') && dataShow === 'hidden') {
					e.preventDefault();
					$firsActive.removeClass('active').addClass('first-in-menu');
					$searchLink.attr('data-show','visible');
					$searchPanel.slideDown();
				}
				if ( $item.hasClass('search-link') && dataShow === 'visible' ) {
					e.preventDefault();
					$firsActive.removeClass('first-in-menu').addClass('active');
					$searchLink.attr('data-show','hidden').removeClass('active');
					$searchPanel.slideUp();
				}
			}

		});

	// Дополнительная обертка для checkbox'ов в "Расширенном поиске"
	var checkCount = 3,
		$checkList = $('.check-list');
	while($checkList.children('div:not(.check-list__wrap)').length) {
		$checkList.children('div:not(.check-list__wrap):lt('+checkCount+')').wrapAll('<div class="check-list__wrap">');
	}

})();