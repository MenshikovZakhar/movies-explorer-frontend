import React, { useState } from 'react';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationMovie from '../NavigationMovie/NavigationMovie';

function Navigation() {
    // Данный useState временный, для выполнения этапа верстка
    const [login, setLogin] = useState(false);

    return <>{login ? <NavigationMovie /> : <NavigationAuth />}</>;
};

export default Navigation;