import React from 'react';
import './components/styles.css';

const SupportRequest = ({form}) => {
	return (
		<div className="video-responsive">
		<form method="POST" action="https://developers.cryptowerk.com/platform/portal/submitSupportMessage">
		  <input hidden="hidden" name="numTicketId" />
		  <input hidden="hidden" name="optAccountId" id="optAccountId" />
		  <div className="form-group">
		    <div className="form-row">
		      <input className="form-control" name="optName" id="optName" type="text" aria-describedby="nameHelp" placeholder="Name" />
		    </div>
		  </div>
		  <div className="form-group">
		    <div className="form-row">
		      <input className="form-control" name="optOrganization" id="optOrganization" type="text" aria-describedby="organizationHelp" placeholder="Enter organization" />
		    </div>
		  </div>
		  <div className="form-group">
		    <div className="form-row">
		      <input className="form-control" name="optEmail" id="optEmail" type="email" aria-describedby="nameHelp" placeholder="Email" />
		    </div>
		  </div>
		  <div className="form-group">
		    <div className="form-row">
		      <input className="form-control" name="optPhone" id="optPhone" type="text" aria-describedby="nameHelp" placeholder="Phone" />
		    </div>
		  </div>
		  <div className="form-group">
		    <div className="form-row">
		      <textarea className="form-control" name="message" id="message" type="text" aria-describedby="nameHelp" placeholder="Message"></textarea>
		    </div>
		  </div>
		  <div className="g-recaptcha" data-sitekey="6Lcn17AUAAAAAEA-oU_6netaJbDv4tthKMTvi5wO"></div>

		  <button className="btn btn-primary btn-block">Submit</button>
		</form>

		<script async defer src="https://www.google.com/recaptcha/api.js"></script>
		</div>
	);
}

export default SupportRequest;
