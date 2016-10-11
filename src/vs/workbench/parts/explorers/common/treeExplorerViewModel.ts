import { TPromise } from 'vs/base/common/winjs.base';
import { TreeExplorerNode, TreeExplorerNodeProvider } from 'vscode';

export class InternalTreeExplorerNode implements TreeExplorerNode {
	static idCounter = 1;

	id: number;

	// Property on TreeContentNode
	label: string;
	shouldInitiallyExpand: boolean;
	onClickCommand: string;

	constructor(node: TreeExplorerNode) {
		this.id = InternalTreeExplorerNode.idCounter++;

		this.label = node.label;
		this.shouldInitiallyExpand = node.shouldInitiallyExpand;
		this.onClickCommand = node.onClickCommand;
	}
}

export interface InternalTreeExplorerNodeProvider extends TreeExplorerNodeProvider {
	resolveCommand(node: TreeExplorerNode): TPromise<void>;
}