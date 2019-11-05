'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UrlSchema extends Schema {
  up () {
    this.create('urls', (table) => {
      table.increments()

      table
        .string("url", 80)
        .notNullable()
        .unique();

      table.integer("visits").defaultTo(0);

      table.timestamps()
    })
  }

  down () {
    this.drop('urls')
  }
}

module.exports = UrlSchema
