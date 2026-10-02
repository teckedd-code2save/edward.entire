# GroundControl portfolio description: source check

Reviewed the public GroundControl repository at revision `65d4e173acc8e54f49585aa4d16165f94959afa2` on 1 October 2026. The portfolio story, project details, and pitch now lead with the external-agent deployment workflow.

## Primary sources

- [MCP tool definitions and execution](https://github.com/teckedd-code2save/groundcontrol/blob/65d4e173acc8e54f49585aa4d16165f94959afa2/src/lib/mcp-agent.ts): deployment list/inspect/logs/health/config.check, source.deploy, redeploy, and operation.get; scope and deployment-grant checks; saved mutations with idempotency keys.
- [Remote MCP route](https://github.com/teckedd-code2save/groundcontrol/blob/65d4e173acc8e54f49585aa4d16165f94959afa2/src/app/mcp/route.ts): public tool discovery, OAuth authentication for calls, and tool results with structured output.
- [Agent access contract](https://github.com/teckedd-code2save/groundcontrol/blob/65d4e173acc8e54f49585aa4d16165f94959afa2/docs/agent-native-access.md): compatible remote clients, OAuth consent, exact deployment grants, reconnection, revocation, and uncertain outcomes after interrupted operations. Its initial tool list predates the source.deploy tool present in the implementation.
- [ChatGPT and RentAWeekend account](https://github.com/teckedd-code2save/groundcontrol/blob/65d4e173acc8e54f49585aa4d16165f94959afa2/docs/articles/chatgpt-operated-my-deployment.md): the author's recorded use of ChatGPT for inspection and runtime checks, followed by a signed GitHub push that triggered a source deployment.
- [Existing BNL evidence](bnl-playground-2026-09-28/README.md): supervised terminal work, retained as a separate example of the operator workflow.

## Copy boundaries

The published account supports a documented example, not a new independently repeated production test. The portfolio does not attribute the GitHub-triggered mutation to a ChatGPT tool call. No latency or reliability benchmark is inferred from that single run. The older dashboard and BNL captures retain their recorded-view labels and are not presented as screenshots of an MCP session.

This revision changes text and the evidence destination only. The 3D workstation, motion, carousel behavior, and BNL runtime are unchanged.
