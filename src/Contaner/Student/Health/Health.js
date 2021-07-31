import React, { } from 'react';
import List from '../StudentComponent/List';
const Health = () => {
    const TH = [
        ['sr', 'cent8'],
        ['name', 'cent8'],
        ['weight', 'cent8'],
        ['height', 'cent8'],
        ['hb', 'cent8'],
        ['lastUpdate', 'cent8']

    ];
    const attr = () => {
        return {
            type: 'number',
            value: ''
        }
    }
    const properties = {
        hb: attr(),
        height: attr(),
        weight: attr(),
        lastUpdate: attr()
    }
    return <List TH={TH} properties={properties} field='health' />
}
export default Health