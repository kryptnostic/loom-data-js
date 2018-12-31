import { Map, fromJS } from 'immutable';

import getApiBaseUrl from './getApiBaseUrl';
import * as ApiNames from '../../constants/ApiNames';
import * as UrlConstants from '../../constants/UrlConstants';
import * as Config from '../../config/Configuration';
import { INVALID_PARAMS_SS } from '../testing/Invalid';
import { genRandomString } from '../testing/MockUtils';

/*
 * helpers
 */

/* eslint-disable key-spacing */
const API_TO_PATH_MAP = Map({
  [ApiNames.ANALYSIS_API]         : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.ANALYSIS_PATH}`,
  [ApiNames.APP_API]              : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.APP_PATH}`,
  [ApiNames.AUTHORIZATION_API]    : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.AUTHORIZATIONS_PATH}`,
  [ApiNames.DATA_API]             : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.DATA_PATH}`,
  [ApiNames.DATA_INTEGRATION_API] : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.INTEGRATION_PATH}`,
  [ApiNames.DATA_SOURCES_API]     : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.DATA_SOURCES_PATH}`,
  [ApiNames.EDM_API]              : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.EDM_PATH}`,
  [ApiNames.LINKING_API]          : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.LINKING_PATH}`,
  [ApiNames.ORGANIZATIONS_API]    : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.ORGANIZATIONS_PATH}`,
  [ApiNames.PERMISSIONS_API]      : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.PERMISSIONS_PATH}`,
  [ApiNames.PERSISTENT_SEARCH_API]: `${UrlConstants.DATASTORE_PATH}/${UrlConstants.PERSISTENT_SEARCH_PATH}`,
  [ApiNames.PRINCIPALS_API]       : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.PRINCIPALS_PATH}`,
  [ApiNames.REQUESTS_API]         : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.REQUESTS_PATH}`,
  [ApiNames.SEARCH_API]           : `${UrlConstants.DATASTORE_PATH}/${UrlConstants.SEARCH_PATH}`,
}).sortBy((value, key) => key);
/* eslint-enable */

const MOCK_BASE_URL = `https://${genRandomString()}.openlattice.com`;

/*
 * mocks
 */

jest.mock('../../config/Configuration');
Config.getConfig.mockImplementation(() => fromJS({
  baseUrl: MOCK_BASE_URL
}));

/*
 * tests
 */

describe('AxiosUtils : getApiBaseUrl()', () => {

  test('should throw if the given API is invalid', () => {
    INVALID_PARAMS_SS.forEach((invalid) => {
      expect(() => {
        getApiBaseUrl(invalid);
      }).toThrow();
    });
  });

  test('should not throw if the given API is valid', () => {
    Object.values(ApiNames).forEach((apiName) => {
      expect(() => {
        getApiBaseUrl(apiName);
      }).not.toThrow();
    });
  });

  Object.values(ApiNames).forEach((apiName) => {
    test(`should return the correct base URL for ${apiName}`, () => {
      expect(getApiBaseUrl(apiName)).toEqual(
        `${MOCK_BASE_URL}/${API_TO_PATH_MAP.get(apiName)}`
      );
    });
  });

});
