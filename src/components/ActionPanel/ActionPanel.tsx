import React from 'react';

import {cn} from '../../utils/cn';

import './ActionPanel.scss';

export type ActionPanelItem = {
    id: string;
    icon: React.ReactNode;
    title: string;
    onClick?: () => void;
    className?: string;
};

type ActionPanelProps = {
    items: ActionPanelItem[];
};

const b = cn('dashkit-action-panel');

export const ActionPanel = (props: ActionPanelProps) => {
    return (
        <div className={b()}>
            {props.items.map((item) => {
                return (
                    <div
                        role="button"
                        className={b('item', item.className)}
                        key={`dk-action-panel-${item.id}`}
                        onClick={item.onClick}
                    >
                        <div className={b('icon')}>{item.icon}</div>
                        <div className={b('title')} title={item.title}>
                            {item.title}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
