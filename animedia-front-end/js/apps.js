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
				$searchPanel.hide();
				$scroller.show();
				if ( $item.hasClass('search-link') && dataShow === 'hidden') {
					e.preventDefault();
					$scroller.hide();
					$searchPanel.show();
					$firstMenuItem.removeClass('active').addClass('first-in-menu');
					$searchLink.attr('data-show','visible');
				}
				if ( $item.hasClass('search-link') && dataShow === 'visible' || $item.hasClass('first-in-menu') ) {
					e.preventDefault();
					$firstMenuItem.removeClass('first-in-menu').addClass('active');
					$searchLink.removeClass('active');
				}
			}
			else {
				if ( $item.hasClass('search-link') && dataShow === 'hidden') {
					e.preventDefault();
					$firsActive.removeClass('active').addClass('first-in-menu');
					$searchLink.attr('data-show','visible');
					$searchPanel.slideDown();
				}
				else if ( $item.hasClass('search-link') && dataShow === 'visible' ) {
					e.preventDefault();
					$firsActive.removeClass('first-in-menu').addClass('active');
					$searchLink.removeClass('active');
					$searchPanel.slideUp();
				}
				else {
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

	// Выпадающие блоки в шапке
	var $dropIcons = $('.icon-dropdown'),
		$dropdown = $('.dropdown');

	$dropIcons.click(function (e) {
		var $icon = $(this),
			target = $icon.attr('data-target'),
			isActive = $icon.hasClass('active');

		e.preventDefault();

		$dropIcons.removeClass('active');
		$dropdown.slideUp('slow');

		if (!isActive) {
			$icon.addClass('active');
			$('#'+ target ).slideDown('slow');
			$(document).click(function (e) {
				if (!$(e.target).closest('.fixed-header__dropdown').length){
					$dropIcons.removeClass('active');
					$dropdown.slideUp('slow');
				}
			});
		}
	});

	// Смена форм логин/регистрация
	$('.btn__reg-display, .btn__login-display').click(function (e) {
		e.preventDefault();
		$('.dropdown__block__login, .dropdown__block__registration').slideToggle();
	});

	// Кастомные селекты для фильтра
	$('.form-control__select').selectize({
		sortField: 'text'
	});

	// Высота сайдбара
	$(window).on('load', function () {
		var sidebar = $('.right-sidebar'),
			sidebarHeight = $('.content-container').height();

			sidebar.css('height', sidebarHeight);

			$(window).resize(function() {
				sidebarHeight = $('.content-container').height();
				sidebar.css('height', sidebarHeight);
			});
	});

})();