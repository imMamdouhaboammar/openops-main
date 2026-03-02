class StubConnector {
  constructor({ name, dryRun }) {
    this.name = name || "stub";
    this.dryRun = dryRun === true;
  }

  async createTask() {
    return { status: "stub_noop" };
  }

  async postMessage() {
    return { status: "stub_noop" };
  }

  async writeArtifact() {
    return { status: "stub_noop" };
  }
}

module.exports = { StubConnector };

