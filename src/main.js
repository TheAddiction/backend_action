const core = require('@actions/core')
const fs = require('fs')

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
async function run() {
  try {
    const key = core.getInput('rust-servers-key', { required: true })

    const res = await fetch(
      `https://rust-servers.net/api/?object=servers&element=detail&key=${key}`,
      {
        method: 'GET'
      }
    )

    const json = await res.json()

    fs.writeFileSync(
      './data/playerstats.json',
      JSON.stringify({ players: json.players })
    )

    // Set outputs for other workflow steps to use
    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    // Fail the workflow run if an error occurs
    core.setFailed(error.message)
  }
}

module.exports = {
  run
}
