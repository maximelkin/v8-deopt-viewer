const MIN_SEVERITY = 0;

type CodeState = "compiled" | "optimizable" | "optimized" | "unknown";

interface CodeEntry {
	type: "codes";
	id: string;
	functionName: string;
	file: string;
	line: number;
	column: number;
	isScript: boolean;
	severity: number;
	updates: CodeEntryUpdate[];
}

interface CodeEntryUpdate {
	timestamp: number;
	state: CodeState;
	severity: number;
}

interface DeoptEntry {
	type: "deopts";
	id: string;
	functionName: string;
	file: string;
	line: number;
	column: number;
	severity: number;
	updates: DeoptEntryUpdate[];
}

interface DeoptEntryUpdate {
	timestamp: number;
	bailoutType: string;
	deoptReason: string;
	optimizationState: string;
	inlined: boolean;
	severity: number;
	inlinedAt?: InlinedLocation;
}

interface InlinedLocation {
	file: string;
	line: number;
	column: number;
}

type ICState =
	| "unintialized"
	| "premonomorphic"
	| "monomorphic"
	| "recompute_handler"
	| "polymorphic"
	| "megamorphic"
	| "generic"
	| "unknown";

interface ICEntry {
	type: "ics";
	id: string;
	functionName: string;
	file: string;
	line: number;
	column: number;
	severity: number;
	updates: ICEntryUpdate[];
}

interface ICEntryUpdate {
	type: string;
	oldState: ICState;
	newState: ICState;
	key: string;
	map: string;
	optimizationState: string;
	severity: number;
	modifier: string;
	slowReason: string;
}

type Entry = ICEntry | DeoptEntry | CodeEntry;

interface V8DeoptInfo {
	ics: ICEntry[];
	deopts: DeoptEntry[];
	codes: CodeEntry[];
}

interface PerFileV8DeoptInfo {
	[filePath: string]: V8DeoptInfo;
}

interface Options {
	keepInternals?: boolean;
	sortEntries?: boolean;
}

/**
 * Parse the deoptimizations from a v8.log file
 * @param v8LogContent The contents of a v8.log file
 * @param readSourceFileContent Given paths to source files from the v8.log,
 * this function should return their contents
 */
export async function parseV8Log(
	v8LogContent: string,
	keepInternals?: Options
): Promise<V8DeoptInfo>;

export function groupByFile(rawDeoptInfo: V8DeoptInfo): PerFileV8DeoptInfo;

export function findEntry(
	deoptInfo: V8DeoptInfo,
	entryId: string
): Entry | null;

export function sortEntries(entries: Entries[]): Entries[];

export function severityIcState(state: ICState): number;
