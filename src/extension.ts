import * as vscode from "vscode";
let output = vscode.window.createOutputChannel("hide-my-secrets");

const hideDecorationType = vscode.window.createTextEditorDecorationType({
  backgroundColor: "red",
  color: "red",
});

export function activate(context: vscode.ExtensionContext) {
  if (vscode.window.activeTextEditor) {
    output.appendLine("Activated hide-my-secrets");
    updateDecorations();
  }

  vscode.window.onDidChangeActiveTextEditor((e) => {
    output.appendLine("Changed active text editor");
    updateDecorations();
  });

  vscode.workspace.onDidOpenTextDocument((e) => {
    output.appendLine("opened text document");
    updateDecorations();
  });

  let disposable = vscode.commands.registerCommand(
    "hide-my-secrets.toggleVisibility",
    toggleVisibility
  );

  context.subscriptions.push(disposable);
}

const toggleVisibility = () => {
  vscode.workspace
    .getConfiguration("hide-my-secrets")
    .update("hideSecrets", !shouldSecretsHide());

  output.appendLine("Toggled visibility to " + shouldSecretsHide());

  updateDecorations();
};

const updateDecorations = () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) {
    output.appendLine("No active text editor");
    return;
  }

  if (shouldSecretsHide()) {
    const words = vscode.workspace
      .getConfiguration("hide-my-secrets")
      .get("words") as string[];

    let ranges: vscode.Range[] = [];
    words.forEach((word) => {
      const regex = new RegExp(word, "g");
      let match;
      while ((match = regex.exec(editor.document.getText())) !== null) {
        const lineNumber = editor.document.positionAt(match.index).line;
        const line = editor.document.lineAt(lineNumber);
        const range = new vscode.Range(
          editor.document.positionAt(match.index + match[0].length),
          line.range.end
        );
        const validatedRange = editor.document.validateRange(range);

        output.appendLine(
          "Range: " +
            validatedRange.start.line +
            ":" +
            validatedRange.start.character +
            " to " +
            validatedRange.end.line +
            ":" +
            validatedRange.end.character
        );
        ranges.push(
          validatedRange
          //   new vscode.Range(
          //     editor.document.positionAt(match.index),
          //     editor.document.positionAt(match.index + match[0].length))
        );
      }
    });
    editor.setDecorations(hideDecorationType, ranges);
  } else {
    output.appendLine("Clearing decorations");
    editor.setDecorations(hideDecorationType, []);
  }
};

const shouldSecretsHide = () => {
  return (
    vscode.workspace.getConfiguration("hide-my-secrets").get("hideSecrets") ||
    false
  );
};

// this method is called when your extension is deactivated
export function deactivate() {}
