export default {
  commands: ["alias", "aliases"],
  expectedArgs: "custom command syntax",
  permissionError: "You do not have permission to run this command.",
  minArgs: 0,
  maxArgs: 0,
  callback: (message, args, text) => {
    // Custom command code here
  },
  permissions: [],
  requiredRoles: [],
}

// All settings can be left empty as well
// All arrays can be passed as single strings too
