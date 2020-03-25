'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Teams
 * @see https://developer.webex.com/docs/api/v1/team-memberships
 */
class TeamMemberships extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/team/memberships')
    /** @private */
    this.idName = 'membershipId'
  }

  /**
   * List Team Memberships
   *
   * @override
   * @param {Object} params - see https://developer.webex.com/docs/api/v1/team-memberships/list-team-memberships
   * @param {requestCallback} callback
   */
  list (params, callback) {
    if (typeof params === 'string') {
      params = { teamId: params }
    }
    return super.list(params, callback)
  }

  /**
   * Create a new Team Membership
   *
   * @override
   * @param {Object} params - see https://developer.webex.com/docs/api/v1/team-memberships/create-a-team-membership
   * @param {requestCallback} callback
   */
  create (params, callback) {
    if (!params || !params.teamId) return callback(new Error('Invalid params. Require teamId'))
    if (!params.personId && !params.personEmail) return callback(new Error('Invalid params. Require personId or personEmail'))
    return super.create(params, callback)
  }
}

module.exports = TeamMemberships
