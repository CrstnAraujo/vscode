/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from 'vs/nls';
import { IConfigurationPropertySchema } from 'vs/platform/configuration/common/configurationRegistry';

export enum ViewsWelcomeExtensionPointFields {
	view = 'view',
	contents = 'contents',
	when = 'when',
}

export interface ViewWelcome {
	readonly [ViewsWelcomeExtensionPointFields.view]: string;
	readonly [ViewsWelcomeExtensionPointFields.contents]: string;
	readonly [ViewsWelcomeExtensionPointFields.when]: string;
}

export type ViewsWelcomeExtensionPoint = ViewWelcome[];

export const ViewIdentifierMap: { [key: string]: string } = {
	'explorer': 'workbench.explorer.emptyView',
	'debug': 'workbench.debug.welcome',
	'scm': 'workbench.scm',
};

const viewsWelcomeExtensionPointSchema = Object.freeze<IConfigurationPropertySchema>({
	type: 'array',
	description: nls.localize('contributes.viewsWelcome', "Contributed views welcome content. Welcome content will be rendered in views whenever they have no meaningful content to display, ie. the File Explorer when no folder is open. Such content is useful as in-product documentation to drive users to use certain features before they are available. A good example would be a `Clone Repository` button in the File Explorer welcome view."),
	items: {
		type: 'object',
		description: nls.localize('contributes.viewsWelcome.view', "Contributed welcome content for a specific view."),
		required: [
			ViewsWelcomeExtensionPointFields.view,
			ViewsWelcomeExtensionPointFields.contents
		],
		properties: {
			[ViewsWelcomeExtensionPointFields.view]: {
				anyOf: [
					{
						type: 'string',
						description: nls.localize('contributes.viewsWelcome.view.view', "Target view identifier for this welcome content.")
					},
					{
						type: 'string',
						description: nls.localize('contributes.viewsWelcome.view.view', "Target view identifier for this welcome content."),
						enum: Object.keys(ViewIdentifierMap)
					}
				]
			},
			[ViewsWelcomeExtensionPointFields.contents]: {
				type: 'string',
				description: nls.localize('contributes.viewsWelcome.view.contents', "Welcome content to be displayed. The format of the contents is a subset of Markdown, with support for links only."),
			},
			[ViewsWelcomeExtensionPointFields.when]: {
				type: 'string',
				description: nls.localize('contributes.viewsWelcome.view.when', "Condition when the welcome content should be displayed."),
			},
		}
	}
});

export const viewsWelcomeExtensionPointDescriptor = {
	extensionPoint: 'viewsWelcome',
	jsonSchema: viewsWelcomeExtensionPointSchema
};
