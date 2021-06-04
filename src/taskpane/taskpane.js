/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

// images references in the manifest
import "../../assets/icon-16.png";
import "../../assets/icon-32.png";
import "../../assets/icon-80.png";

/* global document, Office, Word */

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    // Determine if the user's version of Office supports all the Office.js APIs that are used in the tutorial.
    if (!Office.context.requirements.isSetSupported("WordApi", "1.3")) {
      // eslint-disable-next-line no-undef
      console.log("Sorry. The tutorial add-in uses Word.js APIs that are not available in your version of Office.");
    }

    // Assign event handlers and other initialization logic.
    document.getElementById("insert-paragraph").onclick = insertParagraph;
    document.getElementById("apply-style").onclick = applyStyle;
    document.getElementById("apply-custom-style").onclick = applyCustomStyle;
    document.getElementById("change-font").onclick = changeFont;

    document.getElementById("sideload-msg").style.display = "none";
    document.getElementById("app-body").style.display = "flex";
  }
});

// Your Word.js business logic will be added to the function that is passed to Word.run. This logic does not execute immediately. Instead, it is added to a queue of pending commands.
// The context.sync method sends all queued commands to Word for execution.
// The Word.run is followed by a catch block. This is a best practice that you should always follow.
function insertParagraph() {
  Word.run(function (context) {
    var docBody = context.document.body;
    docBody.insertParagraph(
      "Office has several versions, including Office 2016, Microsoft Office 365, and Office on the web.",
      "Start"
    );

    return context.sync();
  }).catch(function (error) {
    // eslint-disable-next-line no-undef
    console.log("Error: " + error);
    // eslint-disable-next-line no-undef
    if (error instanceof OfficeExtension.Error) {
      // eslint-disable-next-line no-undef
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}

function applyStyle() {
  Word.run(function (context) {
    var firstParagraph = context.document.body.paragraphs.getFirst();
    firstParagraph.styleBuiltIn = Word.Style.intenseReference;
    return context.sync();
  }).catch(function (error) {
    // eslint-disable-next-line no-undef
    console.log("Error: " + error);
    // eslint-disable-next-line no-undef
    if (error instanceof OfficeExtension.Error) {
      // eslint-disable-next-line no-undef
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}

function applyCustomStyle() {
  Word.run(function (context) {
    var lastParagraph = context.document.body.paragraphs.getLast();
    lastParagraph.style = "MyCustomStyle";

    return context.sync();
  }).catch(function (error) {
    // eslint-disable-next-line no-undef
    console.log("Error: " + error);
    // eslint-disable-next-line no-undef
    if (error instanceof OfficeExtension.Error) {
      // eslint-disable-next-line no-undef
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}

function changeFont() {
  Word.run(function (context) {
    var secondParagraph = context.document.body.paragraphs.getFirst().getNext();
    secondParagraph.font.set({
      name: "Courier New",
      bold: true,
      size: 18,
    });

    return context.sync();
  }).catch(function (error) {
    // eslint-disable-next-line no-undef
    console.log("Error: " + error);
    // eslint-disable-next-line no-undef
    if (error instanceof OfficeExtension.Error) {
      // eslint-disable-next-line no-undef
      console.log("Debug info: " + JSON.stringify(error.debugInfo));
    }
  });
}
