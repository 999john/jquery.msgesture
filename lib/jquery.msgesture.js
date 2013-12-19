//
// jQuery plugin for dealing with Internet Explorer Gesture events
//

(function ($) {
	
	$.fn.gesture = function (options) {
		var gesture = new MSGesture();

		if (!this.length) {
			return;
		}

		// apply to selectors that return multiple elements
		if (this.length > 1) {
			$(this).each(function () {
				$(this).gesture(options);
			});

			return;
		}

		var element = this.get(0);

		var context = this;

		gesture.target = element;

		element.addEventListener('MSPointerDown', function (e) {
			gesture.addPointer(e.pointerId);
		}, false);

		element.addEventListener('MSGestureStart', function (e) {
			if ('start' in options) {
				options.start.apply(context, [e]);
			}
		}, false);


		element.addEventListener('MSGestureEnd', function (e) {
			if ('end' in options) {
				options.end.apply(context, [e]);
			}
		}, false);

		element.addEventListener('MSGestureChange', function (e) {			
			if (options.inertia) {
				if (e.detail == e.MSGESTURE_FLAG_INERTIA) {
                    return;
                }
			}

			if ('change' in options) {
				options.change.apply(context, [e]);
			}
		}, false);
		
		return this;
	}

})(jQuery);