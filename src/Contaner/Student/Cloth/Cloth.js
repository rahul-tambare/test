import React, { } from 'react';
import List from '../StudentComponent/List';
const Cloth = () => {
    const TH = [
        ['sr', 'cent8'],
        ['name', 'cent8'],
        ['shirts', 'cent8'],
        ['pants', 'cent8'],
        ['tShirts', 'cent8'],
        ['nightPant', 'cent8'],
        ['towel', 'cent8'],
        ['pantSize', 'cent8'],
        ['shirtSize', 'cent8'],
        ['lastUpdate', 'cent8']
    ];
    const attr = (name) => {
        return {
            type: 'number',
            value: ''
        }
    }
    const properties = {
        shirts: attr(),
        pants: attr(),
        tShirts: attr(),
        nightPant: attr(),
        towel: attr(),
        pantSize: attr(),
        shirtSize: attr()
    }
    return <List TH={TH} properties={properties} field='cloth' />
}
export default Cloth