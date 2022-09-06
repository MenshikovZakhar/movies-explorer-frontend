import React, { useState } from 'react';
import NavigationAuth from '../NavigationAuth/NavigationAuth';
import NavigationMovie from '../NavigationMovie/NavigationMovie';

function Navigation({ loggedIn }) {
    // Данный useState временный, для выполнения этапа верстка


    return <>{loggedIn ? <NavigationMovie /> : <NavigationAuth />}</>;
};

export default Navigation;