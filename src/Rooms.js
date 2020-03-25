'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Rooms
 * @see https://developer.webex.com/docs/api/v1/rooms
 */
class Rooms extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/rooms')
    /** @private */
    this.idName = 'roomId'
  }

  /**
   * List Rooms
   *
   * @override
   * @param {Object} params - see https://developer.webex.com/docs/api/v1/rooms/list-rooms
   * @param {requestCallback} callback
   */
  list (params, callback) {
    if (typeof params === 'string') {
      params = { teamId: params }
    }
    return super.list(params, callback)
  }

  /**
   * Create a Room
   *
   * @override
   * @param {Object} params - see https://developer.webex.com/docs/api/v1/rooms/create-a-room
   * @param {requestCallback} callback
   */
  create (params, callback) {
    if (typeof params === 'string') {
      params = { title: params }
    }
    if (!params || !params.title) return callback(new Error('Invalid Params. Require title'))
    return super.create(params, callback)
  }
}

module.exports = Rooms
