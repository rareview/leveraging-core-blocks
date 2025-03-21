const { registerBlockVariation } = wp.blocks;

registerBlockVariation(
	'core/group',
	{
		name: 'page-hero',
		title: 'Page Hero',
		attributes: {
			align: 'full',
			style: {
				elements: {
					link: {
						color: {
							text: 'var:preset|color|base',
						}
					}
				},
				spacing: {
					padding: {
						top: 'var:preset|spacing|80',
						bottom: 'var:preset|spacing|80',
					}
				}
			},
			backgroundColor: 'contrast',
			textColor: 'base',
			layout: {
				type: 'constrained',
			},
		},
		innerBlocks: [
			[
				'core/post-title',
			],
		],
	},
);
