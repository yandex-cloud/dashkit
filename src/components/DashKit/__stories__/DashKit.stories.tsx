import React from 'react';

import {Meta, Story} from '@storybook/react';

import pluginText from '../../../plugins/Text/Text';
import pluginTitle from '../../../plugins/Title/Title';
import {cn} from '../../../utils/cn';
import {DashKit, DashKitProps} from '../DashKit';

import {CssApiShowcase} from './CssApiShowcase';
import {DashKitShowcase} from './DashKitShowcase';
import {getConfig} from './utils';

import './DashKit.stories.scss';

const b = cn('stories-dashkit');

// window.initialized helps to prevent registration of a plugin that is already registered

const getInitialized = () => {
    // @ts-expect-error
    return (window && window.initialized) ?? false;
};

const setInitialized = (value: boolean) => {
    if (window) {
        // @ts-expect-error
        window.initialized = value;
    }
};

export default {
    title: 'Components/DashKit',
    component: DashKit,
    args: {
        config: getConfig(),
        editMode: true,
    },
} as Meta;

if (!getInitialized()) {
    DashKit.registerPlugins(
        pluginTitle,
        pluginText.setSettings({
            apiHandler: ({text}) => Promise.resolve({result: text}),
        }),
    );
    DashKit.registerPlugins({
        type: 'custom',
        defaultLayout: {
            w: 10,
            h: 10,
        },
        renderer: function CustomPlugin() {
            return (
                <div className={b('custom-plugin')}>
                    <div className={b('custom-plugin-container')}>
                        <div className={b('custom-plugin-text')}>Custom widget</div>
                    </div>
                </div>
            );
        },
    });

    DashKit.setSettings({
        gridLayout: {margin: [8, 8]},
    });

    setInitialized(true);
}

const DefaultTemplate: Story<DashKitProps> = (args) => <DashKit {...args} />;
export const Default = DefaultTemplate.bind({});

const ShowcaseTemplate: Story = () => <DashKitShowcase />;
export const Showcase = ShowcaseTemplate.bind({});

const CssApiShowcaseTemplate: Story<DashKitProps> = () => <CssApiShowcase />;
export const CSS_API = CssApiShowcaseTemplate.bind({});
