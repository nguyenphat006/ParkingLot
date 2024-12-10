import React from 'react';
import Head from 'next/head';

const Map = () => {
    return (
        <>
            <Head>
                <link href="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.css" rel="stylesheet" />
                <link href="/css/style.css" rel="stylesheet" />
                <script src="https://cdn.jsdelivr.net/npm/@goongmaps/goong-js@1.0.9/dist/goong-js.js"></script>
            </Head>
            <div className="container">
                <div id="map"></div>
                <div id="directions-panel"></div>
            </div>
        </>
    );
};

export default Map;
