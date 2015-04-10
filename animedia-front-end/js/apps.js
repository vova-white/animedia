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

	// Высота сайдбара
	$(window).on('load', function () {
		var sidebar = $('.right-sidebar'),
			sidebarHeight = $('.content-container').height();

			sidebar.css('height', sidebarHeight);

			$(window).resize(function() {
				sidebarHeight = $('.content-container').height();
				sidebar.css('height', sidebarHeight);
			});

		/**
		* Табы
		*/
		var $tabs = $('.media__tabs'),
			tabsWidth = $tabs.width(),
			$tabItem = $('.media__tabs__nav__item a'),
			tabItemWidth = 0;

		$tabItem.each(function (i) {
			tabItemWidth+= $(this).outerWidth()+4;
		});
		if ( tabsWidth <= tabItemWidth ) {
			$('.nav-pills, .nav-tabs').tabdrop({
				text: 'Eщё'
			});
		}
		$(window).resize(function() {
			var $tabs = $('.media__tabs'),
				tabsWidth = $tabs.width(),
				$tabItem = $('.media__tabs__nav__item a'),
				tabItemWidth = 0;

			$tabItem.each(function (i) {
				tabItemWidth+= $(this).outerWidth()+4;
			});
			if ( tabsWidth <= tabItemWidth ) {
				$('.nav-pills, .nav-tabs').tabdrop({
					text: 'Eщё'
				});
				$('.media__tabs__nav .dropdown-toggle').click(function (e) {
					var $dropdown = $(this).parent();
					e.preventDefault();

					$dropdown.toggleClass('open');

					$(document).click(function (e) {
						if (!$(e.target).closest($dropdown).length ){
							$dropdown.removeClass('open');
						}
					});
				});
			}
		});
		$('.media__tabs__nav .dropdown-toggle').click(function (e) {
			var $dropdown = $(this).parent();
			e.preventDefault();

			$dropdown.toggleClass('open');

			$(document).click(function (e) {
				if (!$(e.target).closest($dropdown).length ){
					$dropdown.removeClass('open');
				}
			});
		});

	});

	/**
	* Слайдер серий в табах
	*/
	var seriesCount = 15,
		$seriesCarousel = $('.media__tabs__series');

	$seriesCarousel.each(function () {
		var $carousel = $(this),
			$list = $carousel.find('.media__tabs__series__list'),
			$active = '';

		while($list.children('div:not(.series-list__wrap)').length) {
			$list.children('div:not(.series-list__wrap):lt('+seriesCount+')').wrapAll('<div class="series-list__wrap row item">');
		}

		var $item = $list.find('.series-list__wrap'),
			$firstItem = $list.find('.series-list__wrap:first-child'),
			$lastItem = $list.find('.series-list__wrap:last-child'),
			$control = $carousel.find('.media__tabs__series__control'),
			$controlPrev = $carousel.find('.media__tabs__series__control.prev'),
			$controlNext = $carousel.find('.media__tabs__series__control.next'),
			$startSeries = $carousel.find('.start-series'),
			$endSeries = $carousel.find('.end-series'),
			firstMax = $firstItem.find('.media__tabs__series__list__item').length;

		$firstItem.addClass('active');
		$controlPrev.addClass('disabled');
		$startSeries.html('1');
		$endSeries.html(firstMax);

		if ($list.find('.media__tabs__series__list__item').length <= 15 ) {
			$control.hide();
		}

		var i = 1;
		var j = 1;

		$control.click(function (e) {
			var	$active = $list.find('.active'),
				firstActive = getItemIndex($active),
				lastActive = $item.length;

			$control.removeClass('disabled');

			if ( $(this).hasClass('prev') && firstActive === 1 ) {
				$controlPrev.addClass('disabled');
			} else {
				$controlPrev.removeClass('disabled');
			}
			if ( $(this).hasClass('next') && firstActive+2 === lastActive ) {
				$controlNext.addClass('disabled');
			} else {
				$controlNext.removeClass('disabled');
			}

			
			if ( $(this).hasClass('next') ) {
				var firstMin = $list.find('.series-list__wrap:nth-child('+ (i++) +') .media__tabs__series__list__item').length,
					lastMin = $list.find('.series-list__wrap:nth-child('+ ((j++)+1) +') .media__tabs__series__list__item').length,
					startText = $startSeries.text(),
					startText = Number(startText) + firstMin,
					endText = $endSeries.text(),
					endText =  Number(endText) + lastMin;
				$startSeries.html(startText);
				$endSeries.html(endText);
			}
			if ( $(this).hasClass('prev') ) {
				var firstMin = $list.find('.series-list__wrap:nth-child('+ ((i--)-1) +') .media__tabs__series__list__item').length,
					lastMin = $list.find('.series-list__wrap:nth-child('+ (j--) +') .media__tabs__series__list__item').length,
					startText = $startSeries.text(),
					startText = Number(startText) - firstMin,
					endText = $endSeries.text(),
					endText =  Number(endText) - lastMin;
				$startSeries.html(startText);
				$endSeries.html(endText);
			}
		});
		getItemIndex = function (item) {
			var $items = item.parent().children('.item')
			return $items.index(item || $active)
		}
	});

	$('.media__tabs__series__list__item a').click(function (e) {
		e.preventDefault();
		$("html,body").animate({"scrollTop": 400}, "slow");
	});

	var $newFilms = $('.scroller'),
		$newFilmsList = $newFilms.find('.scroller__items-wrapper'),
		filmCount = 6;

	while($newFilmsList.children('div:not(.film-list__wrap)').length) {
		$newFilmsList.children('div:not(.film-list__wrap):lt('+filmCount+')').wrapAll('<div class="film-list__wrap row item">');
	}
	$('.film-list__wrap:first-child').addClass('active');

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

