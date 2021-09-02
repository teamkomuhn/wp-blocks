'use strict'



const {
    RichText,
    InspectorControls,
    ColorPalette,
    MediaUpload,
    InnerBlocks
} = wp.blockEditor

const {
    PanelBody,
    Button,
    FormToggle
} = wp.components

wp.blocks.registerBlockType(

    'namespace/name',

    {
        title: 'Custom Block',
        description: 'Description',
        icon: 'format-image', //dashicons
        category: 'text',

        attributes: {
            image: {
                type: 'string',
                default: null
            },

            content: {
                type: 'string',
                source: 'html',
                selector: 'p'
            }
        },

        edit: ({attributes, setAttributes}) => {

            const {
                image, content
            } = attributes

            // custom functions
            const onChangeContent = (value) => {
                setAttributes({content: value})
            }

            const onSelectImage = (newImage) => {
                setAttributes({image: newImage.sizes.full.url})
            }


            return ([
                <InspectorControls>
                    <PanelBody title="Image Settings">
                        <MediaUpload
                            onSelect={ onSelectImage }
                            type="image"
                            value={ image }
                            render={ ( { open } ) => (
    							<Button
    								className="editor-media-placeholder__button is-button is-default is-large"
    								icon="upload"
    								onClick={ open }>
    								 Background Image
    							</Button>
    						)}/>

                            <div>
                                <label htmlFor="toggle">Dark background</label>
                                <FormToggle
                                    id="toggle"
                                    onChange={(obj) => {
                                        console.log(obj);
                                    }}/>
                            </div>

                    </PanelBody>
                </InspectorControls>,

                <div>
                    <img src={image} alt=""/>

                    <RichText
                        key="editable"
                        tagName="p"
                        placeholder="Type some text..."
                        value={content}
                        onChange={onChangeContent}
                        inlineToolbar/>

                    <InnerBlocks/>
                </div>
            ])
        },

        save: properties => {

            const {
                image,
                content
            } = properties.attributes

            return ([
                <div>
                    <img src={image} alt="Image..."/>

                    <RichText.Content
                        tagName="p"
                        value={content}/>

                    <InnerBlocks.Content/>
                </div>
            ])
        }
    }
)
