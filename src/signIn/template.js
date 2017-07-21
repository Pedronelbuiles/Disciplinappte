var yo = require('yo-yo');
var landing = require('../landing/landing.js');
var translate = require('../translate');

var signinForm = yo`<div class="col s12 m7">
							<div class="row">
								<div class="signup-box">
									<h1 class="Disciplinappte">Disciplinappte</h1>
									<form class="signup-form">
										<div class="section">
											<a class="btn btn-fb">${translate.message('signup.facebook')}  <i class="fa fa-facebook-official"></i></a>
										</div>
										<div class="divider"></div>
										<div class="section">
											<input type="text" name="username" placeholder="${translate.message('username')}">
											<input type="password" name="password" placeholder="${translate.message('password')}">
											<button class="btn waves-effect waves-light signup-btn" type="submit">${translate.message('signup.call-to-action')}</button>
										</div>
									</form>
								</div>
							</div>
							<div class="row">
								<div class="login-box">
									${translate.message('signin.not-have-account')} <a href="/signUp">${translate.message('signup.call-to-action')}</a>
								</div>
							</div>
						</div>`;

module.exports = landing(signinForm);