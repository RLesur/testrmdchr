const core = require('@actions/core');
const github = require('@actions/github');
const puppeteer = require('puppeteer-core');

// 

async function run() {
  try {
    const browserFetcher = puppeteer.createBrowserFetcher({ host: 'https://storage.googleapis.com' });
    const revision = require('./node_modules/puppeteer-core/package.json').puppeteer.chromium_revision;
    const revisionInfo = browserFetcher.revisionInfo(revision);
    browserFetcher.download(revisionInfo.revision);
    const executablePath = revisionInfo.executablePath;
    console.log(`Chromium path: ${executablePath}`);
    // `who-to-greet` input defined in action metadata file
    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}!`);
    const time = (new Date()).toTimeString();
    core.setOutput("time", time);
    // Get the JSON webhook payload for the event that triggered the workflow
    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();