var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header/index.js');
var webcam = require('webcamjs');
var picture = require('../picture-card');

page('/', header, load,loadPictures,function (ctx, next) {
	title('Disciplinappte');
	var main = document.getElementById('main-container');

	empty(main).appendChild(template(ctx.pictures));

	const picturePreview = $('#picture-preview');
	const camaraInput = $('#camara-input');
	const cancelPicture = $('#cancelPicture'); 
	const shootButton = $('#shoot');
	const uploadButton = $('#uploadButton');

	function reset() {
		picturePreview.addClass('hide');
		uploadButton.addClass('hide');
		cancelPicture.addClass('hide');
		shootButton.removeClass('hide');
		camaraInput.removeClass('hide');
	};
	
	cancelPicture.click(reset);

	$('#modalCamara').modal({
		ready: function () {
			webcam.set({
			width: 320,
			height: 240,
			dest_width: 640,
			dest_height: 480,
			image_format: 'jpeg',
			jpeg_quality: 90,
			force_flash: false,
			flip_horiz: true,
			fps: 45
		});
			webcam.attach( '#camara-input' );
			shootButton.click((ev)=>{
				webcam.snap((data_url)=>{
					picturePreview.html(`<img src="${data_url}"/>`);
					picturePreview.removeClass("hide");
					uploadButton.removeClass("hide");
					cancelPicture.removeClass("hide");
					shootButton.addClass("hide");
					camaraInput.addClass("hide");
					uploadButton.off('click');
					uploadButton.click(()=>{
						const pic = {
							url: data_url,
							likes: 0,
							liked: false,
							createdAt: +new Date(),
							user:{
								username:'Seelecorp',
								avatar: 'https://scontent.feoh1-1.fna.fbcdn.net/v/t1.0-9/13174204_120790515001002_1254631020557491331_n.jpg?oh=5b205fd4d6e1a7502a8bdc083297e349&oe=5A0817E6'
							}
						}
						$('#pictureCard').prepend(picture(pic));
						reset();
						$('#modalCamara').modal('close');
					})
				})
			})
		},
		complete: function(){
			webcam.reset();
			reset();
		}
	})
})



function load(ctx, next) {
	var el = document.createElement('div');
	el.classList.add('loader');
	document.getElementById('main-container').appendChild(el);
	next();
}

function loadPictures(ctx,next) {
	request
		.get('/api/pictures')
		.end(function (err,res) {
			if(err) return console.log(err);
			ctx.pictures = res.body;
			next();
		})
}