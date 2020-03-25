'use strict'

/** @ignore */
const CiscoSpark = require('./CiscoSpark')

/**
 * Spark Messages
 * @see https://developer.webex.com/docs/api/v1/messages
 */
class Messages extends CiscoSpark {
  /**
   * @constructor
   * @param {string} [accessToken] - Your Cisco Spark accesstoken
   * @param {string} [userAgent] - User Agent request header
   */
  constructor (accessToken, userAgent) {
    super(accessToken, userAgent, 'https://api.ciscospark.com/v1/messages')
    /** @private */
    this.idName = 'messageId'
  }

  /**
   * List Messages
   * Lists all messages in a room. Each message will include content attachments if present.
   * The list sorts the messages in descending order by creation date.
   *
   * @override
   * @param {MessageListParams} params - see https://developer.webex.com/docs/api/v1/messages/list-messages
   * @param {requestCallback} callback
   */
  list (params, callback) {
    if (!params || !params.roomId) {
      if (typeof params === 'string') {
        params = { roomId: params }
      } else {
        return callback(new Error('Invalid Params. Require roomId'))
      }
    }
    return super.list(params, callback)
  }

  /**
   * List Direct Messages
   * Lists all messages in a 1:1 (direct) room. Use the personId or personEmail query parameter to specify the room.
   * Each message will include content attachments if present.
   * The list sorts the messages in descending order by creation date.
   *
   * @param {MessageDirectParams} params - see https://developer.webex.com/docs/api/v1/messages/list-direct-messages
   * @param {requestCallback} callback
   */
  direct (params, callback) {
    if (params && (params.personId || params.personEmail)) {
      const args = this.getArgs(params, callback)
      return super.request({
        method: 'GET',
        url: `${this.apiUrl}/direct`,
        qs: args.params
      }, callback)
    } else {
      return callback(new Error('Invalid params. Required personId or personEmail'))
    }
  }

  /**
   * Create a Message
   * Posts a plain text message, and optionally, a media content attachment, to a room.
   *
   * @override
   * @param {MessageCreateParams} params - see https://developer.webex.com/docs/api/v1/messages/create-a-message
   * @param {requestCallback} callback
   */
  create (params, callback) {
    if (params && (params.roomId || params.toPersonId || params.toPersonEmail)) {
      return super.create(params, callback)
    } else {
      return callback(new Error('Invalid Params. Require roomId, toPersonId or toPersonEmail'))
    }
  }

  /**
   * Create a Message to a Room
   *
   * @param {string} roomId - Spark Room ID
   * @param {string|MessageCreateParams} params - Markdown formatted message string or Request parameters object
   * @param {requestCallback} callback
   */
  createToRoom (roomId, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.roomId = roomId
    return this.create(params, callback)
  }

  /**
   * Create a Message for a Person
   *
   * @param {string} personId - Spark Person ID
   * @param {string|MessageCreateParams} params - Markdown formatted message string or Request parameters object
   * @param {requestCallback} callback
   */
  createToPersonId (personId, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.toPersonId = personId
    return this.create(params, callback)
  }

  /**
   * Create a Message to a person via email
   *
   * @param {string} email - Email address
   * @param {string|MessageCreateParams} params - Markdown formatted message string or Request parameters object
   * @param {requestCallback} callback
   */
  createToPersonEmail (email, params, callback) {
    if (typeof params === 'string') params = { markdown: params }
    params.toPersonEmail = email
    return this.create(params, callback)
  }

  /**
   * Get a message
   *
   * @override
   * @param {string} messageId - Spark Message ID
   * @param {requestCallback} callback
   */
  get (messageId, callback) {
    if (!messageId || typeof messageId !== 'string') {
      return callback(new Error('Message ID is missing or in the wrong format'))
    }
    return super.get(messageId, callback)
  }

  /**
   * Delete a message
   *
   * @override
   * @param {string} messageId - Spark Message ID
   * @param {requestCallback} callback
   */
  delete (messageId, callback) {
    if (!messageId || typeof messageId !== 'string') {
      return callback(new Error('Message ID is missing or in the wrong format'))
    }
    return super.delete(messageId, callback)
  }
}

module.exports = Messages

/**
 * @typedef {Object} MessageListParams
 * @property {string} roomId - The Room ID
 * @property {string} [mentionedPeople] - filter messages which has mentioned Person ID
 * @property {string} [before] - list Messages before time in ISO8601 format
 * @property {string} [beforeMessage] - list Messages before Message ID
 * @property {number} [max] - Limit maximum messages in response
 */

/**
 * @typedef {Object} MessageDirectParams
 * @property {string} personId - Person ID
 * @property {string} personEmail - Email Address
 */

/**
 * @typedef {Object} MessageCreateParams
 * @property {string} roomId - The Room ID
 * @property {string} toPersonId - Person ID
 * @property {string} toPersonEmail - Email Address
 * @property {string} text - Plain Message text
 * @property {string} markdown - Markdown formatted Message text
 * @property {Array(string)} files - Public URL link to the files
 */
