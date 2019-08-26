'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Teams
 * @see https://developer.webex.com/docs/api/v1/teams
 */
class Teams extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/teams')
    /** @private */
    this.idName = 'teamId'
  }
}

module.exports = Teams