// Кастомные селекты для фильтра
;(function(){

	var $selects = $('select.form-control__select'),
		$resault = $('.pseudo-selects');

	$selects.each(function () {
		var $select = $(this),
			selectName = $select.attr('name'),
			selectClass = $select.attr('class'),
			$options = $select.children('option'),
			placeholder = $options[0].text;

		$resault.append('<ul class="pseudo-select" data-select="'+ selectName +'">\
							<li class="'+ selectClass +'">\
								<span class="pseudo-select__placeholder">'+ placeholder +'</span>\
								<ul class="pseudo-select__dropdown"></ul>\
							</li>\
							<input type="hidden" name="'+ selectName +'" />\
						</ul>');

		$options.each(function(index) {
			var optionIndex = $options.index(this),
				optionValue = $options[index].value,
				optionText = $options[index].text,
				$resaultDropdown = $('[data-select="'+ selectName +'"] .pseudo-select__dropdown');

			if ( optionIndex !== 0 ) {
				$resaultDropdown.append('<li class="pseudo-select__dropdown__item" data-value="'+ optionValue +'" data-item="'+ selectName +'">'+ optionText +'</li>');
			}
		});

		$select.remove();

	});

	var $pseudoSelect = $('.pseudo-select .form-control__select'),
		$pseudoOption = $('.pseudo-select__dropdown__item');

	$pseudoSelect.click(function (e) {
		var $item = $(this),
			isActive = $item.hasClass('open');

		if(isActive){
			if (!$(e.target).closest('.mCSB_scrollTools').length){
				$item.removeClass('open');
			}
		}
		if(!isActive){
			$pseudoSelect.removeClass('open');
			$item.addClass('open');
		}
	});

	$pseudoOption.click(function (e) {
		var $item = $(this),
			itemText = $item.text(),
			itemVal = $item.attr('data-value'),
			selectParent = $item.attr('data-item'),
			$dropdown = $('.pseudo-select[data-select="'+ selectParent +'"]'),
			$dropdownChildren = $dropdown.find('.pseudo-select__dropdown__item'),
			$select = $('[data-select="'+ selectParent +'"]'),
			$selectInput = $select.find('input'),
			$selectText = $select.find('.pseudo-select__placeholder');

		$dropdownChildren.removeClass('selected');
		$item.addClass('selected');

		$selectInput.val(itemVal);
		$selectText.text(itemText).addClass('selected');

	});

	$(document).click(function (e) {
		if (!$(e.target).closest($pseudoSelect).length ){
			$pseudoSelect.removeClass('open');
		}
	});
	$(window).load(function(){
		$(".select-year .pseudo-select__dropdown").mCustomScrollbar();
	});

})();

// Модальные окна
$(document).ready(function() {
	$.extend(true, $.magnificPopup.defaults, {
		tClose: 'Закрыть', // Alt text on close button
		tLoading: 'Загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
		gallery: {
			tPrev: 'Назад', // title for left button
			tNext: 'Вперед', // title for right button
			tCounter: '%curr% из %total%'
		},
		image: {
			tError: 'Ошибка при загрузке <a href="%url%">Изображения</a>' // Error message when image could not be loaded
		},
		ajax: {
			tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
		}
	});
	$('.media__sshots__list').magnificPopup({
		delegate: 'a',
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return false;
			}
		},
		gallery: {
			enabled: true
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});
	$('.widget__post-info__poster a').magnificPopup({
		type: 'image',
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: 'mfp-with-zoom mfp-img-mobile',
		image: {
			verticalFit: true,
			titleSrc: function(item) {
				return false;
			}
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function(element) {
				return element.find('img');
			}
		}
	});
	$('.open-popup-link').magnificPopup({
		type:'inline',
		gallery: {
			enabled: true
		}
	});
});