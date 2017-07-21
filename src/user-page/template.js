var yo = require('yo-yo');
var layout = require('../layout/index.js');
var translate = require('../translate');

module.exports = function usernameTemplate(user) {
	var el = yo`<div>
	<div class="row">
				<div class="col s12 m10 offset-m1">
					<div class="row perfil">
						<div class="col s10 offset-s1 m4 offset-m0 center">
							<img src="${user.avatar}" class="responsive-img circle profilePhoto">
						</div>
						<div class="col s10 offset-s1 m7 ">
							<div class="row boxNombe">
								<div class="col s7 m3 nombre">
									<h1>${user.username}</h1>
								</div>
								<div class="col s7 m7 estado">
									<a class="waves-effect light-green darken-1 btn">le sigues</a>
									<i class="fa fa-circle-o" aria-hidden="true"></i>
									<i class="fa fa-circle-o" aria-hidden="true"></i>
									<i class="fa fa-circle-o" aria-hidden="true"></i>
								</div>
							</div>
							<div class="row boxDescription">
								<div class="col s12">
									<p class="description"><span class="nombreUsuario">${user.username}</span>Hace esto y además otras cosas, tiene muchos sueños y es capaz de realizarlos, trabaja duro en ello y lograra cumplirlos todos. <a href="#">#nombreUsuario goo.gl/f1a0yA</a></p>
								</div>
							</div>
							<div class="row social">
								<div class="col s3">
									<p><strong class="number">96</strong> publicaciones</p>
								</div>
								<div class="col s3">
									<p><strong class="number">5987</strong> seguidores</p>
								</div>
								<div class="col s6">
									<p><strong class="number">50</strong> seguidos</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col s12 m10 offset-m1 l8 offset-l2">
					<div class="row">
						${user.pictures.map(function (picture) {
							return yo`<div class="col s12 m4">
				          <a href="/${user.username}/${picture.id}" class="card picturePerfil">
				            <div class="card-image">
				              <img src=${picture.src}>
				            </div>
				            <p class="likess"><i class="fa fa-heart likesHeart" aria-hidden="true"></i> <strong class="number">${picture.likes}</strong> likes</p>
				          </a>
				          <!-- comienzo del modal -->
				          <div id="modal${picture.id}" class="modal modal-fixed-footer">
						    <div class="modal-content">
						      <img src="${picture.src}" >
						    </div>
						    <div class="modal-footer">
						      <div class="btn btn-flat likes">
						      	<i class="fa fa-heart"></i> ${translate.message('likes', { likes: picture.likes})}
						      </div>
						    </div>
						  </div>
				        </div>`
						})}
					</div>
				</div>
			</div>
		</div>
			`
		return layout(el)
}