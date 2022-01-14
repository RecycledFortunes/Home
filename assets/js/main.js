/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ '361px',   '480px'  ],
			xxsmall: [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});

		});

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		100,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		50,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1500,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});

	// Fixes.

		// Object fit images.
		if (!browser.canUse('object-fit')
		||	browser.name == 'safari')
			$('.image.object').each(function() {

				var $this = $(this),
					$img = $this.children('img');

				// Hide original image.
					$img.css('opacity', '0');

				// Set background.
					$this
						.css('background-image', 'url("' + $img.attr('src') + '")')
						.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
						.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

			});

			// Sidebar.
		var $sidebar = $('#sidebar'),
		$sidebar_inner = $sidebar.children('.inner');

	// Inactive by default on <= large.
		breakpoints.on('<=large', function() {
			$sidebar.addClass('inactive');
		});

		breakpoints.on('>large', function() {
			$sidebar.removeClass('inactive');
		});

	// Hack: Workaround for Chrome/Android scrollbar position bug.
		if (browser.os == 'android'
		&&	browser.name == 'chrome')
			$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
				.appendTo($head);

	// Toggle.
		$('<a href="#sidebar" class="toggle">Toggle</a>')
			.appendTo($sidebar)
			.on('click', function(event) {

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Toggle.
					$sidebar.toggleClass('inactive');

			});

	// Events.

		// Link clicks.
			$sidebar.on('click', 'a', function(event) {

				// >large? Bail.
					if (breakpoints.active('>large'))
						return;

				// Vars.
					var $a = $(this),
						href = $a.attr('href'),
						target = $a.attr('target');

				// Prevent default.
					event.preventDefault();
					event.stopPropagation();

				// Check URL.
					if (!href || href == '#' || href == '')
						return;

				// Hide sidebar.
					$sidebar.addClass('inactive');

				// Redirect to href.
					setTimeout(function() {

						if (target == '_blank')
							window.open(href);
						else
							window.location.href = href;

					}, 500);

			});

		// Prevent certain events inside the panel from bubbling.
			$sidebar.on('click touchend touchstart touchmove', function(event) {

				// >large? Bail.
					if (breakpoints.active('>large'))
						return;

				// Prevent propagation.
					event.stopPropagation();

			});

		// Hide panel on body click/tap.
			$body.on('click touchend', function(event) {

				// >large? Bail.
					if (breakpoints.active('>large'))
						return;

				// Deactivate.
					$sidebar.addClass('inactive');

			});

	// Scroll lock.
	// Note: If you do anything to change the height of the sidebar's content, be sure to
	// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

		$window.on('load.sidebar-lock', function() {

			var sh, wh, st;

			// Reset scroll position to 0 if it's 1.
				if ($window.scrollTop() == 1)
					$window.scrollTop(0);

			$window
				.on('scroll.sidebar-lock', function() {

					var x, y;

					// <=large? Bail.
						if (breakpoints.active('<=large')) {

							$sidebar_inner
								.data('locked', 0)
								.css('position', '')
								.css('top', '');

							return;

						}

					// Calculate positions.
						x = Math.max(sh - wh, 0);
						y = Math.max(0, $window.scrollTop() - x);

					// Lock/unlock.
						if ($sidebar_inner.data('locked') == 1) {

							if (y <= 0)
								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');
							else
								$sidebar_inner
									.css('top', -1 * x);

						}
						else {

							if (y > 0)
								$sidebar_inner
									.data('locked', 1)
									.css('position', 'fixed')
									.css('top', -1 * x);

						}

				})
				.on('resize.sidebar-lock', function() {

					// Calculate heights.
						wh = $window.height();
						sh = $sidebar_inner.outerHeight() + 30;

					// Trigger scroll.
						$window.trigger('scroll.sidebar-lock');

				})
				.trigger('resize.sidebar-lock');

			});

// Menu.
	var $menu = $('#menu'),
		$menu_openers = $menu.children('ul').find('.opener');

	// Openers.
		$menu_openers.each(function() {

			var $this = $(this);

			$this.on('click', function(event) {

				// Prevent default.
					event.preventDefault();

				// Toggle.
					$menu_openers.not($this).removeClass('active');
					$this.toggleClass('active');

				// Trigger resize (sidebar lock).
					$window.triggerHandler('resize.sidebar-lock');

			});

		});

})(jQuery);