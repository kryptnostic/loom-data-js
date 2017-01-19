/*
 * @flow
 */

import Logger from '../utils/Logger';
import PrincipalTypes from '../constants/types/PrincipalTypes';

import {
  isDefined,
  isNonEmptyString
} from '../utils/LangUtils';

import type {
  PrincipalType
} from '../constants/types/PrincipalTypes';

const LOG = new Logger('Principal');

/**
 * @class Principal
 * @memberof loom-data
 */
export default class Principal {

  type :PrincipalType;
  id :string;

  constructor(type :PrincipalType, id :string) {

    this.type = type;
    this.id = id;
  }

  // for immutable.js equality
  // TODO: need a better way to evaluate equality for models
  valueOf() :string {

    return JSON.stringify({
      type: this.type,
      id: this.id
    });
  }
}

/**
 * @class PrincipalBuilder
 * @memberof loom-data
 */
export class PrincipalBuilder {

  type :PrincipalType;
  id :string;

  setType(type :PrincipalType) :PrincipalBuilder {

    if (!isNonEmptyString(type) && !PrincipalTypes[type]) {
      throw new Error('invalid parameter: type must be a non-empty string');
    }

    this.type = type;
    return this;
  }

  setId(id :string) :PrincipalBuilder {

    if (!isNonEmptyString(id)) {
      throw new Error('invalid parameter: type must be a non-empty string');
    }

    this.id = id;
    return this;
  }

  build() :Principal {

    if (!this.type) {
      throw new Error('missing property: type is a required property');
    }

    if (!this.id) {
      throw new Error('missing property: id is a required property');
    }

    return new Principal(this.type, this.id);
  }
}

export function isValid(principal :any) :boolean {

  if (!isDefined(principal)) {

    LOG.error('invalid parameter: principal must be defined', principal);
    return false;
  }

  try {

    (new PrincipalBuilder())
      .setType(principal.type)
      .setId(principal.id)
      .build();

    return true;
  }
  catch (e) {

    LOG.error(e, principal);
    return false;
  }
}
