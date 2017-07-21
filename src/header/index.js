var yo = require('yo-yo');
var translate = require('../translate');
var empty = require('empty-element');

var el = yo`<nav class="header">
			<div class="nav-wrapper">
				<div class="container">
					<div class="row">
						<div class="col s12 m6 osset-m1">
							<a href="/" class="brand-logo Disciplinappte">Discipliappte</a>
						</div>
						<div class="col s2 push-s10 m2 push-m6">
							<a href="#" class="btn btn-large btn-flat dropdown-button" data-activates="drop-user">
								<i class="fa fa-user" aria-hidden="true"></i>
							</a>
							<ul class="dropdown-content" id="drop-user">
								<li><a href="#">${translate.message('logout')}</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</nav>`;

module.exports = function (ctx,next) {
	var container = document.getElementById('header-container');
	empty(container).appendChild(el);
	next();
}