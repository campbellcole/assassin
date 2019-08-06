function isLocal(req) {
  return (req.connection.remoteAddress === "127.0.0.1" ||
          req.connection.remoteAddress === "::ffff:127.0.0.1" ||
          req.connection.remoteAddress === "::1");
}

export { isLocal }
