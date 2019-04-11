/* eslint-disable import/no-named-as-default-member */
import { OrderedMap } from 'immutable';

import PACKAGE from '../package.json';

import { OBJECT_TAG } from './utils/testing/TestUtils';

import Lattice from './index';

/* eslint-disable key-spacing */
const EXPECTED_OBJ_EXPORTS = OrderedMap({
  AnalysisApi        : { size: 2 },
  AppApi             : { size: 18 },
  AuthorizationApi   : { size: 2 },
  DataApi            : { size: 16 },
  DataIntegrationApi : { size: 1 },
  EntityDataModelApi : { size: 61 },
  LinkingApi         : { size: 2 },
  OrganizationsApi   : { size: 29 },
  PermissionsApi     : { size: 3 },
  PersistentSearchApi: { size: 5 },
  PrincipalsApi      : { size: 9 },
  RequestsApi        : { size: 3 },
  SearchApi          : { size: 14 },
  Constants          : { size: 4 },
  Models             : { size: 45 },
  Types              : { size: 8 },
});
/* eslint-enable key-spacing */

describe('lattice-js default export', () => {

  EXPECTED_OBJ_EXPORTS.forEach(({ size }, key) => {
    test(`should export "${key}`, () => {
      expect(Object.prototype.toString.call(Lattice[key])).toEqual(OBJECT_TAG);
      expect(Object.keys(Lattice[key])).toHaveLength(size);
    });
  });

  test('should export the correct version', () => {
    expect(Lattice.version).toEqual(PACKAGE.version);
  });

  test('should export configure()', () => {
    expect(Lattice.configure).toBeInstanceOf(Function);
  });

});
