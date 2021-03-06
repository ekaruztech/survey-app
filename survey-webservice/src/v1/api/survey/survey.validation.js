import AppValidation from '../_core/app.validation';
import Validator from 'validatorjs';
import { IsObjectId } from '../../../utils/helpers';

/**
 * The User Validation class
 */
class SurveyValidation extends AppValidation {
	/**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	addOrUpdateQuestion(body) {
		const rules = {
			'label': 'required|string',
			'description': 'string',
			'options': 'required|array',
			'options.*.value': 'required|string',
			'options.*.label': 'required|string'
		};
		const validator = new Validator(body, rules); // extra validation on coupons
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
	
	/**
	 * @param {Object} body The object to validate
	 * @return {Object} Validator
	 */
	response(body) {
		Validator.register(
			'is_objectId',
			function (objectId, requirement, attribute) {
				return objectId && IsObjectId(objectId);
			},
			'This is not a valid object ID'
		);
		const rules = {
			'results': 'required|array',
			'results.*.question': 'required|string|is_objectId',
			'results.*.value': 'required|string'
		};
		const validator = new Validator(body, rules); // extra validation on coupons
		return {
			errors: validator.errors.all(),
			passed: validator.passes()
		};
	}
}

export default SurveyValidation;
