var yo = require('yo-yo');
var layout = require('../layout/index.js');
var picture = require('../picture-card/index.js');
var translate = require('../translate');
var request = require('superagent');

module.exports = function (pictures) {
	var el = yo`<div class="container timeline">
		<div id="modalCamara" class="modal center-align">
		    <div class="modal-content">
		      <div class="camara-picture" id="camara-input"></div>
		      <div class="camara-picture hide" id="picture-preview"></div>
		    </div>
		    <div class="modal-footer" id="btnFoto">
		      <button class="waves-effect waves-ligth btn" id="shoot">
		      	<i class="fa fa-camera"></i>
		      </button>
		      <button class="waves-effect waves-ligth cyan btn hide" id="uploadButton">
		      	<i class="fa fa-cloud-upload"></i>
		      </button>
		      <button class="waves-effect waves-ligth red btn hide" id="cancelPicture">
		      	<i class="fa fa-times"></i>
		      </button>
		    </div>
		</div>
		<div class="row">
			<div class="col s12 m10 offset-m1 l8 offset-l2 center-align">
				<form enctype="multipart/form-data" class="form-update" id="formUpdate" onsubmit=${onsubmit}>
					<div class="fileUpdate">
						<a class="waves-effect waves-ligth btn modal-trigger" href="#modalCamara">
							<i class="fa fa-camera"></i>
						</a>
						<div class="btn btn-flat cyan" id="fileName">
							<span><i class="fa fa-cloud-upload" aria-hidden="true"></i> ${translate.message('upload-picture')}</span>
							<input type="file" name="picture" id="file" class="upload" onclick=${ponclase}>
						</div>
					</div>
					<div id="otrosbtn" class=" hide">
						<button id="btnUpload" type="submit" class="btn btn-flat cyan">${translate.message('upload')}</button>
						<button id="btnCancel" type="button" class="btn btn-flat red " onclick=${cancel}><i class="fa fa-trash" aria-hidden="true"></i> ${translate.message('cancel')}</button>
					</div>
				</form>
			</div>
		</div>
		<div class="row">
			<div class="col s12 m10 offset-m1 l6 offset-l3" id="pictureCard">
				${pictures.map(function (pic) {
					return picture(pic);
				})}
			</div>
		</div>
	</div>`;

	function ponclase() {
		document.getElementById('fileName').classList.add('hide');
		document.getElementById('otrosbtn').classList.remove('hide');
	}
	function cancel() {
		document.getElementById('fileName').classList.remove('hide');
		document.getElementById('otrosbtn').classList.add('hide');
		document.getElementById('formUpdate').reset();
	}
	//function reset() {
	//	document.getElementById('cancelPicture').classList.add('ocultar');
	//}
	function onsubmit(ev) {
		ev.preventDefault();
		var data = new FormData(this);
		request
			.post('api/pictures')
			.send(data)
			.end(function (err, res) {
				console.log(arguments);
			})
		cancel();
	}
	return layout(el);
}