/**
 * Remove an unused imports.
 *
 * Many components use compile time expressions for things like css generation.
 * If a import is not used during runtime it is simply removed.
 */
module.exports = (babel) => {
  const t = babel.types;
  return {
    visitor: {
      Program: {
        enter: (path) => {
          for (const binding of Object.values(path.scope.bindings)) {
            if (binding.kind === "module") {
              if (!binding.referenced) {
                const source = binding.path.parentPath.get("source");
                if (t.isStringLiteral(source)) {
                  if (binding.path.node.type === "ImportSpecifier") {
                    binding.path.remove();
                  }

                  if (t.isImportDeclaration(binding.path.parentPath)) {
                    /**
                     * If we removed all of the imports from a module, remove the import completely.
                     */
                    if (
                      binding.path.parentPath.get("specifiers").length === 0
                    ) {
                      binding.path.parentPath.remove();
                    }
                  }
                }
              }
            }
          }
        },
      },
    },
  };
};
