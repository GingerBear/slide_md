var navBtn = $('.nav-btn');
var pages = $('.page');
var doc = $(document);

var slidePage = function(dir) {
	var currentPage = $('.current');
	if ((dir == 'prev' && currentPage.prev().length < 1 ) 
		|| (dir == 'next' && currentPage.next().length < 1 )) {
			return;
	}
	var currentPageNum = pages.index(currentPage);
	pages.each(function(){
		this.className = 'page';
	});
	if (dir == 'prev') {
  	history.pushState(null, '第' + currentPageNum + '页', makeURL(currentPageNum-1));
		currentPage
			.addClass('rightOutSlide')
			.prev()
			.addClass('current rightInSlide');
		setTimeout(function(){
			currentPage.removeClass('rightOutSlide');
		}, 500);
	} else {
  	history.pushState(null, '第' + currentPageNum+2 + '页', makeURL(currentPageNum+1));
		currentPage
			.addClass('leftOutSlide')
			.next()
			.addClass('current leftInSlide');
		setTimeout(function(){
			currentPage.removeClass('leftOutSlide');
		}, 500);
	}
};

var makeURL = function(num) {
	var href = window.location.href;
	return (href.indexOf('?') >= 0 ? href.split('?')[0] : href)
		+ '?' + num
}

var pageNumber = function() {
	return /\?(\d+)/.exec(window.location.href)[1];
}

var gotoPage = function(num) {
	pages.each(function(){
		this.className = 'page';
	});
	$('.page').eq(num).addClass('current');
}

gotoPage(pageNumber());

navBtn.on('click', function(e){
	e.preventDefault();
	slidePage($(this).data('dir'));
	return;
});

doc.keyup(function(e){
	e.preventDefault();
	if (('39,40,13,32,74,').indexOf(e.keyCode + ',') + 1) {
    slidePage('next');
  }
  else if (('37,38,75,').indexOf(e.keyCode + ',') + 1) {
    slidePage('prev');
  }
}).click(function(e){	
	if ((e.target.className).indexOf('page') >= 0)
		return;
	var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
	if (e.clientX > w * 0.8) {
    slidePage('next');
  }
  else if (e.clientX < w * 0.2) {
    slidePage('prev');
  }
});