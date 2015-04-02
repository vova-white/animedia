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
			if ($(e.target).closest('#top-login-signup').length ) {
				$('[data-target="'+ target +'"]').addClass('active');
				$('#top-login-block-login').removeClass('active');
				setTimeout(function() { 
					$('.dropdown__block__registration').show();
					$('.dropdown__block__login').hide();
				}, 450)
			}
			if ($(e.target).closest('#top-login-block-login').length ) {
				$('[data-target="'+ target +'"]').addClass('active');
				$('#top-login-signup').removeClass('active');
				setTimeout(function() { 
					$('.dropdown__block__login').show();
					$('.dropdown__block__registration').hide();
				}, 450)
			}
			$(document).click(function (e) {
				if (!$(e.target).closest('.fixed-header__dropdown, #top-login-signup, #top-login-block-login').length ){
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
	$('.btn__reg-display').click(function (e) {
		e.preventDefault();
		$('#top-login-signup').addClass('active');
		$('#top-login-block-login').removeClass('active');
	});
	$('.btn__login-display').click(function (e) {
		e.preventDefault();
		$('#top-login-block-login').addClass('active');
		$('#top-login-signup').removeClass('active');
	});

	// скрыть уведомление
	$('.alert > .close').click(function (e) {
		$(this).parent().slideUp();
		e.preventDefault();
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

	/**
	* Цитирование в комментариях
	*/
	$(".content-comment-item-info-quote").click(function(e){
		e.preventDefault();
		var name = "<b>" + $(this).attr('data-name') + "</b>,";
		var date = $(this).attr('data-created');
		var text = $(this).parent().parent().find(".content-comment-item-message").html();
		var quote_author = '<p class="quote_source"> Написал ' + name + ' ' + date + '</p>';
		console.log(quote_author);
		var text_to_quote = "<blockquote>" + $.trim(text) + quote_author + "</blockquote> <br/>";
		// var text_to_quote = "<blockquote>" + $.trim(text) + quote_author + "</blockquote><p>" + name + "</p>";
		$("#comments-content").val(text_to_quote);
		$('#comments-content').redactor('insert.html', text_to_quote, false);
	});

	/**
	* Ответ в комментариях
	*/
	$(".content-comment-item-info-reply").click(function (e) {
		e.preventDefault();
		var name = "<b>" + $(this).attr('data-name') + "</b>,";
		$("#comments-content").val(name);
		$('#comments-content').redactor('insert.html', name);
	});

})();