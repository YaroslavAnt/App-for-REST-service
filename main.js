$(document).ready(function () {
	var html;

	function countTime(val) {
		var minutes = Math.floor(val / 1000 / 60);
		var seconds = Math.floor((val - minutes * 60 * 1000) / 1000);
		if (seconds < 10) {
			seconds = '0' + seconds
		}
		return minutes + ' : ' + seconds
	};

	function createHTML(index, value) {

		var imgUrl = value.artworkUrl100;
		var artist = value.artistName;
		var track = value.trackName;
		var collection = value.collectionName;
		var genre = value.primaryGenreName;
		var trackNum = value.artistName;
		var price = value.collectionPrice;
		var trackPrice = value.trackPrice;
		var duration = value.trackTimeMillis;

		html +=
			'<tr class="menu">' +
			'<td><img src="' + imgUrl + '"</td>' +
			'<td>' + artist + '</td>' +
			'<td>' + track + '</td>' +
			'<td>' + collection + '</td>' +
			'<td>' + genre + '</td>' +
			'<td><span class="plus"><i class="fas fa-plus"></i></span><span class="minus hidden"><i class="fas fa-minus"></i></span></td>' +
			'</tr>' +

			'<tr class="submenu hidden">' +
			'<td></td>' +
			'<td colspan="2"><h2>' + artist + ' - ' + track + ' <i class="fas fa-music"></i></h2>' +
			'   <br><b>Collection:  </b>' + collection + '' +
			'   <br><b>Track Count: </b>' + trackNum + '' +
			'   <br><b>Price: </b>' + price + ' USD' +
			'</td>' +
			'<td colspan="2">' +
			'   <br><b>Track duration: </b> ' + countTime(duration) + ' ' +
			'   <br><b>Track Price: </b> ' + trackPrice + ' USD' +
			'</td>' +
			'<td></td>' +
			'</tr>';
		return html;
	};

	function showMenu() {
		$('.submenu').not($(this).next()).hide(400);
		$(this).next().toggle(400);


		$('.menu span.minus').not($('span', this)).hide();
		$('.menu span.plus').not($('span', this)).show();

		$('span', this).toggle();		
	};

	$('#form').on('submit', function () {
		html='';
		var keyWord = $('#input').val();

		$.ajax({
			url: 'http://itunes.apple.com/search',
			data: {
				'term': keyWord,
				'country': 'US',
				'media': 'music',
				'entity': 'musicTrack',
				'limit': '4'
			},
			response: 'text',
			cache: false,
			success: function (data) {
				//var html = '';
				var dataObj = JSON.parse(data);
				html += '<table><tr><td></td><td>Artist</td><td>Track</td><td>Collection</td><td>Genre</td><td></td></tr>'

				$.each(dataObj.results, createHTML);
				
				html += '</table>';

				$('#wrapper').html(html) ;

				$('.menu').on('click', showMenu); 
			}
		});
		return false;

	})

})