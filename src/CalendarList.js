
class CalendarList {

	constructor(httpRequest, jwt, calListBaseUrl) {
		if (httpRequest === undefined || jwt === undefined || calListBaseUrl === undefined) {
			throw new Error('CalendarList constructor: Missing arguments');
		}
		this._httpRequest = httpRequest;
		this._JWT = jwt;
		this._calListBaseUrl = calListBaseUrl;
	}

	_checkErrorResponse(expectedStatusCode, actualStatusCode, respBody, actualStatusMessage) {
		if (actualStatusCode !== expectedStatusCode) {
			let statusMsg = (actualStatusMessage === '' || actualStatusMessage === undefined) ? '' : '(' + actualStatusMessage + ')';
			throw new Error('Resp StatusCode ' + actualStatusCode + statusMsg + ':\nerrorBody:' + JSON.stringify(respBody));
		};
	}

	list(params) {
		return this._httpRequest.get('', `${this._calListBaseUrl}`, params, this._JWT)
			.then(resp => {
				this._checkErrorResponse(200, resp.statusCode, resp.body, resp.statusMessage);
				let body = (typeof resp.body === 'string') ? JSON.parse(resp.body) : resp.body;
				return body;
			})
			.catch(err => {
				throw new Error('CalendarList.list ' + err);
			});
	}

	get(calendarId) {
		return this._httpRequest.get('', `${this._calListBaseUrl}${calendarId}`, '', this._JWT)
			.then(resp => {
				this._checkErrorResponse(200, resp.statusCode, resp.body, resp.statusMessage);
				let body = (typeof resp.body === 'string') ? JSON.parse(resp.body) : resp.body;
				return body;
			})
			.catch(err => {
				throw new Error('CalendarList.get ' + err);
			});
	}

	insert(calendarId, params) {
		params.id = calendarId;
		return this._httpRequest.post('', `${this._calListBaseUrl}`, params, this._JWT)
			.then(resp => {
				this._checkErrorResponse(200, resp.statusCode, resp.body, resp.statusMessage);
				let body = (typeof resp.body === 'string') ? JSON.parse(resp.body) : resp.body;
				return body;
			})
			.catch(err => {
				throw new Error('CalendarList.insert ' + err);
			});
	}

	update(calendarId, params) {
		return this._httpRequest.put('', `${this._calListBaseUrl}${calendarId}`, params, this._JWT)
			.then(resp => {
				this._checkErrorResponse(200, resp.statusCode, resp.body, resp.statusMessage);
				let body = (typeof resp.body === 'string') ? JSON.parse(resp.body) : resp.body;
				return body;
			})
			.catch(err => {
				throw new Error('CalendarList.update ' + err);
			});
	}

	delete(calendarId) {
		return this._httpRequest.delete('', `${this._calListBaseUrl}${calendarId}`, '', this._JWT)
			.then(resp => {
				this._checkErrorResponse(204, resp.statusCode, resp.body, resp.statusMessage);
				return { calendarId: calendarId, statusCode: resp.statusCode, statusMessage: resp.statusMessage, message: 'Calendar entry deleted successfully from CalendarList' };
			})
			.catch(err => {
				throw new Error('CalendarList.delete ' + err);
			});
	}

	watch(params) {
		return this._httpRequest.post('', `${this._calListBaseUrl}/watch`, '', this._JWT)
			.then(resp => {
				this._checkErrorResponse(200, resp.statusCode, resp.body, resp.statusMessage);
				let body = (typeof resp.body === 'string') ? JSON.parse(resp.body) : resp.body;
				return body;
			})
			.catch(err => {
				throw new Error('CalendarList.watch ' + err);
			});
	}
}

module.exports = CalendarList;