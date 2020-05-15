import { createElement } from "preact";
import { useState, useCallback, useMemo } from "preact/hooks";
import { findEntry } from "v8-deopt-parser/src/findEntry";
import { DeoptsList } from "./DeoptsList";
import { CodePanel } from "./CodePanel";
import {
	defaultShowLowSevs,
	defaultHideLineNum,
	CodeSettings,
} from "./CodeSettings";
import { fileViewer, codeSettings } from "./FileViewer.scss";

/**
 * @typedef {{ fileId: string; entryId: string; }} RouteParams
 * @typedef {{ routeParams: RouteParams, fileDeoptInfo: import('..').V8DeoptInfoWithSources }} FileViewerProps
 * @param {FileViewerProps} props
 */
export function FileViewer({ fileDeoptInfo, routeParams }) {
	const selectedEntry = findEntry(fileDeoptInfo, routeParams.entryId);
	const [showLowSevs, setShowLowSevs] = useState(defaultShowLowSevs);
	const [hideLineNums, setHideLineNums] = useState(defaultHideLineNum);

	return (
		<div class={fileViewer}>
			<CodeSettings
				class={codeSettings}
				showLowSevs={showLowSevs}
				toggleShowLowSevs={() => setShowLowSevs((prev) => !prev)}
				hideLineNums={hideLineNums}
				toggleHideLineNums={() => setHideLineNums((prev) => !prev)}
			/>
			<CodePanel
				fileDeoptInfo={fileDeoptInfo}
				selectedEntry={selectedEntry}
				fileId={routeParams.fileId}
				hideLineNums={hideLineNums}
				showLowSevs={showLowSevs}
			/>
			<DeoptsList
				fileDeoptInfo={fileDeoptInfo}
				selectedEntry={selectedEntry}
				fileId={routeParams.fileId}
				showLowSevs={showLowSevs}
			/>
		</div>
	);
}
