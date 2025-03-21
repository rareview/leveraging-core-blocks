import classNames from 'classnames';

const { addFilter } = wp.hooks;
const { InspectorControls } = wp.blockEditor;
const { PanelBody, ToggleControl } = wp.components;
const { createHigherOrderComponent } = wp.compose;
const { __ } = wp.i18n;

// Add custom attribute to the core/columns block
const addCustomAttributes = (settings, name) => {
	if (name === 'core/columns') {
		settings.attributes = Object.assign(settings.attributes, {
			smallDesktopTwoColumns: {
				type: 'boolean',
				default: false,
			},
		});
	}

	return settings;
};

addFilter('blocks.registerBlockType', 'demo/custom-columns-attributes', addCustomAttributes);

// Add controls to the Inspector Controls
const withInspectorControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (!BlockEdit) {
			return null; // Prevents rendering if BlockEdit is undefined
		}

		const { name } = props;

		if (name !== 'core/columns') {
			return <BlockEdit {...props} />;
		}

		const { attributes, setAttributes } = props;
		const { smallDesktopTwoColumns } = attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__('Custom Columns Settings', 'demo')} initialOpen>
						<ToggleControl
							label={__('Small desktop has two columns', 'demo')}
							checked={smallDesktopTwoColumns}
							onChange={(value) => setAttributes({ smallDesktopTwoColumns: value })}
						/>
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'withInspectorControls');

addFilter('editor.BlockEdit', 'demo/with-inspector-controls', withInspectorControls);

// Modify the block's save function to include the new attribute
const addSaveProps = (extraProps, blockType, attributes) => {
	// Don't mutate the original object.
	const newExtraProps = extraProps;

	if (blockType.name === 'core/columns') {
		const { smallDesktopTwoColumns } = attributes;

		newExtraProps.className = classNames(newExtraProps.className, {
			'wp-block-columns--small-desktop-two-columns': smallDesktopTwoColumns,
		});
	}

	return newExtraProps;
};

addFilter('blocks.getSaveContent.extraProps', 'demo/add-save-props', addSaveProps);

// Add class to the editor view
const addEditorClass = createHigherOrderComponent((BlockListBlock) => {
	return (props) => {
		const { name, attributes, wrapperProps = {} } = props;

		if (name !== 'core/columns') {
			return <BlockListBlock {...props} />;
		}

		const { smallDesktopTwoColumns } = attributes;
		const newWrapperProps = { ...wrapperProps }; // Ensures we don't mutate the original props

		if (smallDesktopTwoColumns) {
			newWrapperProps.className = classNames(
				newWrapperProps.className,
				'wp-block-columns--small-desktop-two-columns'
			);
		}

		return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
	};
}, 'addEditorClass');

addFilter('editor.BlockListBlock', 'demo/add-editor-class', addEditorClass);
