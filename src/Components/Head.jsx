const Head = () =>
{
    return (
        <>
            {/* Primary Meta Tags */}
            <title>Zentry - The {`World's`} Largest Shared Adventure</title>
            <meta name="title" content="Zentry - The World's Largest Shared Adventure" />
            <meta name="description" content="Enter the Metagame Layer and unleash the Play Economy. Zentry unites players from countless games and platforms into a unified gaming experience." />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="theme-color" content="#000000" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://zentry.com/" />
            <meta property="og:title" content="Zentry - The World's Largest Shared Adventure" />
            <meta property="og:description" content="Enter the Metagame Layer and unleash the Play Economy. Zentry unites players from countless games and platforms into a unified gaming experience." />
            <meta property="og:image" content="/img/og-image.jpg" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://zentry.com/" />
            <meta property="twitter:title" content="Zentry - The World's Largest Shared Adventure" />
            <meta property="twitter:description" content="Enter the Metagame Layer and unleash the Play Economy. Zentry unites players from countless games and platforms into a unified gaming experience." />
            <meta property="twitter:image" content="/img/og-image.jpg" />

            {/* Performance Optimization */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* Preload Critical Assets */}
            <link rel="preload" as="image" href="/img/logo.png" />
            <link rel="preload" as="video" href="/videos/hero-1.mp4" />

            {/* PWA Support */}
            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/img/logo192.png" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
        </>
    );
};

export default Head; 