/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { FrameInfo } from "../types/bergamot.types";
import { TranslationStatus } from "../models/BaseTranslationState";
import { ExtensionState } from "../models/ExtensionState";

/**
 * Helper class to communicate updated document translation states.
 */
export class DocumentTranslationStateCommunicator {
  private frameInfo: FrameInfo;
  private extensionState: ExtensionState;
  constructor(frameInfo: FrameInfo, extensionState: ExtensionState) {
    this.frameInfo = frameInfo;
    this.extensionState = extensionState;
  }

  /**
   * Wrapped in setTimeout to prevent automatic batching of updates - we want status indicators
   * to get the updated translation status immediately.
   *
   * @param translationStatus
   */
  broadcastUpdatedTranslationStatus(translationStatus: TranslationStatus) {
    setTimeout(() => {
      this.extensionState.patchDocumentTranslationStateByFrameInfo(
        this.frameInfo,
        [
          {
            op: "replace",
            path: ["translationStatus"],
            value: translationStatus,
          },
        ],
      );
    }, 0);
  }

  clear() {
    setTimeout(() => {
      this.extensionState.deleteDocumentTranslationStateByFrameInfo(
        this.frameInfo,
      );
    }, 0);
  }

  updatedDetectedLanguageResults(detectedLanguageResults) {
    setTimeout(() => {
      this.extensionState.patchDocumentTranslationStateByFrameInfo(
        this.frameInfo,
        [
          {
            op: "add",
            path: ["detectedLanguageResults"],
            value: detectedLanguageResults,
          },
        ],
      );
    }, 0);
  }
}
